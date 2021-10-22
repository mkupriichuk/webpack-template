export interface IBarState {
	name: string;
}

export enum BarActionEnum {
	SET_NAME = "SET_NAME"
}

export interface setNameAction {
	type: BarActionEnum.SET_NAME;
	payload: string;
}

export type BarAction = setNameAction;
