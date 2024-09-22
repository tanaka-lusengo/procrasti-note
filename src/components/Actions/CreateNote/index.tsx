'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type infer as ZodInfer } from 'zod';

import { PriorityValue } from '@/app/notes/components/types';
import { Button, ButtonLink, Stack, Typography } from '@/components/Design';
import {
  FormModal,
  InputField,
  SelectField,
  TextareaField,
} from '@/components/FormComponents';
import { createAndEditNoteValidationSchema } from '@/schemas';
import { createNote } from '@/server/actions/note-actions';
import { handleError, StatusCode, toastNotifyError } from '@/utils';

type CreateNoteForm = ZodInfer<typeof createAndEditNoteValidationSchema>;

const CreateNote = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateNoteForm>({
    resolver: zodResolver(createAndEditNoteValidationSchema),
    mode: 'all',
  });

  const handleAction = async (formData: FormData) => {
    try {
      const { status, error } = await createNote(formData);

      if (status === StatusCode.BAD_REQUEST) {
        toastNotifyError(`${error}`);
      }

      if (status === StatusCode.SUCCESS) router.back();
    } catch (error) {
      handleError('creating a note 😿', error);
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
        Create a new note
      </Typography>

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
        <option value="">Select Priority Level?</option>
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

      <Stack justifyContent="space-between" marginTop="md">
        <Button
          type="submit"
          fontSize="body2"
          disabled={!isValid || isSubmitting}
        >
          Create
        </Button>
        <ButtonLink href="/notes" fontSize="body2">
          Close
        </ButtonLink>
      </Stack>
    </FormModal>
  );
};

export default CreateNote;
