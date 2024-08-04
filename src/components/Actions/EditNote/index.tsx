'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type infer as ZodInfer } from 'zod';

import { PriorityValue } from '@/app/notes/components/types';
import { Button, Stack, Typography } from '@/components/Design';
import {
  FormModal,
  InputField,
  SelectField,
  TextareaField,
} from '@/components/FormComponents';
import { createAndEditNoteValidationSchema } from '@/schemas';
import { editNote } from '@/server/actions/note-actions';
import { type NoteModel } from '@/types';
import { handleError, StatusCode, toastNotifyError } from '@/utils';

type EditNoteForm = ZodInfer<typeof createAndEditNoteValidationSchema>;

const EditNote = ({ note }: { note: NoteModel }) => {
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
      const { status, error } = await editNote(id, complete, formData);

      if (status === StatusCode.BAD_REQUEST) {
        toastNotifyError(`${error}`);
      }

      if (status === StatusCode.SUCCESS) router.back();
    } catch (error) {
      handleError('editing note 😿', error);
    }
  };

  return (
    <FormModal
      action={async (formData: FormData) => await handleAction(formData)}
    >
      <Typography
        component="h4"
        marginTop="sm"
        marginBottom="md"
        textAlign="center"
      >
        Edit note
      </Typography>

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

      <Stack justifyContent="space-between" marginTop="md">
        <Button type="submit" disabled={isSubmitting} fontSize="body2">
          {isSubmitting ? 'Loading...' : 'Update'}
        </Button>
        <Button type="button" onClick={router.back} fontSize="body2">
          Close
        </Button>
      </Stack>
    </FormModal>
  );
};

export default EditNote;
