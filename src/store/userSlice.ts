import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users } from "../api";

interface IUserState {
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

interface IState {
	user: IUserState | null;
	error: boolean;
	loading: boolean;
}

const initialState: IState = {
	user: null,
	error: false,
	loading: false,
};


export const getUser = createAsyncThunk<IUserState, number>(
	"users/getUser",
	async (id, thunkAPI) => {
		try {
			const data = await Users.getUserById(id);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);


const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		clearUser: (state) => {
			state.user = null;
			state.loading = false;
			state.error = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getUser.pending, (state) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.error = false;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.loading = false;
			state.user = null;
			state.error = true;
		});
	},
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
