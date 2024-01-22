import { Field } from 'formik';

import { Category } from '@/app/notes/components/CreateAndEditFormFields/types';
import * as StyledFormik from '@/components/ui/FormikUi';

const CreateAndEditFormFields = () => (
  <>
    <Field
      label="Title"
      name="title"
      placeholder="Note Title"
      component={StyledFormik.TextField}
    />

    <Field
      label="Category"
      name="category"
      component={StyledFormik.SelectField}
    >
      <option value="">Choose an option...👇🏾</option>
      <hr />
      <option value={Category.Productivity}>Productivity</option>
      <option value={Category.Personal}>Personal</option>
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
