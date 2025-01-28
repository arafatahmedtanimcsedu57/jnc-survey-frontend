import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SecureGet } from '../../service/axios.call';
import {
	closeCircularProgress,
	openCircularProgress,
} from '../uireducers/progress';
import apis from '../../service/Apis';
import type { ClientType, ClientResponseType } from '../../types/ClientType';

interface ClientWithImageUrl extends Omit<ClientType, 'logo'> {
	imageUrl: string | null;
}

// Helper function to fetch image URL
const fetchClientImageUrl = async (logoId: string): Promise<string | null> => {
	try {
		const { data } = await SecureGet<{ success: boolean; data: string }>({
			url: `${apis.BASE}/${apis.PATH}/${apis.VERSION}/${apis.IMAGE_PREVIEW}/${logoId}`,
		});
		return data.success ? data.data : null;
	} catch {
		return null; // Handle errors gracefully
	}
};

export const getAllClients = createAsyncThunk<ClientWithImageUrl[], string>(
	'clientsEntity/getAllClients',
	async (_, { rejectWithValue, dispatch }) => {
		dispatch(openCircularProgress());

		try {
			const { data } = await SecureGet<ClientResponseType>({
				url: `${apis.BASE}/${apis.PATH}/${apis.VERSION}/${apis.PROVIDER}`,
			});

			if (!data.success) {
				throw new Error(data.message);
			}

			// Fetch images for all clients in parallel
			const providersWithImages = await Promise.all(
				data.data.map(async (client) => ({
					...client,
					imageUrl: await fetchClientImageUrl(client.logo.id),
				})),
			);

			return providersWithImages;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || error.message || 'An error occurred',
			);
		} finally {
			dispatch(closeCircularProgress());
		}
	},
);

const clientsSlice = createSlice({
	name: 'clientsEntity',
	initialState: {
		allClients: [] as ClientWithImageUrl[],
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllClients.fulfilled, (state, action) => {
			state.allClients = action.payload;
		});
		builder.addCase(getAllClients.rejected, (state, action) => {
			console.error('Failed to fetch clients:', action.payload);
		});
	},
});

export default clientsSlice.reducer;
