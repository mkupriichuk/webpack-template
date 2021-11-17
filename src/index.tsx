import { render } from "react-dom";
import App from "./App";
import { RootStoreContext, appStore } from "./store/rootStore";

const RootStoreProvider = ({ children }) => {
	return (
		<RootStoreContext.Provider value={appStore}>
			{children}
		</RootStoreContext.Provider>
	);
};

render(
	<RootStoreProvider>
		<App />
	</RootStoreProvider>,
	document.getElementById("root")
);
