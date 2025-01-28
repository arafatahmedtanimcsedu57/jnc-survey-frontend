import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { getFromLocalStorage, saveToLocalStorage } from '../common';
import {
	closeCircularProgress,
	openCircularProgress,
} from '../uireducers/progress';

import { generateID } from '../../utils/common';
import convertForm from '../../utils/convertResponseToFormStruct';

import apis from '../../service/Apis';
import { SecureGet, SecurePost } from '../../service/axios.call';

import { Form } from '../../types/ResponseFormTypes';
import { TemplateType } from '../../types/FormTemplateTypes';

interface AddTemplateType {
	formName: string;
	formId: string;
}

interface GetSingleTemplateRequest {
	formId: string;
	status: string;
}

export const getAllTemplates = createAsyncThunk<TemplateType[], string>(
	'formBuilderEntity/getAllTemplates',

	async (data: string, { rejectWithValue, dispatch }) => {
		dispatch(openCircularProgress());

		try {
			const { data }: { data: Form[] } = await SecureGet<Form[]>({
				url: `${apis.BASE}/api/formStructure/`,
			});
			const draftTemplates: TemplateType[] =
				JSON.parse(getFromLocalStorage('templates')) || [];

			dispatch(closeCircularProgress());
			const _data: TemplateType[] = data.map((item: Form) => convertForm(item));

			return [...draftTemplates, ..._data];
		} catch (error: any) {
			dispatch(closeCircularProgress());

			if (error.response && error.response.data.message)
				return rejectWithValue(error.response.data.message);
			else return rejectWithValue(error.message);
		}
	},
);

export const getSingleTemplate = createAsyncThunk<
	TemplateType,
	GetSingleTemplateRequest
>(
	'formBuilderEntity/getSingleTemplate',

	async (
		{ formId, status }: GetSingleTemplateRequest,
		{ rejectWithValue, dispatch },
	) => {
		if (status === 'saved') {
			dispatch(openCircularProgress());

			try {
				const { data }: { data: Form } = await SecureGet<Form>({
					url: `${apis.BASE}/api/formStructure/by-form-id/${formId}`,
				});

				dispatch(closeCircularProgress());

				const _data: TemplateType = convertForm(data);
				return _data;
			} catch (error: any) {
				dispatch(closeCircularProgress());

				if (error.response && error.response.data.message)
					return rejectWithValue(error.response.data.message);
				else return rejectWithValue(error.message);
			}
		} else {
			dispatch(openCircularProgress());
			return await new Promise<TemplateType>((resolve, reject) => {
				const allTemplates: TemplateType[] =
					JSON.parse(getFromLocalStorage('templates')) || [];
				const singleTemplate = allTemplates.filter(
					(t) => String(t.formId) === String(formId),
				)[0];
				setTimeout(() => {
					// Close the Circular Progress
					dispatch(closeCircularProgress());
					resolve(singleTemplate);
				}, 1000);
			});
		}
	},
);

export const addTemplate = createAsyncThunk(
	'formBuilderEntity/addTemplate',

	async ({ formName, formId }: AddTemplateType) => {
		return await new Promise<TemplateType>((resolve) => {
			const allTemplates: TemplateType[] =
				JSON.parse(getFromLocalStorage('templates')) || [];

			const template: TemplateType = {
				id: generateID(),
				formName: formName,
				file: null,
				formId: Number(formId),
				createdAt: '',
				creator: 'Test User',
				formLayoutComponents: [],
				lastPublishedAt: '',
				publishHistory: [],
				publishStatus: 'draft',
				updatedAt: '',
			};

			allTemplates.push(template);

			setTimeout(() => {
				saveToLocalStorage('templates', JSON.stringify(allTemplates));
				resolve(template);
			}, 1000);
		});
	},
);

export const deleteTemplate = createAsyncThunk(
	'formBuilderEntity/deleteTemplate',

	async (data: string, { dispatch }) => {
		dispatch(openCircularProgress());

		return await new Promise<number>((resolve) => {
			const allTemplates: TemplateType[] = JSON.parse(
				getFromLocalStorage('templates'),
			);

			const deleteIndex = allTemplates.findIndex((t) => t.id === data);

			allTemplates.splice(deleteIndex, 1);

			setTimeout(() => {
				dispatch(closeCircularProgress());
				saveToLocalStorage('templates', JSON.stringify(allTemplates));
				resolve(deleteIndex);
			}, 600);
		});
	},
);

export const saveTemplate = createAsyncThunk(
	'formBuilderEntity/saveTemplate',

	async (data: TemplateType, { dispatch }) => {
		dispatch(openCircularProgress());
		return await new Promise<TemplateType>((resolve) => {
			const allTemplates: TemplateType[] = JSON.parse(
				getFromLocalStorage('templates'),
			);

			let templateIndex = allTemplates.findIndex((t) => t.id === data.id);

			allTemplates[templateIndex] = data;

			setTimeout(() => {
				dispatch(closeCircularProgress());

				//Call API to store
				saveToLocalStorage('templates', JSON.stringify(allTemplates));
				resolve(data);
			}, 1000);
		});
	},
);

export const publishTemplate = createAsyncThunk<any, Partial<Form>>(
	'fromBuilderEntity/publishTemplate',

	async (template: Partial<Form>, { dispatch, rejectWithValue }) => {
		dispatch(openCircularProgress());

		try {
			const { data }: { data: any } = await SecurePost<any>({
				url: `${apis.BASE}/api/formStructure/`,
				data: { ...template },
			});

			dispatch(deleteTemplate(String(template.formId)));
			dispatch(closeCircularProgress());

			return data;
		} catch (error: any) {
			dispatch(closeCircularProgress());

			if (error.response && error.response.data.message)
				return rejectWithValue(error.response.data.message);
			else return rejectWithValue(error.message);
		}
	},
);

const slice = createSlice({
	name: 'formBuilderEntity',
	initialState: {
		allTemplates: [] as TemplateType[],
		selectedTemplate: null as TemplateType | null,
	},
	reducers: {
		setSelectedTemplateNull: (state) => {
			state.selectedTemplate = null;
		},
	},
	extraReducers: {
		[`${getAllTemplates.fulfilled}`]: (state, { payload }) => {
			state.allTemplates = payload;
		},

		[`${getSingleTemplate.fulfilled}`]: (state, { payload }) => {
			state.selectedTemplate = payload;
		},

		[`${addTemplate.fulfilled}`]: (
			state,
			{ payload }: PayloadAction<TemplateType>,
		) => {
			const updatedState = _.cloneDeep(state.allTemplates);
			updatedState.push(payload);

			state.allTemplates = updatedState;
		},

		[`${saveTemplate.fulfilled}`]: (state, { payload }) => {
			const newStateTemplates = state.allTemplates.slice();
			const newTemplateId = newStateTemplates.findIndex(
				(t) => t.id === payload.id,
			);
			newStateTemplates[newTemplateId] = payload;

			state.allTemplates = newStateTemplates;
		},

		[`${deleteTemplate.fulfilled}`]: (state, { payload }) => {
			const newStateTemplates = state.allTemplates.slice();
			newStateTemplates.splice(payload, 1);

			state.allTemplates = newStateTemplates;
		},
	},
});

export const { setSelectedTemplateNull } = slice.actions;
export default slice.reducer;
