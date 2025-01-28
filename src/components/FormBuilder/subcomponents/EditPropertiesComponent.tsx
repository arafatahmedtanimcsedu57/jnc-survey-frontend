import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import _ from 'lodash';

import {
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

import ManageItemsListComponent from './ManageItemsListComponent';

import {
	FormLayoutComponentChildrenItemsType,
	FormLayoutComponentChildrenType,
	FormLayoutComponentContainerType,
} from '../../../types/FormTemplateTypes';
import {
	FormControlNames,
	FormItemTypes,
} from '../../../utils/formBuilderUtils';
import { FormLayoutComponentsType } from '../../../types/FormTemplateTypes';

interface EditPropertiesComponentProps {
	selectedControl?:
		| undefined
		| FormLayoutComponentChildrenType
		| FormLayoutComponentContainerType;
	selectControl?: (
		layout:
			| FormLayoutComponentChildrenType
			| FormLayoutComponentContainerType
			| undefined,
	) => void;
	editControlProperties: (updatedItem: FormLayoutComponentChildrenType) => void;
	editContainerProperties: (
		updatedItem: FormLayoutComponentContainerType,
	) => void;
	formLayoutComponents: FormLayoutComponentsType[];
	moveControlFromSide: (
		selectedControl: FormLayoutComponentChildrenType,
		moveControlObj: FormLayoutComponentChildrenType,
	) => void;
}

const EditPropertiesComponent: FC<
	PropsWithChildren<EditPropertiesComponentProps>
> = (props) => {
	const {
		selectedControl,
		selectControl,
		editControlProperties,
		editContainerProperties,
	} = props;
	const [updatedItem, setUpdatedItem] = useState<
		FormLayoutComponentChildrenType | FormLayoutComponentContainerType | {}
	>({});

	const childUpdatedItem = updatedItem as FormLayoutComponentChildrenType;
	const containerUpdatedItem = updatedItem as FormLayoutComponentContainerType;

	const [isUpdatedItemRequired, setIsUpdatedItemRequired] = useState(false);

	const [moveControlObj, setMoveControlObj] =
		useState<FormLayoutComponentChildrenType | null>(null);
	const [controlsInContainer, setControlsInContainer] = useState<
		number | undefined
	>(undefined);

	useEffect(() => {
		if (selectedControl) {
			if ((selectedControl as FormLayoutComponentChildrenType).items) {
				setUpdatedItem({
					...selectedControl,
					items: JSON.parse(
						JSON.stringify(
							(selectedControl as FormLayoutComponentChildrenType).items,
						),
					),
				});
			} else {
				setUpdatedItem({ ...selectedControl });
			}
			if (selectedControl.hasOwnProperty('required')) {
				setIsUpdatedItemRequired(
					(selectedControl as FormLayoutComponentChildrenType).required,
				);
			}
		}
		setMoveControlObj(null);
		setControlsInContainer(undefined);
	}, [selectedControl]);

	const handleChange: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		const { name, value } = e.target;
		setUpdatedItem((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const addItemInList = (item: FormLayoutComponentChildrenItemsType) => {
		const newItems = _.cloneDeep(
			(updatedItem as FormLayoutComponentChildrenType).items,
		);

		if (newItems) newItems.push(item);
		setUpdatedItem((prevState) => ({
			...prevState,
			items: newItems,
		}));
	};

	const deleteItemFromList = (item: FormLayoutComponentChildrenItemsType) => {
		const newItems = (
			updatedItem as FormLayoutComponentChildrenType
		).items?.filter((i) => i.id !== item.id);
		setUpdatedItem((prevState) => ({
			...prevState,
			items: newItems,
		}));
	};

	const editIteminList = (item: FormLayoutComponentChildrenItemsType) => {
		const newItems: FormLayoutComponentChildrenItemsType[] = _.cloneDeep(
			(updatedItem as FormLayoutComponentChildrenType).items,
		) as FormLayoutComponentChildrenItemsType[];

		const itemToBeReplaced = newItems.filter((i) => i.id === item.id)[0];
		itemToBeReplaced.value = item.value;
		itemToBeReplaced.label = item.label;
		setUpdatedItem((prevState) => ({
			...prevState,
			items: newItems,
		}));
	};

	const handleCheckChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const { name, value } = e.target;
		const key = e.currentTarget.checked;
		if (name === 'required') {
			setIsUpdatedItemRequired(key);
		}
		setUpdatedItem((prevState) => ({
			...prevState,
			[name]: key,
		}));
	};

	const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		editControlProperties(updatedItem as FormLayoutComponentChildrenType);
	};

	const onContainerFormSubmit: React.FormEventHandler<HTMLFormElement> = (
		event,
	) => {
		event.preventDefault();
		editContainerProperties(updatedItem as FormLayoutComponentContainerType);
	};

	return (
		<>
			<div className="p-3 mb-3 d-flex align-items-center "></div>
			{selectedControl ? (
				<>
					{containerUpdatedItem.itemType === FormItemTypes.CONTAINER ? (
						<>
							<div className="main-form ">
								<form
									onSubmit={onContainerFormSubmit}
									style={{ minWidth: '100%' }}
								>
									<div className="mb-3">
										<TextField
											label="Container Heading"
											name="heading"
											value={containerUpdatedItem.heading}
											onChange={handleChange}
											size="small"
											className="form-control"
											key="container_heading"
											id="container_heading"
										/>
									</div>

									<div className="mb-3">
										<TextField
											size="small"
											label="Container Sub-Heading"
											name="subHeading"
											value={containerUpdatedItem.subHeading}
											onChange={handleChange}
											className="form-control"
											key="container-sub-heading"
											id="container-sub-heading"
										/>
									</div>

									<div className="mb-3">
										<FormControlLabel
											key="skipable-confirmation"
											id="skipable-confirmation"
											control={
												<Checkbox
													value={containerUpdatedItem.skipAble}
													onChange={(e) => {
														const _: any = {
															target: {
																name: e.target.name,
																value: e.target.checked,
															},
														};
														handleChange(_);
													}}
													checked={containerUpdatedItem.skipAble}
													name="skipAble"
												/>
											}
											label="Cointainer is skip able?"
										/>
									</div>

									<div className="mb-3">
										<FormControl fullWidth id="field-type" key="field-type">
											<InputLabel size="small" id="demo-simple-select-label">
												Select Type
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="type"
												value={containerUpdatedItem.type}
												label="Select Type"
												name="type"
												onChange={(e: any) => handleChange(e)}
												size="small"
											>
												<MenuItem key="input" value={'INPUT'}>
													INPUT
												</MenuItem>
												<MenuItem key="signature" value={'SIGNATURE'}>
													SIGNATURE
												</MenuItem>
											</Select>
										</FormControl>
									</div>

									<div className="d-flex flex-wrap gap-2">
										<button
											key="update-block"
											type="submit"
											className="btn btn-sm btn-warning px-4 fw-medium"
										>
											Update Data
										</button>
										<button
											key="cancle-block"
											type="button"
											className="btn btn-sm btn-light px-4 fw-medium"
											onClick={() => {
												if (selectControl) selectControl(undefined);
											}}
										>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</>
					) : (
						<>
							<div className="main-form">
								<form onSubmit={onFormSubmit} style={{ minWidth: '100%' }}>
									<div className="mb-3">
										<TextField
											id="field-label"
											key="field-label"
											size="small"
											label="Label"
											name="labelName"
											value={childUpdatedItem.labelName}
											onChange={handleChange}
											className="form-control"
										/>
									</div>

									<div className="mb-3">
										<TextField
											id="field-name"
											key="field-name"
											size="small"
											label="Internal Name"
											name="name"
											value={childUpdatedItem.name}
											onChange={handleChange}
											className="form-control"
										/>
									</div>

									<div className="mb-3">
										<TextField
											id="field-Sequence"
											key="field-Sequence"
											label="Field Sequence"
											name="sequence"
											value={childUpdatedItem.sequence}
											onChange={handleChange}
											className="form-control"
											size="small"
										/>
									</div>

									<div className="mb-3">
										<TextField
											id="field-placeholder"
											key="field-placeholder"
											size="small"
											label="Placeholder"
											name="placeholder"
											value={childUpdatedItem.placeholder}
											onChange={handleChange}
											className="form-control"
										/>
									</div>

									<div className="mb-3">
										<TextField
											id="field-information"
											key="field-information"
											size="small"
											label="Description"
											name="description"
											value={childUpdatedItem.description}
											onChange={handleChange}
											className="form-control"
										/>
									</div>

									<div className="mb-3">
										<FormControlLabel
											id="field-required"
											key="field-required"
											control={
												<Checkbox
													checked={isUpdatedItemRequired}
													name="required"
													onChange={handleCheckChange}
													size="small"
												/>
											}
											label="Required"
										/>
									</div>

									{childUpdatedItem.controlName ===
										FormControlNames.RADIOGROUP ||
									childUpdatedItem.controlName ===
										FormControlNames.SELECTDROPDOWN ||
									childUpdatedItem.controlName === FormControlNames.CHECKBOX ? (
										<>
											<h6>Options</h6>
											<ManageItemsListComponent
												addItemInList={addItemInList}
												editIteminList={editIteminList}
												deleteItemFromList={deleteItemFromList}
												items={childUpdatedItem.items}
											/>
										</>
									) : (
										<></>
									)}

									<div className="mb-5"></div>
									<hr />
									<div className="mt-5"></div>

									<div className="d-flex flex-row-reverse flex-wrap gap-2">
										<button
											type="submit"
											className="btn btn-sm btn-warning px-4 fw-medium"
											id="field-update"
											key="field-update"
										>
											Update Data
										</button>
										<button
											type="button"
											id="field-cancel"
											key="field-cancel"
											className="btn btn-sm btn-light px-4 fw-medium"
											onClick={() => {
												if (selectControl) selectControl(undefined);
											}}
										>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</>
					)}
				</>
			) : (
				<>
					<div className="alert alert-warning">
						<h4>Note!</h4>
						You need to select a container or control to edit properties.
					</div>
				</>
			)}
		</>
	);
};

export default EditPropertiesComponent;
