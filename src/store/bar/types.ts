export interface IBarState {
	name: string;
}

export enum BarActionTypes {
	SET_NAME = "SET_NAME"
}

export interface setNameAction {
	type: BarActionTypes.SET_NAME;
	payload: string;
}

export type BarAction = setNameAction;
