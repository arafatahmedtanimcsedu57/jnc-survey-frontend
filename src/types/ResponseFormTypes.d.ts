import type { FileType } from './FileType';

export type Option = {
	id: string;
	value: string;
	label: string;
};

export type Field = {
	type: string;
	id: string;
	name: string;
	label: string;
	required: boolean;
	options?: Option[];
	placeholder?: string;
	sequence: number;
	information: string;
};

export type Block = {
	id: string;
	title: string;
	type: string;
	sequence: number;
	fields: Field[];
	skipAble: boolean;
};

export type Pdf = {
	id: string;
	fileName: string;
	contentType: string;
	creationDate: string;
	modificationDate: string;
};

export type Form = {
	id: string;
	formId: number;
	formName: string;
	pdf: FileType | null;
	blocks: Block[];
	creationDate: string;
	modificationDate: string;
};
