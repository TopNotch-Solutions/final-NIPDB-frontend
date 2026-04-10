import React, { useEffect, useState, useRef, useCallback } from "react";
import { onNotification } from "../utils/notificationEmitter";
import "../assets/css/notificationToast.css";

const TOAST_DURATION = 8000; // 8 seconds
const MAX_VISIBLE = 5;

let toastIdCounter = 0;

const NotificationToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const permissionRequested = useRef(false);

  // Request browser notification permission on first user gesture.
  useEffect(() => {
    if (permissionRequested.current) return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      permissionRequested.current = true;
      return;
    }
    if (Notification.permission === "denied") {
      permissionRequested.current = true;
      return;
    }

    const requestPermission = () => {
      if (permissionRequested.current) return;
      permissionRequested.current = true;
      Notification.requestPermission();
    };

    document.addEventListener("click", requestPermission, { once: true });
    document.addEventListener("keydown", requestPermission, { once: true });

    return () => {
      document.removeEventListener("click", requestPermission);
      document.removeEventListener("keydown", requestPermission);
    };
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, dismissing: true } : t)),
    );
    // Remove after fade-out animation completes (300ms).
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  // Subscribe to the module-level emitter.
  useEffect(() => {
    const handler = (data) => {
      const id = ++toastIdCounter;

      // In-app toast — instant, no delay.
      setToasts((prev) => {
        const next = [...prev, { id, data, createdAt: Date.now() }];
        return next;
      });

      // Browser notification when tab is not visible.
      if (
        document.hidden &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        try {
          new Notification(data.title || "New Notification", {
            body: data.message || data.notification || "",
            tag: `notif-${data._id || data.id || id}`,
          });
        } catch (_) {
          // Silently ignore — some browsers restrict Notification constructor.
        }
      }
    };

    const unsubscribe = onNotification(handler);
    return unsubscribe;
  }, []);

  const visibleToasts = toasts.slice(-MAX_VISIBLE);

  return (
    <div className="notification-toast-container">
      {visibleToasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          duration={TOAST_DURATION}
          onDismiss={dismissToast}
        />
      ))}
    </div>
  );
};

// Individual toast with requestAnimationFrame-driven progress bar.
const Toast = ({ toast, duration, onDismiss }) => {
  const progressRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const remaining = Math.max(0, 1 - elapsed / duration);

      if (progressRef.current) {
        progressRef.current.style.width = `${remaining * 100}%`;
      }

      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onDismiss(toast.id);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [toast.id, duration, onDismiss]);

  const data = toast.data || {};
  const priority = (data.priority || "").toLowerCase();
  const priorityClass = priority ? `priority-${priority}` : "";

  return (
    <div
      className={`notification-toast ${priorityClass} ${toast.dismissing ? "dismissing" : ""}`}
    >
      <div className="notification-toast-header">
        <p className="notification-toast-title">
          {data.title || "New Notification"}
        </p>
        <button
          className="notification-toast-close"
          onClick={() => onDismiss(toast.id)}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      <div className="notification-toast-body">
        {data.message || data.notification || ""}
      </div>
      <div className="notification-toast-progress">
        <div
          ref={progressRef}
          className="notification-toast-progress-bar"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default NotificationToastContainer;
