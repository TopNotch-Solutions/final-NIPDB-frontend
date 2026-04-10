import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateToken } from "../redux/reducers/authReducer";
import { notify } from "../utils/notificationEmitter";

const MAX_SEEN_IDS = 500;

const useNotificationPoller = ({ onListUpdated, onCountUpdated } = {}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const serverToken = useSelector((state) => state.server.serverToken);

  // Store tokens in refs so the polling closure always has fresh values
  // without re-registering the interval.
  const serverTokenRef = useRef(serverToken);
  const tokenHeaderRef = useRef(currentUser?.token);
  const dispatchRef = useRef(dispatch);
  const onListUpdatedRef = useRef(onListUpdated);
  const onCountUpdatedRef = useRef(onCountUpdated);

  // Track seen notification IDs in a ref (NOT state) to avoid re-render loops.
  const seenIdsRef = useRef(new Set());
  const isFirstPollRef = useRef(true);
  // Guard against overlapping in-flight polls.
  const inFlightRef = useRef(false);
  // AbortController for cancelling in-flight fetch on unmount.
  const abortControllerRef = useRef(null);

  // Keep refs up-to-date with latest values.
  useEffect(() => {
    serverTokenRef.current = serverToken;
  }, [serverToken]);

  useEffect(() => {
    tokenHeaderRef.current = currentUser?.token;
  }, [currentUser?.token]);

  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);

  useEffect(() => {
    onListUpdatedRef.current = onListUpdated;
  }, [onListUpdated]);

  useEffect(() => {
    onCountUpdatedRef.current = onCountUpdated;
  }, [onCountUpdated]);

  const poll = useCallback(async () => {
    const token = tokenHeaderRef.current;
    const srvToken = serverTokenRef.current;

    if (!token || !srvToken) return;
    // Skip if a previous poll is still in-flight.
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/notifications/admin/single/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${srvToken}`,
            "x-access-token": `${token}`,
          },
          signal: controller.signal,
        },
      );

      // Refresh JWT from response header (safe even on non-OK responses).
      const newToken = response.headers.get("x-access-token");
      if (newToken) {
        dispatchRef.current(updateToken({ token: newToken }));
      }

      if (!response.ok) return;

      let data;
      try {
        data = await response.json();
      } catch {
        return; // Non-JSON body — skip this tick.
      }

      const notifications = data.data || [];

      if (isFirstPollRef.current) {
        // First poll: seed seen IDs silently — do NOT fire toasts.
        notifications.forEach((n) => {
          const nId = n._id || n.id;
          if (nId != null) seenIdsRef.current.add(nId);
        });
        isFirstPollRef.current = false;
      } else {
        // Subsequent polls: diff and fire notify() for each new notification
        // directly in the response handler — zero delay.
        notifications.forEach((n) => {
          const nId = n._id || n.id;
          if (nId == null) return; // Skip items without a stable ID.
          if (!seenIdsRef.current.has(nId)) {
            seenIdsRef.current.add(nId);
            notify(n); // instant fire — no debounce, no setTimeout
          }
        });
      }

      // Prune seenIds to a bounded window to prevent unbounded growth.
      if (seenIdsRef.current.size > MAX_SEEN_IDS) {
        const entries = Array.from(seenIdsRef.current);
        seenIdsRef.current = new Set(
          entries.slice(entries.length - MAX_SEEN_IDS),
        );
      }

      // Sync badge count and list via callbacks (these update React state
      // in TopBar, but that's fine — it's the UI, not the polling loop).
      if (onCountUpdatedRef.current) {
        onCountUpdatedRef.current(notifications.length);
      }
      if (onListUpdatedRef.current) {
        onListUpdatedRef.current(notifications);
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      // Silently swallow — next tick will retry in 2s.
    } finally {
      inFlightRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Fire immediately on mount — don't wait for the first interval tick.
    poll();
    const interval = setInterval(poll, 2000);
    return () => {
      clearInterval(interval);
      // Abort any in-flight fetch on unmount.
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [poll]);
};

export default useNotificationPoller;
