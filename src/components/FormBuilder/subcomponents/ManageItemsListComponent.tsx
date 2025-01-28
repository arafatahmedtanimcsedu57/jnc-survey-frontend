import React, { FC, useEffect, useState } from 'react';
import { FormLayoutComponentChildrenItemsType } from '../../../types/FormTemplateTypes';
import {
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	TextField,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { generateID } from '../../../utils/common';

interface ManageItemsListComponentProps {
	items: FormLayoutComponentChildrenItemsType[] | undefined;
	addItemInList: (item: FormLayoutComponentChildrenItemsType) => void;
	deleteItemFromList: (item: FormLayoutComponentChildrenItemsType) => void;
	editIteminList: (item: FormLayoutComponentChildrenItemsType) => void;
}

const ManageItemsListComponent: FC<ManageItemsListComponentProps> = (props) => {
	// const [runningItemId, setRunningItemId] = useState(3);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [itemName, setItemName] = useState<string>('');
	const [itemValue, setItemValue] = useState<string>('');
	const [editItemId, setEditItemId] = useState<string | undefined>(undefined);

	const { items, addItemInList, deleteItemFromList, editIteminList } = props;

	useEffect(() => {
		cancelEditing();
	}, [items]);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const { name, value } = e.target;
		if (name === 'label') setItemName(value);
		if (name === 'value') setItemValue(value);
	};

	const changeToEditMode = (item: FormLayoutComponentChildrenItemsType) => {
		setItemName(item.label);
		setItemValue(item.value);
		setEditItemId(item.id);
		setEditMode(true);
	};

	const onSubmit: React.MouseEventHandler<HTMLInputElement> = (event) => {
		if (!editMode) {
			addItemInList({
				id: generateID(),
				value: `option_${(items?.length || 0) + 1}`,
				label: `Option ${(items?.length || 0) + 1}`,
			});
		} else {
			editIteminList({
				id: editItemId as string,
				value: itemValue,
				label: itemName,
			});
		}
	};

	const cancelEditing = () => {
		setEditMode(false);
		setItemName('');
		setItemValue('');
		setEditItemId(undefined);
	};

	return (
		<>
			<div>
				{/* <div className="mb-3">
					<TextField
						size="small"
						label="Item Label"
						name="label"
						onChange={handleChange}
						style={{ minWidth: '100%' }}
					/>
				</div>
				<div className="mb-3">
					<TextField
						size="small"
						label="Item Value"
						name="value"
						onChange={handleChange}
						style={{ minWidth: '100%' }}
					/>
				</div> */}
				<div className="d-flex flex-wrap gap-2">
					<input
						className="btn btn-outline-success btn-sm fw-medium px-4"
						value={'Add Item'}
						type="button"
						onClick={onSubmit}
					/>
				</div>
				<ul className="my-3  list-group list-group-sm">
					{items?.map((item) => {
						return (
							<li key={item.value} className="list-group-item">
								<div className="d-flex gap-2 justify-content-between align-items-center">
									<div>{item.label} </div>
									<div className="d-flex align-items-center gap-2">
										<IconButton
											size="small"
											edge="end"
											onClick={() => changeToEditMode(item)}
										>
											<Edit />
										</IconButton>
										<IconButton
											size="small"
											edge="end"
											onClick={() => deleteItemFromList(item)}
										>
											<Delete />
										</IconButton>
									</div>
								</div>

								{editMode && item.id === editItemId ? (
									<div>
										<div className="mb-3">
											<TextField
												size="small"
												label="Item Label"
												name="label"
												value={itemName}
												onChange={handleChange}
												style={{ minWidth: '100%' }}
											/>
										</div>
										<div className="mb-3">
											<TextField
												size="small"
												label="Item Value"
												name="value"
												value={itemValue}
												onChange={handleChange}
												style={{ minWidth: '100%' }}
											/>
										</div>
										<div className="d-flex flex-wrap gap-2">
											<input
												className="btn btn-outline-success btn-sm fw-medium px-4"
												value={'Edit Item'}
												type="button"
												onClick={onSubmit}
											/>
											{editMode && (
												<input
													className="btn btn-light btn-sm fw-medium px-4"
													value="Cancel"
													type="button"
													onClick={cancelEditing}
												/>
											)}
										</div>
									</div>
								) : (
									<></>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default ManageItemsListComponent;
