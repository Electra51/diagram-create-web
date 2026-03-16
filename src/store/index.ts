import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatReducer from "./chatSlice";
import diagramReducer from "./diagramSlice";

const persistConfig = {
  key: "diagramai",
  storage,
  // chat history persist করতে না চাইলে blacklist-এ দাও
  whitelist: ["diagrams"],
};

const rootReducer = combineReducers({
  diagrams: diagramReducer,
  chat: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // redux-persist এর জন্য এই warning টা বন্ধ রাখতে হয়
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

// TypeScript-এর জন্য typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
