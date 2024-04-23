'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type infer as ZodInfer } from 'zod';

import { editNote } from '@/actions/note-actions';
import { Button } from '@/components';
import {
  FormModal,
  InputField,
  SelectField,
  TextareaField,
} from '@/components/FormComponents';
import { type Note } from '@/lib/openapi/generated';
import { createAndEditNoteValidationSchema } from '@/schemas';
import { ButtonsContainer, Title } from '@/styles/common.styled';
import { handleError, StatusCode } from '@/utils';

import { PriorityValue } from '../../types';

type EditNoteForm = ZodInfer<typeof createAndEditNoteValidationSchema>;

const EditNote = ({ note }: { note: Note }) => {
  const { id, title, priority, content, complete } = note || {};

  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<EditNoteForm>({
    resolver: zodResolver(createAndEditNoteValidationSchema),
    mode: 'all',
  });

  const handleAction = async (formData: FormData) => {
    try {
      const { status } = await editNote(id, complete, formData);
      if (status === StatusCode.SUCCESS) router.back();
    } catch (error) {
      handleError('editing note 😿', error);
    }
  };

  return (
    <FormModal
      action={async (formData: FormData) => await handleAction(formData)}
    >
      <Title>Edit note</Title>

      <InputField
        label="Title"
        name="title"
        placeholder="Note Title"
        defaultValue={title}
        register={register}
        errors={errors}
      />

      <SelectField
        label="Priority"
        name="priority"
        defaultValue={priority}
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
        defaultValue={content}
        register={register}
        errors={errors}
      />

      <ButtonsContainer>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Edit Note'}
        </Button>
        <Button onClick={router.back}>Close</Button>
      </ButtonsContainer>
    </FormModal>
  );
};

export default EditNote;
