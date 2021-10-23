import { BarActionTypes, setNameAction } from "./types";

export const setName = (name: string): setNameAction => {
	return { type: BarActionTypes.SET_NAME, payload: name };
};

