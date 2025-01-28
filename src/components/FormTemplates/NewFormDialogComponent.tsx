import React, {
	FormEventHandler,
	FunctionComponent,
	PropsWithChildren,
	useEffect,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, TextField } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addTemplate } from '../../redux/entities/formBuilderEntity';
import { getToken, setToken } from '../../redux/auth/token';
import { getLogin } from '../../redux/auth/login';

import useModalStrip from '../../global-hooks/useModalStrip';
import { TemplateType } from '../../types/FormTemplateTypes';

interface NewFormDialogComponentProps {
	openDialog: boolean;
	setOpenDialog: (arg: boolean) => void;
}

const NewFormDialogComponent: FunctionComponent<
	PropsWithChildren<NewFormDialogComponentProps>
> = (props) => {
	const [creatingForm, setCreatingForm] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { showModalStrip } = useModalStrip();
	const authToken = useAppSelector((state) => state.user.access.token);
	const {
		loading: loginLoading,
		error: loginError,
		success: loginSuccess,
	} = useAppSelector((state) => state.user.auth);

	const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const username = e.currentTarget.username.value || '';
		const password = e.currentTarget.password.value || '';

		const data = {
			username,
			password,
		};

		try {
			const { data: _data } = await dispatch(getLogin(data)).unwrap();
			dispatch(setToken(_data));
		} catch {}
	};

	const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const newFormData = {
			formName: e.currentTarget.formName.value,
			formId: e.currentTarget.formId.value,
		};

		setCreatingForm(true);

		try {
			const template: TemplateType = await dispatch(
				addTemplate(newFormData),
			).unwrap();
			navigate(`/formbuilder/${template.publishStatus}-${template.formId}`);
		} catch (ex) {
			showModalStrip(
				'danger',
				'Error occurred while creating a new Form',
				5000,
			);
		}
	};

	useEffect(() => {
		if (!authToken) dispatch(getToken('GET AUTH TOKEN'));
	}, []);

	return (
		<>
			<Dialog
				open={props.openDialog}
				fullWidth
				maxWidth="sm"
				onClose={() => {
					props.setOpenDialog(false);
				}}
			>
				{authToken ? (
					<DialogContent className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Enter the following details</h5>
						</div>

						<div className="modal-body py-4">
							<form onSubmit={handleFormSubmit}>
								<div className="mb-3">
									<TextField
										required
										size="small"
										label="Form Name"
										name="formName"
										id="formName"
										key="formName"
										className="form-control"
										defaultValue=""
									/>
								</div>

								<div className="mb-3">
									<TextField
										required
										size="small"
										label="Form ID"
										name="formId"
										id="formId"
										key="formId"
										className="form-control"
										defaultValue=""
									/>
								</div>

								<button
									type="submit"
									className="btn btn-sm btn-success fw-medium px-4"
									disabled={creatingForm}
								>
									{creatingForm ? (
										<>
											<span
												className="spinner-border spinner-border-sm mr-2"
												role="status"
												aria-hidden="true"
											></span>
											Loading
										</>
									) : (
										'Create Form'
									)}
								</button>
							</form>
						</div>
					</DialogContent>
				) : (
					<DialogContent className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Login</h5>
						</div>

						<div className="modal-body py-4">
							<form onSubmit={handleLogin}>
								<div className="mb-3">
									<TextField
										size="small"
										label="User Name"
										name="username"
										className="form-control"
										id="userName"
										key="userName"
									/>
								</div>

								<div className="mb-3">
									<TextField
										size="small"
										label="Password"
										type="password"
										name="password"
										id="password"
										key="password"
										className="form-control"
									/>
								</div>
								<button
									type="submit"
									className="btn btn-sm btn-primary px-4 fw-medium"
								>
									{loginLoading ? (
										<>
											<span
												className="spinner-border spinner-border-sm mr-2"
												role="status"
												aria-hidden="true"
											></span>
											Loading
										</>
									) : (
										'Log In'
									)}
								</button>
							</form>
						</div>
					</DialogContent>
				)}
			</Dialog>
		</>
	);
};

export default NewFormDialogComponent;
