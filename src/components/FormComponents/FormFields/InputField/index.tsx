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

type InputFieldProps<TFormValues extends FieldValues> = {
  label: string;
  name: string;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = <TFormValues extends FieldValues>({
  label,
  name,
  type = 'text',
  placeholder,
  defaultValue,
  errors,
  register,
}: InputFieldProps<TFormValues>) => {
  return (
    <Styled.InputContainer>
      <Styled.Label htmlFor={name}>{label}</Styled.Label>
      <Styled.InputField
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name as Path<TFormValues>, {
          required: `${label} is required`,
        })}
      />

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

export default InputField;
