import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {
	isMobile as libIsMobile,
	isTablet as libIsTablet,
} from 'react-device-detect';

import DropContainerComponent from './subcomponents/DropContainerComponent';
import EditPropertiesComponent from './subcomponents/EditPropertiesComponent';
import FormPreview from './subcomponents/FormPreview';
import LeftSidebar from './LeftSidebar';
import SaveConfirmation from './SaveConfirmation';

import useFormBuilder from './hooks/useFormBuilder';
import useFormPreview from './hooks/useFormPreview';

import { FormItemTypes } from '../../utils/formBuilderUtils';
import { TemplateType } from '../../types/FormTemplateTypes';
import { FileType } from '../../types/FileType';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import ArrowLeft from '../../assets/svg/ArrowLeft';
import Save from '../../assets/svg/Save';
import Eye from '../../assets/svg/Eye';
import {
	Divider,
	IconButton,
	InputBase,
	Paper,
	TextField,
} from '@mui/material';

let isMobile: boolean;
if (process.env.NODE_ENV === 'localhost') {
	isMobile = window.innerWidth < 992;
} else {
	isMobile = libIsMobile || libIsTablet || window.innerWidth < 992;
}

interface FormBuilderProps {
	template: TemplateType;
	file: FileType | null;
	status: string | null;
}

const FormBuilder: React.FC<PropsWithChildren<FormBuilderProps>> = ({
	template,
	file,
	status,
}) => {
	const {
		handleItemAdded,
		saveForm,
		deleteContainer,
		deleteControl,
		editContainerProperties,
		editControlProperties,
		moveControl,
		moveControlFromSide,
		selectControl,
		saveFormName,
		selectedTemplate,
		formLayoutComponents,
		selectedControl,
		currentFormName,
		setCurrentFormName,
	} = useFormBuilder({ template });

	const navigate = useNavigate();
	const [showSaveConfirmation, setShowSaveConfirmation] =
		useState<boolean>(false);

	const [editFormName, setEditFormName] = useState<boolean>(false);

	const { showPreview, openPreviewDrawer, closePreviewDrawer } =
		useFormPreview();

	return (
		<>
			{!isMobile ? (
				<div className="d-flex flex-column h-100">
					<DndProvider backend={HTML5Backend}>
						<div className="d-flex flex-row gap-4 justify-content-between w-100 h-100">
							<div
								className="h-100 bg-white border-end"
								style={{
									overflowY: 'auto',
									minWidth: '300px',
									maxWidth: '300px',
								}}
							>
								<LeftSidebar
									handleItemAdded={handleItemAdded}
									formLayoutComponents={formLayoutComponents}
									file={file} //form structure
								/>
							</div>

							<div className="d-flex flex-column flex-fill h-100 py-4">
								<div className="col-lg-12 d-flex flex-column h-100">
									<div className="d-flex flex-wrap justify-content-between gap-2">
										{editFormName ? (
											<div>
												{/* <TextField
													type="text"
													fullWidth={true}
													placeholder="Enter a name"
													variant="outlined"
													size="small"
													value={currentFormName}
													onChange={(e) => setCurrentFormName(e.target.value)}
													className="w-100"
												/> */}

												<Paper
													component="form"
													sx={{
														display: 'flex',
														alignItems: 'center',
														width: 400,
													}}
												>
													<InputBase
														size="small"
														sx={{ ml: 1, flex: 1 }}
														placeholder="Enter Form Name"
														value={currentFormName}
														onChange={(e) => setCurrentFormName(e.target.value)}
													/>

													<Divider
														sx={{ height: 28, m: 0.5 }}
														orientation="vertical"
													/>
													<IconButton
														size="small"
														color="primary"
														aria-label="directions"
														onClick={() => {
															saveFormName(currentFormName || 'Example');
															setEditFormName(false);
															// navigate(0);
														}}
													>
														<DirectionsIcon />
													</IconButton>
												</Paper>
											</div>
										) : (
											<h5
												className=""
												onClick={() => {
													setEditFormName(true);
													setCurrentFormName(selectedTemplate?.formName || '');
												}}
											>
												{currentFormName || selectedTemplate?.formName}
											</h5>
										)}
										<div className="d-flex gap-2 flex-wrap">
											<div>
												<button
													onClick={() => navigate('/')}
													className="btn btn-sm btn-outline-primary d-flex gap-2 justify-content-between align-items-center px-4 fw-medium"
													type="button"
												>
													<ArrowLeft width="16" height="16" /> <div>Back</div>
												</button>
											</div>
											{status === 'draft' ? (
												<>
													<div>
														<button
															type="button"
															className="btn btn-sm bg-success fw-medium d-flex gap-2 align-items-center px-4 text-light"
															onClick={() => saveForm(setShowSaveConfirmation)}
														>
															<Save width="16" height="16" /> <div>Save</div>
														</button>
													</div>
													<div>
														<button
															onClick={() => openPreviewDrawer()}
															className="btn btn-sm bg-secondary px-4 text-light fw-medium d-flex gap-2 align-items-center"
															type="button"
														>
															<Eye width="16" height="16" /> <div>Preview</div>
														</button>
													</div>
												</>
											) : (
												<></>
											)}
										</div>
									</div>

									<div
										className="mt-3 overflow-auto flex-1 h-100"
										style={{
											overflowY: 'auto',
										}}
									>
										{formLayoutComponents.map((layout, ind) => {
											return (
												<div>
													<DropContainerComponent
														key={layout.container.id}
														index={ind}
														layout={layout.container}
														selectedControl={selectedControl}
														childrenComponents={layout.children}
														deleteContainer={deleteContainer}
														deleteControl={deleteControl}
														selectControl={selectControl}
														accept={FormItemTypes.CONTROL}
														moveControl={moveControl}
													/>
												</div>
											);
										})}

										<DropContainerComponent
											accept={FormItemTypes.CONTAINER}
											name={'Parent Component'}
											handleItemAdded={handleItemAdded}
										/>
									</div>
								</div>
							</div>

							<div
								className="h-100 p-4 bg-white border-start flex-fill"
								style={{
									minWidth: '350px',
									maxWidth: '950px',
									overflowY: 'auto',
								}}
							>
								<EditPropertiesComponent
									selectedControl={selectedControl}
									selectControl={selectControl}
									formLayoutComponents={formLayoutComponents}
									moveControlFromSide={moveControlFromSide}
									editContainerProperties={editContainerProperties}
									editControlProperties={editControlProperties}
								/>
							</div>
						</div>
						{/* Preview Drawer */}
						<FormPreview
							screenType="mobile"
							showPreview={showPreview}
							formLayoutComponents={formLayoutComponents}
							closePreviewDrawer={closePreviewDrawer}
						/>
						{/* Confirmation Drawer */}
					</DndProvider>
				</div>
			) : (
				<>
					<div className="wrapper mt-5">
						<p className="text-center text-info-emphasis">
							Form Builder is only supported on desktop devices for now. Please
							switch to a desktop device.
						</p>
					</div>
				</>
			)}

			<SaveConfirmation
				template={template}
				formLayoutComponents={formLayoutComponents}
				openDialog={showSaveConfirmation}
				setOpenDialog={setShowSaveConfirmation}
				file={file}
			/>
		</>
	);
};

export default FormBuilder;
