import { Form, FormRequestType } from '../types/ResponseFormTypes';

function currentDateTime(date: string): string {
  return new Date(date).toISOString();
}

function convertForm(input: Form) {
  const converted = {
    id: input.id,
    formId: input.formId,
    formName: input.formName,
    file: input.pdf,
    createdAt: currentDateTime(input.creationDate),
    creator: 'Test User',
    formLayoutComponents: input.blocks.map((block) => ({
      container: {
        id: block.id,
        controlName: 'step-container',
        displayText: 'Block',
        itemType: 'container',
        icon: 'fa fa-building',
        heading: block.title,
        subHeading: '',
        skipAble: block.skipAble,
        type: 'INPUT',
      },
      children: block.fields.map((field) => ({
        id: field.id,
        controlName: convertControlName(field.type),
        displayText: field.label,
        description: field.information || '',
        placeholder: field.placeholder || '',
        labelName: field.label,
        itemType: 'control',
        icon: getIconForControl(field.type),
        required: field.required,
        category: getCategoryForControl(field.type),
        containerId: field.id,
        name: field.name,
        sequence: field.sequence,
        ...(field.options
          ? {
              items: field.options.map((option) => ({
                id: option.id,
                value: option.value,
                label: option.label,
              })),
            }
          : {}),
      })),
    })),
    lastPublishedAt: currentDateTime(input.modificationDate),
    publishHistory: [],
    publishStatus: 'saved',
    updatedAt: currentDateTime(input.modificationDate),
  };

  return converted;
}

export function responseAllSurveyConvertForm(input: FormRequestType) {
  const converted = {
    id: input.id,
    formId: input.id,
    formName: input.name,

    publishStatus: 'saved',
  };

  return converted;
}

export function responseSingleSurveyConvertForm(input: FormRequestType) {
  const converted = {
    id: input.id,
    formId: input.id,
    formName: input.name,
    file: input.pdf,
    creator: 'Test User',
    formLayoutComponents: Array.isArray(input?.questions)
      ? input?.questions?.map((block, index) => ({
          container: {
            id: index, // block.id bhai,
            controlName: 'step-container',
            displayText: 'Block',
            itemType: 'container',
            icon: 'fa fa-building',
            heading: block.title || '',
            subHeading: '',
            skipAble: block.skipAble || false,
            type: 'INPUT',
          },
          children: block?.fields?.map((field, index) => ({
            id: index, // field.id bhai,
            controlName: convertControlName(field.type),
            displayText: field?.label,
            description: field?.information || '',
            placeholder: field?.placeholder || '',
            labelName: field?.label,
            itemType: 'control',
            icon: getIconForControl(field.type),
            required: field?.required,
            category: getCategoryForControl(field.type),
            containerId: index, //field?.id,
            name: field?.name,
            sequence: field?.sequence,
            ...(field?.options
              ? {
                  items: field.options.map((option) => ({
                    id: option.id,
                    value: option.value,
                    label: option.label,
                  })),
                }
              : {}),
          })),
        }))
      : [],
    publishHistory: [],
    publishStatus: 'saved',
  };

  return converted;
}
function convertControlName(type: string): string {
  switch (type) {
    case 'SIGNATURE':
      return 'signature';
    case 'SELECT':
      return 'select-drop-down';
    case 'DROPDOWN':
      return 'select-drop-down';
    case 'INFORMATION':
      return 'information';
    case 'DATETIME':
      return 'date-field';
    case 'TEXT':
      return 'text-field';
    case 'CHECKBOX':
      return 'checkbox';
    case 'RADIO':
      return 'radio-group';
    case 'FILE':
      return 'file-upload';
    case 'IMAGE':
      return 'image-upload';
    case 'CHECKBOX':
      return 'checkbox';
    default:
      return 'unknown';
  }
}

function getIconForControl(type: string): string {
  switch (type) {
    case 'SIGNATURE':
      return 'fa fa-signature';
    case 'SELECT':
      return 'fa fa-users';
    case 'INFORMATION':
      return 'fa fa-info-circle';
    case 'DATETIME':
      return 'fa fa-calendar';
    case 'TEXT':
      return 'fa fa-user';
    case 'CHECKBOX':
      return 'fa fa-check-square';
    default:
      return 'fa fa-question-circle';
  }
}

function getCategoryForControl(type: string): string {
  switch (type) {
    case 'SIGNATURE':
      return 'other-elements';
    case 'CHECKBOX':
      return 'other-elements';
    case 'INFORMATION':
      return 'other-elements';
    case 'SELECT':
      return 'dropdown-elements';
    case 'DATETIME':
      return 'date-elements';
    case 'TEXT':
      return 'text-elements';
    default:
      return 'unknown-elements';
  }
}

export default convertForm;
