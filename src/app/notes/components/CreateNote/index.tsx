'use client';

import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import { Button } from '@/components';
import * as StyledFormik from '@/components/ui/FormikUi';
import { pb } from '@/lib';

import * as Styled from './index.styled';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';

export enum Category {
  Productivity = 'productivity',
  Personal = 'personal',
}

export interface FormValues {
  title: string;
  category: string;
  content: string;
}

const handleCreateNote = async (values: FormValues = initialValues) => {
  try {
    const { title, category, content } = values;

    const newNoteData = {
      title,
      category,
      content,
    };

    await pb.collection('notes').create(newNoteData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating note 😿', error.message, error.cause);
    } else {
      console.error('Unknown error creating note 😿', error);
    }
  }
};

const CreateNote = ({ showForm }: any) => {
  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, formik) => {
        handleCreateNote(values);
        formik.resetForm();
        router.refresh();
        router.back();
      }}
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
              <Button type="submit">Add Note</Button>
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

export default CreateNote;
