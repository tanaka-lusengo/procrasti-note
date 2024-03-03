'use client';

import { Form, Formik, FormikConfig } from 'formik';

import * as Styled from './index.styled';

type NoteFormProps<TFormValues extends object> = {
  initialValues: TFormValues;
  showForm?: boolean;
  children: React.ReactNode;
} & Pick<FormikConfig<TFormValues>, 'onSubmit' | 'validationSchema'>;

const NoteForm = <TFormValues extends object>({
  initialValues,
  validationSchema,
  onSubmit,
  showForm,
  children,
}: NoteFormProps<TFormValues>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Styled.FormContainer>
        <Styled.FormContent className={showForm ? 'visible' : ''}>
          <Form>{children}</Form>
        </Styled.FormContent>
      </Styled.FormContainer>
    </Formik>
  );
};

export default NoteForm;
