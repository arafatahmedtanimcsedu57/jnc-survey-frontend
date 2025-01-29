import { Form, FormRequestType } from '../../types/ResponseFormTypes';

export function modifiedJsonData(
  jsonData: Partial<Form>
): Partial<FormRequestType> {
  const updatedData = {
    name: jsonData.formName,
    description: jsonData.formName,
    questions: jsonData?.blocks,
  };
  return updatedData;
}
