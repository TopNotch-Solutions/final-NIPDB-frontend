import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import sidebarReducer from "./reducers/sidebarReducer";
import authReducer from "./reducers/authReducer";
import serverReducer from "./reducers/serverReducer";
import tabsReducer from "./reducers/tabsReducer";
import authenticationReducer from "./reducers/twoFactorReducer";
import isSubmittingReducer from "./reducers/submittingReducer";
import userIdReducer from "./reducers/userIdReducer";

// Strip profileImage from auth before writing to localStorage (base64 images cause QuotaExceededError)
const authTransform = createTransform(
  (inboundState) => {
    const { profileImage, ...rest } = inboundState.user || {};
    return { ...inboundState, user: rest };
  },
  (outboundState) => outboundState,
  { whitelist: ["auth"] },
);

// Intercept QuotaExceededError at the setItem boundary
const safeStorage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return Promise.resolve();
    } catch (e) {
      if (e && (e.name === "QuotaExceededError" || e.code === 22)) {
        localStorage.removeItem("persist:root");
        try {
          localStorage.setItem(key, value);
          return Promise.resolve();
        } catch {
          window.location.reload();
          return Promise.reject(e);
        }
      }
      return Promise.reject(e);
    }
  },
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
  key: "root",
  storage: safeStorage,
  whitelist: ["auth", "server", "authentication", "userId", "sidebar"],
  transforms: [authTransform],
  debug: true,
};

const rootReducer = combineReducers({
  auth: authReducer,
  server: serverReducer,
  sidebar: sidebarReducer,
  tabs: tabsReducer,
  authentication: authenticationReducer,
  submitting: isSubmittingReducer,
  userId: userIdReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

persistor.subscribe(() => {
  const state = persistor.getState();
  if (state.bootstrapStatus === "ready") return;
});

if (process.env.NODE_ENV === "development") {
  store.subscribe(() => {
    const size = new Blob([JSON.stringify(localStorage)]).size;
    if (size > 4 * 1024 * 1024) {
      console.warn(
        `[persist] localStorage usage ${(size / 1024 / 1024).toFixed(2)}MB — approaching quota`,
      );
    }
  });
}

export { store, persistor };
