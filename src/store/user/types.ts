export interface IUserState {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

export enum UserActionTypes {
	GET_USER = "GET_USER",
	CLEAR_USER = "CLEAR_USER"
}

export interface getUserAction {
	type: UserActionTypes.GET_USER;
	payload: IUserState;
}

export interface clearUserAction {
	type: UserActionTypes.CLEAR_USER;
}

export type UserAction = getUserAction | clearUserAction;
