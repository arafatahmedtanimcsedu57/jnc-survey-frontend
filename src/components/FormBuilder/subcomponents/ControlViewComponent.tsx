import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';

import { FormLayoutComponentChildrenType } from '../../../types/FormTemplateTypes';
import {
	FormControlNames,
	FormItemTypes,
} from '../../../utils/formBuilderUtils';

import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Switch,
	TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import Trash from '../../../assets/svg/Trash';
import ThreeDotsVertical from '../../../assets/svg/ThreeDotsVertical';

const selectedColor = '#ffc107';
const nonSelectedColor = 'rgba(0,0,0,0.1)';

const renderItem = (item: FormLayoutComponentChildrenType) => {
	switch (item.controlName) {
		case FormControlNames.INPUTTEXTFIELD:
			return (
				<>
					<TextField
						type={item.dataType}
						fullWidth={true}
						placeholder={item.placeholder}
						variant="outlined"
						size="small"
					/>
				</>
			);

		case FormControlNames.INPUTMULTILINE:
			return (
				<>
					<TextField
						type={item.dataType}
						fullWidth={true}
						multiline={true}
						minRows={item.rows}
						placeholder={item.placeholder}
						variant="outlined"
					/>
				</>
			);
		case FormControlNames.CHECKBOX:
			return (
				<>
					{/* <div className="m-t-20 p-l-0">
						<FormControlLabel
							control={<Checkbox />}
							style={{ marginLeft: '0px' }}
							label={item.placeholder}
						/>
					</div> */}

					<FormControl>
						<RadioGroup name={item.controlName + item.id}>
							{item.items?.map((i) => (
								<FormControlLabel
									value={i.value}
									key={i.value}
									control={<Checkbox />}
									label={i.label}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</>
			);

		case FormControlNames.MULTICHOICES:
			return (
				<>
					<FormControl>
						<RadioGroup name={item.controlName + item.id} row>
							{item.items?.map((i) => (
								<FormControlLabel
									value={i.value}
									key={i.value}
									control={<Checkbox />}
									label={i.label}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</>
			);

		case FormControlNames.RADIOGROUP:
			return (
				<>
					<FormControl>
						<RadioGroup name={item.controlName + item.id} row>
							{item.items?.map((i) => (
								<FormControlLabel
									value={i.value}
									key={i.value}
									control={<Radio />}
									label={i.label}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</>
			);

		case FormControlNames.SELECTDROPDOWN:
			return (
				<>
					<FormControl style={{ minWidth: '100%' }}>
						<Select
							variant="outlined"
							value={item.items && item.items[0].value}
							size="small"
						>
							{item.items?.map((i, ind) => (
								<MenuItem key={i.value} value={i.value}>
									{i.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</>
			);

		case FormControlNames.DATEFIELD:
			return (
				<>
					<LocalizationProvider dateAdapter={AdapterMoment}>
						<DatePicker slotProps={{ textField: { fullWidth: true } }} />
					</LocalizationProvider>
				</>
			);

		case FormControlNames.TIMEFIELD:
			return (
				<>
					<LocalizationProvider dateAdapter={AdapterMoment}>
						<TimePicker slotProps={{ textField: { fullWidth: true } }} />
					</LocalizationProvider>
				</>
			);

		case FormControlNames.FILEUPLOAD:
			return (
				<>
					<input
						style={{ display: 'none' }}
						id={item.controlName + item.id}
						type="file"
					/>
					<label
						className="control-input-trigger-buttons"
						htmlFor={item.controlName + item.id}
					>
						<i className="fas fa-cloud-upload-alt"></i>
					</label>
				</>
			);

		case FormControlNames.IMAGEUPLOAD:
			return (
				<>
					<input
						style={{ display: 'none' }}
						id={item.controlName + item.id}
						type="file"
					/>
					<label
						className="control-input-trigger-buttons"
						htmlFor={item.controlName + item.id}
					>
						<i className="far fa-image"></i>
					</label>
				</>
			);

		case FormControlNames.SCANCODE:
			return (
				<>
					ffc107
					<input
						style={{ display: 'none' }}
						id={item.controlName + item.id}
						type="file"
					/>
					<label
						className="control-input-trigger-buttons"
						htmlFor={item.controlName + item.id}
					>
						<i className="fas fa-qrcode"></i>
					</label>
				</>
			);

		case FormControlNames.SCANCODE:
			return (
				<>
					<input
						style={{ display: 'none' }}
						id={item.controlName + item.id}
						type="file"
					/>
					<label
						className="control-input-trigger-buttons"
						htmlFor={item.controlName + item.id}
					>
						<i className="fas fa-qrcode"></i>ffc107
					</label>
				</>
			);

		case FormControlNames.SIGNATURE:
			return (
				<>
					<label className="form-control" htmlFor={item.controlName + item.id}>
						<span className="sign-label">Sign Here</span>
					</label>
				</>
			);

		case FormControlNames.TOGGLE:
			return (
				<>
					<Switch checked={true} />
				</>
			);

		case FormControlNames.CHECKLIST:
			return (
				<>
					<FormGroup>
						{item.items?.map((i, ind) => (
							<FormControlLabel
								key={i.value}
								control={<Checkbox />}
								label={i.label}
								style={{ marginLeft: '0px' }}
							/>
						))}
					</FormGroup>
				</>
			);
	}
};

interface ControlViewComponentProps {
	item: any;
	deleteControl: (itemId: string, containerId: string) => void;
	containerId: string;
	selectControl: (item: FormLayoutComponentChildrenType) => void;
	selectedControl: any;
	index: number;
	moveControl: (
		item: FormLayoutComponentChildrenType,
		dragIndex: number,
		hoverIndex: number,
		containerId: string,
	) => void;
}

function ControlViewComponent(props: ControlViewComponentProps) {
	const {
		item,
		deleteControl,
		containerId,
		selectControl,
		selectedControl,
		index,
		moveControl,
	} = props;

	let colBackgroundcolor = nonSelectedColor;
	let color = '';
	let wrapperStyle = {
		border: '1px solid ' + nonSelectedColor,
		borderRadius: '9px',
		marginBottom: '20px',
		backgroundColor: 'white',
		cursor: 'pointer',
	};

	// Check if its the same type and id to change color.
	if (
		selectedControl &&
		item.id === selectedControl.id &&
		item.type === selectedControl.type
	) {
		wrapperStyle.border = '2px solid ' + selectedColor;
		colBackgroundcolor = selectedColor;
		color = 'white';
	}

	const handleDeleteControl: React.MouseEventHandler<HTMLSpanElement> = (
		event,
	) => {
		deleteControl(item.id, containerId);
		if (event.stopPropagation) event.stopPropagation();
	};

	// Drag & Sort Code for functionality

	const ref = useRef<HTMLDivElement>(null);
	const [{ handlerId }, drop] = useDrop<
		FormLayoutComponentChildrenType,
		void,
		{ handlerId: Identifier | null }
	>({
		accept: FormItemTypes.CONTROL,
		collect(monitor: any) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: FormLayoutComponentChildrenType, monitor: any) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}
			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			// Dragging upwards
			if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			// Time to actually perform the action
			moveControl(item, dragIndex as number, hoverIndex, containerId);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag, preview] = useDrag({
		type: FormItemTypes.CONTROL,
		item: () => {
			return { ...item, index };
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<>
			<div
				ref={ref}
				className="row w-100 align-items-stretch justify-content-end px-2 py-4"
				onClick={() => selectControl(item)}
				style={{ ...wrapperStyle, opacity }}
			>
				<div className="col-12">
					<div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
						<div>
							<h5 className="fs-6">
								{item.labelName}{' '}
								<span className="text-danger">{item.required ? ' *' : ''}</span>
							</h5>

							{item.description !== '' ? (
								<div className="">
									<p>{item.description}</p>
								</div>
							) : (
								<></>
							)}
						</div>
						<div className="d-flex gap-2">
							<button
								className="btn btn-sm btn-danger"
								onClick={handleDeleteControl}
							>
								<Trash width="16" height="16" />
							</button>

							<button
								className="btn btn-sm btn-light"
								style={{ cursor: 'grab' }}
							>
								<ThreeDotsVertical width="16" height="16" />
							</button>
						</div>
					</div>

					<div className="mt-3">{renderItem(item)}</div>
				</div>
			</div>
		</>
	);
}

export default ControlViewComponent;
