'use client';

import {
  FieldErrors,
  FieldName,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from '@hookform/error-message';

import * as Styled from '../common.styled';

type TeaxtareaFieldProps<TFormValues extends FieldValues> = {
  label: string;
  name: string;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TeaxtareaField = <TFormValues extends FieldValues>({
  label,
  name,
  placeholder,
  defaultValue,
  errors,
  register,
  children,
}: TeaxtareaFieldProps<TFormValues>) => {
  return (
    <Styled.InputContainer>
      <Styled.Label htmlFor={name}>{label}</Styled.Label>
      <Styled.TextareaField
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name as Path<TFormValues>, {
          required: `${label} is required`,
        })}
      >
        {children}
      </Styled.TextareaField>

      <ErrorMessage
        errors={errors}
        name={
          name as FieldName<
            FieldValuesFromFieldErrors<FieldErrors<TFormValues>>
          >
        }
        render={({ message }) => (
          <Styled.ErrorText role="alert">{message}</Styled.ErrorText>
        )}
      />
    </Styled.InputContainer>
  );
};

export default TeaxtareaField;
