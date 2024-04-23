'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type infer as ZodInfer } from 'zod';

import { createNote } from '@/actions/note-actions';
import { Button } from '@/components';
import {
  FormModal,
  InputField,
  SelectField,
  TextareaField,
} from '@/components/FormComponents';
import { createAndEditNoteValidationSchema } from '@/schemas';
import { ButtonsContainer, Title } from '@/styles/common.styled';
import { handleError, StatusCode } from '@/utils';

import { PriorityValue } from '../../types';

type CreateNoteForm = ZodInfer<typeof createAndEditNoteValidationSchema>;

const CreateNote = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteForm>({
    resolver: zodResolver(createAndEditNoteValidationSchema),
    mode: 'all',
  });

  const handleAction = async (formData: FormData) => {
    try {
      const { status } = await createNote(formData);
      if (status === StatusCode.SUCCESS) router.back();
    } catch (error) {
      handleError('creating note 😿', error);
    }
  };

  return (
    <FormModal
      action={async (formData: FormData) => await handleAction(formData)}
    >
      <Title>Create a new note</Title>

      <InputField
        label="Title"
        name="title"
        placeholder="Note Title"
        register={register}
        errors={errors}
      />

      <SelectField
        label="Priority"
        name="priority"
        register={register}
        errors={errors}
      >
        <option value="">Priority Level 👇🏾</option>
        <hr />
        <option value={PriorityValue.ONE}>1</option>
        <option value={PriorityValue.TWO}>2</option>
        <option value={PriorityValue.THREE}>3</option>
        <option value={PriorityValue.FOUR}>4</option>
        <option value={PriorityValue.FIVE}>5</option>
      </SelectField>

      <TextareaField
        label="Content"
        name="content"
        placeholder="So what's the plan ?"
        register={register}
        errors={errors}
      />

      <ButtonsContainer>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Add Note'}
        </Button>
        <Button onClick={router.back}>Close</Button>
      </ButtonsContainer>
    </FormModal>
  );
};

export default CreateNote;
