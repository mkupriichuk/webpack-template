import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";
import userSlice from "./userSlice";

export const store = configureStore({
	reducer: {
		posts: postsSlice,
		users: userSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
