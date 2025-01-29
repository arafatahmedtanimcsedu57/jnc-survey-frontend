import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { deleteTemplate } from '../../redux/entities/formBuilderEntity';

import { TemplateType } from '../../types/FormTemplateTypes';

import Trash from '../../assets/svg/Trash';
import Edit from '../../assets/svg/Edit';
import Eye from '../../assets/svg/Eye';

interface FormLayoutComponentProps {
  template: TemplateType | null;
  createdFormLayout: boolean;
  setOpenDialog?: (arg: boolean) => void;
}

const ActionSection: React.FC<PropsWithChildren<FormLayoutComponentProps>> = ({
  createdFormLayout,
  template,
  setOpenDialog,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      {createdFormLayout ? (
        (template as TemplateType).publishStatus === 'draft' ? (
          <div className="d-flex flex-row-reverse flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-sm btn-warning px-2 fw-medium"
              onClick={() =>
                navigate(
                  `/formbuilder/${(template as TemplateType).publishStatus}-${
                    (template as TemplateType).formId
                  }`
                )
              }
            >
              <Edit width="16" height="16" />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger px-2 fw-medium"
              onClick={() => {
                if (confirm('Are you sure you want to delete the template?'))
                  dispatch(deleteTemplate(template?.id as string));
              }}
            >
              <Trash width="16" height="16" />
            </button>
          </div>
        ) : (
          <>
            <div className="w-100 d-flex justify-content-end flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-sm btn-info px-2 fw-medium"
                onClick={() =>
                  navigate(
                    `/formbuilder/${(template as TemplateType).publishStatus}-${
                      (template as TemplateType).formId
                    }`
                  )
                }
              >
                <Eye width="16" height="16" />
              </button>
            </div>
          </>
        )
      ) : (
        <div>
          <button
            type="button"
            onClick={() => {
              return setOpenDialog ? setOpenDialog(true) : null;
            }}
            className="btn btn-primary shadow px-5 fw-medium mb-3"
          >
            Let's Create
          </button>
        </div>
      )}
    </>
  );
};

const FormLayoutComponent: React.FC<
  PropsWithChildren<FormLayoutComponentProps>
> = ({ template, createdFormLayout, setOpenDialog }) => {
  const title = createdFormLayout
    ? (template as TemplateType).formName
    : 'Create a New Form';
  const creator = createdFormLayout ? (template as TemplateType).creator : '';
  const lastOpened = createdFormLayout
    ? (template as TemplateType).updatedAt
    : '';

  const description = createdFormLayout
    ? ''
    : 'Begin from scratch. Click the button below to start designing a form tailored to your specific needs.';

  const cardStyle = { width: template ? '250px' : '100%' };
  const className = `card  ${
    template ? 'bg-white' : 'bg-transparent text-center border-0  '
  }`;

  return (
    <>
      <div
        className={className}
        style={{
          ...cardStyle,
        }}
      >
        <div className="card-body d-flex flex-column justify-content-between p-4">
          <div className="d-flex gap-2 justify-content-between align-items-center flex-wrap">
            <div
              className={
                template ? 'd-flex gap-2 align-items-center' : `w-100 `
              }
            >
              <h5 className="card-title text-dark-emphasis">{title}</h5>
            </div>
          </div>
          {description ? (
            <p className="card-text text-dark-emphasis">{description}</p>
          ) : (
            <></>
          )}
          <ActionSection
            template={template}
            setOpenDialog={setOpenDialog}
            createdFormLayout={createdFormLayout}
          />
        </div>
      </div>
    </>
  );
};

export default FormLayoutComponent;
