import { FileType } from './FileType';

export interface ClientResponseType {
	success: boolean;
	message: string;
	data: ClientType[];
}

export interface ClientType {
	activeStatus: boolean;
	creationDate: string | Date;
	email: string;
	enableEmailPdf: boolean;

	id: number;
	logo: FileType;
	modificationDate: string | Date;
	name: string;
	phone: string;
	specialization: {
		id: number;
		name: string;
		creationDate: string | Date;
		modificationDate: string | Date;
	};
}
