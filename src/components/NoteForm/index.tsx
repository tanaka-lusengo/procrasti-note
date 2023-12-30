'use client';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';

import { Button } from '@/components';
import * as StyledFormik from '@/components/ui/FormikUi';

import * as Styled from './index.styled';
import { initialValues as defaultInitialValues } from './initialValues';
import { Category, FormValues } from './types';
import { validationSchema } from './validationSchema';

interface NoteFormProps {
  initialValues?: FormValues;
  showForm: boolean;
  buttonLabel: string;
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => void | (Promise<any> & (() => void));
}

const NoteForm = ({
  initialValues = defaultInitialValues,
  onSubmit,
  showForm,
  buttonLabel,
}: NoteFormProps) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Styled.FormContainer>
        <Styled.FormContent className={showForm ? 'visible' : ''}>
          <Form>
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

            <Styled.ButtonsContainer>
              <Button type="submit">{buttonLabel}</Button>
              <Button onClick={router.back} type="button">
                Close
              </Button>
            </Styled.ButtonsContainer>
          </Form>
        </Styled.FormContent>
      </Styled.FormContainer>
    </Formik>
  );
};

export default NoteForm;
