import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { fooReducer } from "./foo/fooReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./user/userReducer";
const rootReducer = combineReducers({
	foo: fooReducer,
	user: userReducer
});

const middleware = [thunk];

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
