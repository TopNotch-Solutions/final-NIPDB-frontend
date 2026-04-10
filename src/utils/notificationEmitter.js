// Module-level event emitter — decouples notification detection from rendering.
// Any part of the app can call notify() and all subscribers fire synchronously.

const listeners = [];

export const notify = (data) => {
  listeners.forEach((cb) => {
    try {
      cb(data);
    } catch (err) {
      console.error("Notification listener error:", err);
    }
  });
};

export const onNotification = (cb) => {
  listeners.push(cb);
  return () => {
    const idx = listeners.indexOf(cb);
    if (idx !== -1) listeners.splice(idx, 1);
  };
};
