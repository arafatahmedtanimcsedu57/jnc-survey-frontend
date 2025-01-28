import { useState } from 'react';
import moment from 'moment';

import { useAppDispatch } from '../../../redux/hooks';
import { saveTemplate } from '../../../redux/entities/formBuilderEntity';

import {
	FormItemTypes,
	FormPublishStatus,
} from '../../../utils/formBuilderUtils';
import { generateID } from '../../../utils/common';

import useModalStrip from '../../../global-hooks/useModalStrip';
import {
	TemplateType,
	FormLayoutComponentsType,
	FormLayoutComponentChildrenType,
	FormLayoutComponentContainerType,
} from '../../../types/FormTemplateTypes';

interface useFormBuilderProps {
	template: TemplateType;
}

const useFormBuilder = ({ template }: useFormBuilderProps) => {
	const [selectedTemplate, setSelectedTemplate] = useState<null | TemplateType>(
		template,
	);
	const [formLayoutComponents, setFormLayoutComponents] = useState<
		FormLayoutComponentsType[]
	>(template.formLayoutComponents);
	const [selectedControl, setSelectedControl] = useState<
		| undefined
		| FormLayoutComponentContainerType
		| FormLayoutComponentChildrenType
	>(undefined);

	const [currentFormName, setCurrentFormName] = useState<string>('');

	const dispatch = useAppDispatch();
	const { showModalStrip } = useModalStrip();

	const handleItemAdded = (
		item: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
		containerId?: string,
	) => {
		if (item.itemType === FormItemTypes.CONTAINER) {
			const newState = formLayoutComponents.slice();
			newState.push({
				container: {
					...(item as FormLayoutComponentContainerType),
					id: generateID(),
				},
				children: [],
			});
			setFormLayoutComponents(newState);
		} else if (item.itemType === FormItemTypes.CONTROL) {
			const newState = formLayoutComponents.slice();
			const formContainerId = newState.findIndex(
				(f) => f.container.id === containerId,
			);
			const formContainer = { ...newState[formContainerId] };
			const obj = {
				...(item as FormLayoutComponentChildrenType),
				id: generateID(),
				containerId: containerId,
			};

			const childItem = item as FormLayoutComponentChildrenType;
			if (childItem.items)
				obj.items = JSON.parse(JSON.stringify(childItem.items));

			const newChildren = formContainer.children.slice();
			newChildren.push(obj as FormLayoutComponentChildrenType);
			formContainer.children = newChildren;
			newState[formContainerId] = formContainer;
			setFormLayoutComponents(newState);
		}
	};

	const deleteContainer = (containerId: string) => {
		if (confirm('Are you sure you want to delete container?')) {
			const newState = formLayoutComponents.filter(
				(comp) => comp.container.id !== containerId,
			);
			setFormLayoutComponents(newState);
			setSelectedControl((prev) =>
				prev &&
				(prev.id === containerId ||
					(prev as FormLayoutComponentChildrenType).containerId === containerId)
					? undefined
					: prev,
			);
		}
	};

	const deleteControl = (controlId: string, containerId: string) => {
		const newState = formLayoutComponents.map((component) => {
			if (component.container.id === containerId) {
				return {
					...component,
					children: component.children.filter(
						(child) => child.id !== controlId,
					),
				};
			}
			return component;
		});

		setFormLayoutComponents(newState);
		setSelectedControl((prev) =>
			prev && prev.id === controlId ? undefined : prev,
		);
	};

	const selectControl = (
		item:
			| FormLayoutComponentChildrenType
			| FormLayoutComponentContainerType
			| undefined,
	) => setSelectedControl(item);

	const editControlProperties = (item: FormLayoutComponentChildrenType) => {
		const newState = formLayoutComponents.slice();
		const formContainerId = newState.findIndex(
			(comp) => comp.container.id === item.containerId,
		);
		let formContainer = { ...newState[formContainerId] };
		formContainer?.children?.forEach((child, ind) => {
			if (child.id === item.id) {
				const newChildren = formContainer.children.slice();
				newChildren[ind] = item;
				formContainer.children = newChildren;
				return;
			}
		});
		newState[formContainerId] = formContainer;
		setFormLayoutComponents(newState);
	};

	const editContainerProperties = (item: FormLayoutComponentContainerType) => {
		const newState = formLayoutComponents.slice();
		const formContainerId = newState.findIndex(
			(comp) => comp.container.id === item.id,
		);
		const formContainer = { ...newState[formContainerId] };
		formContainer.container = {
			...formContainer.container,
			heading: item.heading,
			subHeading: item.subHeading,
			skipAble: item.skipAble,
			type: item.type,
		};
		newState[formContainerId] = formContainer;

		setFormLayoutComponents(newState);
	};

	const moveControlFromSide = (
		item: FormLayoutComponentChildrenType,
		{ containerId, position }: FormLayoutComponentChildrenType,
	) => {
		let componentsCopy: FormLayoutComponentsType[] = JSON.parse(
			JSON.stringify(formLayoutComponents),
		);

		const currentItemContainer = componentsCopy.filter(
			(con) => con.container.id === item.containerId,
		)[0];
		const moveItemToContainer = componentsCopy.filter(
			(con, ind) => con.container.id === containerId,
		)[0];

		const itemIndex = currentItemContainer.children.findIndex(
			(child) => child.id === item.id,
		);
		const deletedItem = currentItemContainer.children.splice(itemIndex, 1);
		deletedItem[0].containerId = containerId;

		if (position !== undefined)
			moveItemToContainer.children.splice(position, 0, deletedItem[0]);
		else {
			if (item.containerId !== containerId) {
				if (position)
					moveItemToContainer.children.splice(position, 0, deletedItem[0]);
				else moveItemToContainer.children.splice(itemIndex, 0, deletedItem[0]);
			}
		}
		setSelectedControl(deletedItem[0]);
		setFormLayoutComponents(componentsCopy);
	};

	const moveControl = (
		item: FormLayoutComponentChildrenType,
		dragIndex: number,
		hoverIndex: number,
		containerId: string,
	) => {
		if (item === undefined) return;

		let componentsCopy: FormLayoutComponentsType[] = JSON.parse(
			JSON.stringify(formLayoutComponents),
		);

		if (dragIndex !== undefined && item.id) {
			if (item.containerId === containerId) {
				const formContainer = componentsCopy.filter(
					(con) => con.container.id === containerId,
				)[0];
				const deletedItem = formContainer.children.splice(
					formContainer.children.findIndex((con) => con.id === item.id),
					1,
				);
				if (deletedItem.length === 0) return;

				formContainer.children.splice(hoverIndex, 0, deletedItem[0]);
			}
			setFormLayoutComponents(componentsCopy);
		}
	};

	const checkIfControlsInContainer = () => {
		for (let i = 0; i < formLayoutComponents.length; i++) {
			let componentChildren = formLayoutComponents[i].children;
			if (componentChildren.length === 0) {
				showModalStrip(
					'danger',
					'You need to have controls inside containers before updating.',
					5000,
				);
				return false;
			}
		}
		return true;
	};

	const saveForm = (setShowSaveConfirmation: (arg0: boolean) => void) => {
		if (formLayoutComponents.length === 0) {
			showModalStrip('danger', 'Form cannot be empty', 5000);
			return;
		}

		if (!checkIfControlsInContainer()) return;

		const currentTemplate = JSON.parse(JSON.stringify(selectedTemplate));

		currentTemplate.formLayoutComponents = formLayoutComponents;
		currentTemplate.publishStatus = FormPublishStatus.DRAFT;
		currentTemplate.updatedAt = moment().unix() * 1000;

		dispatch(saveTemplate(currentTemplate))
			.unwrap()
			.then(() => {
				showModalStrip('success', 'Changes in Form Saved.', 5000);
				setShowSaveConfirmation(true);
			});
	};

	const saveFormName = (name: string) => {
		const currentTemplate = JSON.parse(JSON.stringify(selectedTemplate));

		currentTemplate.formName = name;
		dispatch(saveTemplate(currentTemplate))
			.unwrap()
			.then(() => {
				showModalStrip('success', 'Form Name Updated.', 5000);
			});
	};

	return {
		handleItemAdded,
		deleteContainer,
		deleteControl,
		selectControl,
		editContainerProperties,
		editControlProperties,
		moveControlFromSide,
		moveControl,
		saveForm,
		setCurrentFormName,
		saveFormName,
		selectedTemplate,
		formLayoutComponents,
		selectedControl,
		currentFormName,
	};
};

export default useFormBuilder;
