import React, { PropsWithChildren } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { json, useNavigate } from 'react-router-dom';
import ConfirmationBeforePublish from './subcomponents/ConfirmationBeforePublish';

import { useAppDispatch } from '../../redux/hooks';
import { publishTemplate } from '../../redux/entities/formBuilderEntity';

import { convert } from '../../utils/convert';

import {
  FormLayoutComponentsType,
  TemplateType,
} from '../../types/FormTemplateTypes';
import type { FileType } from '../../types/FileType';
import { modifiedJsonData } from './helpers';

interface SaveConfirmationDialogComponentProps {
  openDialog: boolean;
  setOpenDialog: (arg: boolean) => void;
  formLayoutComponents: FormLayoutComponentsType[];
  template: TemplateType;
  file: FileType | null;
}

const SaveConfirmation: React.FC<
  PropsWithChildren<SaveConfirmationDialogComponentProps>
> = ({ openDialog, setOpenDialog, formLayoutComponents, template, file }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const jsonData = {
    formId: template?.formId,
    formName: template?.formName,
    pdf: file,
    blocks: [...convert(formLayoutComponents).blocks],
  };

  const handleFormSubmit = async () => {
    const modifiedData = modifiedJsonData(jsonData);

    await dispatch(
      publishTemplate({ data: modifiedData, formId: jsonData.formId })
    );

    setOpenDialog(false);
    navigate('/');
  };

  return (
    <>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="lg"
        onClose={() => setOpenDialog(false)}
      >
        <DialogContent className="modal-content">
          <ConfirmationBeforePublish jsonData={jsonData} />
          <div>
            <p>Want to publish it ?</p>
            <button
              type="submit"
              className="btn btn-sm btn-primary px-4 fw-medium"
              onClick={() => handleFormSubmit()}
            >
              Publish
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SaveConfirmation;
