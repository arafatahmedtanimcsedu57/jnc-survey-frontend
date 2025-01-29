import { generateID } from './common';

export const FormControlNames = {
  STEPCONTAINER: 'step-container',
  INPUTTEXTFIELD: 'text-field',
  INPUTMULTILINE: 'multiline-text-field',
  CHECKBOX: 'checkbox',
  RADIOGROUP: 'radio-group',
  SELECTDROPDOWN: 'select-drop-down',
  DATEFIELD: 'date-field',
  TIMEFIELD: 'time-field',
  FILEUPLOAD: 'file-upload',
  IMAGEUPLOAD: 'image-upload',
  TOGGLE: 'toggle',
  CHECKLIST: 'checklist',
  SIGNATURE: 'signature',
  MULTICHOICES: 'multi-choices',
  SCANCODE: 'scan-code',
  VERIFIEDID: 'verified-id',
  INFORMATION: 'information',
};

export const FormTextDataTypes = {
  TEXT: 'text',
};

export const FormItemTypes = {
  CONTROL: 'control',
  CONTAINER: 'container',
};

export const FormPublishStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

export const FormContainerList = [
  {
    id: '',
    controlName: FormControlNames.STEPCONTAINER,
    displayText: 'Block',
    itemType: FormItemTypes.CONTAINER,
    icon: 'bi bi-building',
    heading: 'Block Name',
    subHeading: 'Block Text (optional)',
    skipAble: false,
    type: 'INPUT',
  },
];

export const FormControlList = [
  {
    id: '',
    controlName: FormControlNames.FILEUPLOAD,
    displayText: 'Upload',
    description: 'Some Description about the field',
    labelName: 'Label for File Upload',
    itemType: FormItemTypes.CONTROL,
    icon: 'fas fa-cloud-upload-alt',
    required: false,
    category: 'media-elements',
    containerId: '',
    placeholder: 'Placeholder for File Upload',
    name: 'File Upload',
    sequence: 0,
  },
  {
    id: '',
    controlName: FormControlNames.RADIOGROUP,
    displayText: 'Radio',
    description: 'Some Description about the field',
    labelName: 'Label for Radio',
    itemType: FormItemTypes.CONTROL,
    icon: 'bi bi-dot-circle',
    required: false,
    category: 'other-elements',
    items: [
      {
        id: generateID(),
        value: 'Button__-1',
        label: 'Button 1',
      },
      {
        id: generateID(),
        value: 'Button__-2',
        label: 'Button 2',
      },
    ],

    containerId: '',
    placeholder: 'Placeholder for Radio',
    name: 'Radio',
    sequence: 0,
  },

  // {
  // 	id: '',
  // 	controlName: FormControlNames.CHECKLIST,
  // 	displayText: 'Check List',
  // 	description: 'Some Description about the field',
  // 	labelName: 'Label for Select',
  // 	itemType: FormItemTypes.CONTROL,
  // 	icon: 'bi bi-dot-circle',
  // 	required: false,
  // 	category: 'other-elements',
  // 	items: [
  // 		{
  // 			id: generateID(),
  // 			value: 'Button__-1',
  // 			label: 'Button 1',
  // 		},
  // 		{
  // 			id: generateID(),
  // 			value: 'Button__-2',
  // 			label: 'Button 2',
  // 		},
  // 	],

  // 	containerId: '',
  // 	placeholder: 'Placeholder for Select',
  // 	name: 'Check List',
  // 	sequence: 0,
  // },

  {
    id: '',
    controlName: FormControlNames.INPUTTEXTFIELD,
    displayText: 'Text Field',
    description: 'Some Description about the field',
    labelName: 'Text Field',
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.TEXT,
    icon: 'fas fa-text-height',
    required: false,
    category: 'text-elements',

    containerId: '',
    placeholder: 'Placeholder for Text Field',
    name: 'Text Field',
    sequence: 0,
  },

  {
    id: '',
    controlName: FormControlNames.SELECTDROPDOWN,
    displayText: 'Dropdown',
    description: 'Some Description about the field',
    labelName: 'Label for Dropdown',
    itemType: FormItemTypes.CONTROL,
    icon: 'bi bi-caret-square-down',
    required: false,
    items: [
      {
        id: generateID(),
        value: 'Option__-1',
        label: 'Option 1',
      },
      {
        id: generateID(),
        value: 'Option__-2',
        label: 'Option 2',
      },
    ],
    category: 'other-elements',

    containerId: '',
    placeholder: 'Placeholder for Select',
    name: 'Dropdown',
    sequence: 0,
  },
  // PHONE
  {
    id: '',
    controlName: FormControlNames.DATEFIELD,
    displayText: 'Date Picker',
    description: 'Some Description about the field',
    labelName: 'Label for Date',
    itemType: FormItemTypes.CONTROL,
    icon: 'bi bi-calendar',
    required: false,
    category: 'date-elements',

    containerId: '',
    name: 'Date Field',
    placeholder: 'Placeholder for Date Field',
    sequence: 0,
  },
  // MULTISELECT
  {
    id: '',
    controlName: FormControlNames.IMAGEUPLOAD,
    displayText: 'Image',
    description: 'Some Description about the field',
    labelName: 'Label for Image Upload',
    itemType: FormItemTypes.CONTROL,
    icon: 'bi bi-image',
    required: false,
    category: 'media-elements',

    containerId: '',
    name: 'Image Upload',
    placeholder: 'Placeholder for Image Upload',
    sequence: 0,
  },

  {
    id: '',
    controlName: FormControlNames.CHECKBOX,
    displayText: 'Check Box',
    description: 'Some Description about the field',
    labelName: 'Label for Checkbox',
    itemType: FormItemTypes.CONTROL,
    icon: 'bi bi-check-square',
    required: false,
    category: 'other-elements',
    items: [
      {
        id: generateID(),
        value: 'Button__-1',
        label: 'Button 1',
      },
      {
        id: generateID(),
        value: 'Button__-2',
        label: 'Button 2',
      },
    ],
    containerId: '',
    name: 'Checkbox',
    sequence: 0,
    placeholder: 'Place Holder Checkbox',
  },

  {
    id: '',
    controlName: FormControlNames.INFORMATION,
    displayText: 'Title/Paragraph Text',
    description: 'Some Description about the field',
    labelName: 'Label for information',
    itemType: FormItemTypes.CONTROL,
    icon: 'bi bi-check-square',
    required: false,
    category: 'other-elements',

    containerId: '',
    name: 'information',
    sequence: 0,
    placeholder: 'Place Holder Information',
  },
];
