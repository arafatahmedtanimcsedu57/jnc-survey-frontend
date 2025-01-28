import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../service/axios.call';
import {
	openCircularProgress,
	closeCircularProgress,
} from '../uireducers/progress';
import apis from '../../service/Apis';

interface LoginRequest {
	username: string;
	password: string;
}

interface LoginResponse {
	success: boolean;
	message: string;
	data: {
		token: string;
		permissions: string[];
	};
}

interface LoginState {
	loading: boolean;
	userToken: string | null;
	error: string | null;
	success: boolean;
}

export const getLogin = createAsyncThunk<LoginResponse, LoginRequest>(
	'auth/getLogedIn',
	async ({ username, password }, { rejectWithValue, dispatch }) => {
		dispatch(openCircularProgress());

		try {
			const { data } = await Post<LoginResponse>({
				url: `${apis.BASE}/${apis.PATH}/${apis.VERSION}/${apis.LOGIN}`,
				data: {
					login: username,
					password,
				},
			});

			if (!data.success) {
				throw new Error(data.message);
			}

			return data;
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.message || error.message || 'An error occurred';
			return rejectWithValue(errorMessage);
		} finally {
			dispatch(closeCircularProgress());
		}
	},
);

const initialState: LoginState = {
	loading: false,
	userToken: null,
	error: null,
	success: false,
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getLogin.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getLogin.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.userToken = payload.data.token;
				state.success = payload.success;
			})
			.addCase(getLogin.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload as string;
			});
	},
});

export default loginSlice.reducer;
