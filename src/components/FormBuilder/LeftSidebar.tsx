import React, { FunctionComponent, useState } from 'react';

import ControlDragComponent from './subcomponents/ControlDragComponent';
import {
  FormContainerList,
  FormControlList,
} from '../../utils/formBuilderUtils';
import { useAppDispatch } from '../../redux/hooks';
import { resetFormFile, saveFormFile } from '../../redux/file/formFile';
import {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
  FormLayoutComponentsType,
} from '../../types/FormTemplateTypes';
import { FileType } from '../../types/FileType';

interface LeftSidebarProps {
  handleItemAdded: (
    item: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
    containerId?: string
  ) => void;
  formLayoutComponents: FormLayoutComponentsType[];
  file: FileType | null;
}

const LeftSidebar: FunctionComponent<LeftSidebarProps> = ({
  handleItemAdded,
  formLayoutComponents,
  file,
}) => {
  const dispatch = useAppDispatch();

  const [currentFile, setCurrentFile] = useState<{ file: any }>({ file: '' });

  const handleChange = (event: any) => {
    setCurrentFile({ file: event.target.files[0] });
  };

  const handleUpload = () => {
    let data = new FormData();
    data.append('file', currentFile.file);
    dispatch(saveFormFile(data));
  };

  const removeFile = (file: FileType) => dispatch(resetFormFile(file));

  return (
    <>
      <h5 className="p-4 m-0 d-flex align-items-center ">Form Components</h5>
      <div className="">
        <div className="container pb-4 px-4 border-bottom">
          <div className="">
            {FormContainerList.map((container) => {
              return (
                <ControlDragComponent
                  key={container.controlName}
                  item={container}
                  handleItemAdded={handleItemAdded}
                  formLayoutComponents={formLayoutComponents}
                />
              );
            })}
          </div>
        </div>

        <div className="container p-4 bg-light border-bottom">
          <div className="row g-2">
            {FormControlList.map((control) => {
              return (
                <ControlDragComponent
                  key={control.controlName}
                  item={control}
                  handleItemAdded={handleItemAdded}
                  formLayoutComponents={formLayoutComponents}
                />
              );
            })}
          </div>
        </div>

        <div className="container p-4">
          {file && file.fileName ? (
            <div className="alert alert-info d-flex gap-2 flex-column">
              <div>
                <span className="text-info-emphasis me-4 fs-7">
                  {file.fileName.split('/').slice(-1)[0]}
                </span>
              </div>
              <div>
                <button
                  onClick={() => removeFile(file)}
                  className="btn btn-sm btn-outline-danger px-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                className="form-control btn border mb-3"
                type="file"
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-sm btn-primary fw-medium px-4"
                onClick={() => handleUpload()}
              >
                Upload
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
