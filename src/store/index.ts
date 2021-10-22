import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { fooReducer } from "./foo/fooReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { barReducer } from "./bar/barReducer";
const rootReducer = combineReducers({
	foo: fooReducer,
	bar: barReducer
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
