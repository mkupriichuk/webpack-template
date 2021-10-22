import { BarActionEnum, setNameAction } from "./types";

export const setName = (name: string): setNameAction => {
	return { type: BarActionEnum.SET_NAME, payload: name };
};

