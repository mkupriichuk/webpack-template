import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostsApi } from "../../api";
import { IPost } from "../../models/posts";

interface IPostsState {
	error: boolean;
	loading: boolean;
	num: number;
	posts: IPost[];
	currentPost: IPost | null;
}

const initialState: IPostsState = {
	error: false,
	loading: false,
	num: 0,
	posts: [],
	currentPost: null,
};

export const loadPosts = createAsyncThunk<IPost[] | undefined>(
	"posts/loadPosts",
	async (_, thunkAPI) => {
		try {
			const data = await PostsApi.allPosts();
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

export const loadPostById = createAsyncThunk<IPost, number>(
	"posts/loadPostById",
	async (id, thunkAPI) => {
		try {
			const data = await PostsApi.postById(id);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		inc: (state) => {
			state.num += 1;
		},
		dec: (state) => {
			state.num -= 1;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadPosts.pending, (state) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(loadPosts.fulfilled, (state, action) => {
			state.loading = false;
			state.posts = action.payload!;
			state.error = false;
		});
		builder.addCase(loadPosts.rejected, (state) => {
			state.loading = false;
			state.error = true;
		});
		builder.addCase(loadPostById.pending, (state) => {
			state.error = false;
			state.loading = true;
		});
		builder.addCase(loadPostById.fulfilled, (state, action) => {
			state.loading = false;
			state.currentPost = action.payload;
			state.error = false;
		});
		builder.addCase(loadPostById.rejected, (state) => {
			state.loading = false;
			state.error = true;
		});
	},
});

export const {inc, dec} = postsSlice.actions;

export default postsSlice.reducer;
