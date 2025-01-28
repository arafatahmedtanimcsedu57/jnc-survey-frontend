import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FormBuilder from '../components/FormBuilder/FormBuilder';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setFormFile } from '../redux/file/formFile';
import {
  getSingleTemplate,
  setSelectedTemplateNull,
} from '../redux/entities/formBuilderEntity';

import useModalStrip from '../global-hooks/useModalStrip';

interface FormBuilderPageProps {}

const defaultForm = {
  id: '0',
  formId: 0,
  formName: '',
  createdAt: '',
  creator: '',
  formLayoutComponents: [],
  lastPublishedAt: '',
  publishHistory: [],
  publishStatus: 'draft',
  updatedAt: '',
  file: null,
};

const FormBuilderPage: React.FC<
  PropsWithChildren<FormBuilderPageProps>
> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const template = useAppSelector(
    (state) => state.entities.formBuilder.selectedTemplate
  );
  const file = useAppSelector((state) => state.file.file.file);

  const { formId } = useParams();
  const formIdSeg = formId ? formId.split('-') : [];
  const _status = formIdSeg.length ? formIdSeg[0] : null;
  const _formId = formIdSeg.length ? formIdSeg[1] : null;

  const { showModalStrip } = useModalStrip();

  useEffect(() => {
    if (_formId && _status)
      (async () => {
        try {
          const template = await dispatch(
            getSingleTemplate({
              formId: _formId as string,
              status: _status as string,
            })
          ).unwrap();

          const { file } = template || {};
          if (file) await dispatch(setFormFile(file));

          if (!template) throw new Error('Not found');
        } catch (ex) {
          showModalStrip('danger', 'The form id is not correct', 5000);
          // navigate('/');
        }
      })();

    return () => {
      dispatch(setSelectedTemplateNull());
    };
  }, []);

  return (
    <div className="container-fluid p-0 playground d-flex flex-column">
      {template ? (
        <FormBuilder
          template={template ? template : defaultForm}
          file={file}
          status={_status}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormBuilderPage;
