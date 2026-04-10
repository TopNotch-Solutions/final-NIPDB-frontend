import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateToken } from "../redux/reducers/authReducer";
import { notify } from "../utils/notificationEmitter";

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
        },
      );

      const data = await response.json();

      // Refresh JWT from response header.
      const newToken = response.headers.get("x-access-token");
      if (newToken) {
        dispatchRef.current(updateToken({ token: newToken }));
      }

      if (!response.ok) return;

      const notifications = data.data || [];

      if (isFirstPollRef.current) {
        // First poll: seed seen IDs silently — do NOT fire toasts.
        notifications.forEach((n) => seenIdsRef.current.add(n._id || n.id));
        isFirstPollRef.current = false;
      } else {
        // Subsequent polls: diff and fire notify() for each new notification
        // directly in the response handler — zero delay.
        notifications.forEach((n) => {
          const nId = n._id || n.id;
          if (!seenIdsRef.current.has(nId)) {
            seenIdsRef.current.add(nId);
            notify(n); // instant fire — no debounce, no setTimeout
          }
        });
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
      // Silently swallow — next tick will retry in 2s.
    }
  }, []);

  useEffect(() => {
    // Fire immediately on mount — don't wait for the first interval tick.
    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, [poll]);
};

export default useNotificationPoller;
