import { Field } from 'formik';

import { PriorityValue } from '@/app/notes/components/CreateAndEditFormFields/types';
import * as StyledFormik from '@/components/FormikUi';

const CreateAndEditFormFields = () => (
  <>
    <Field
      label="Title"
      name="title"
      placeholder="Note Title"
      component={StyledFormik.TextField}
    />

    <Field
      label="Priority"
      name="priority"
      component={StyledFormik.SelectField}
    >
      <option value="">Priority Level 👇🏾</option>
      <hr />
      <option value={PriorityValue.ONE}>1</option>
      <option value={PriorityValue.TWO}>2</option>
      <option value={PriorityValue.THREE}>3</option>
      <option value={PriorityValue.FOUR}>4</option>
      <option value={PriorityValue.FIVE}>5</option>
    </Field>

    <Field
      label="Note content"
      name="content"
      placeholder="So what's the plan ?"
      component={StyledFormik.TextareaField}
    />
  </>
);

export default CreateAndEditFormFields;
