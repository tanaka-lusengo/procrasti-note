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

type SelectFieldProps<TFormValues extends FieldValues> = {
  label: string;
  name: string;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = <TFormValues extends FieldValues>({
  label,
  name,
  defaultValue,
  errors,
  register,
  children,
}: SelectFieldProps<TFormValues>) => {
  return (
    <Styled.InputContainer>
      <Styled.Label htmlFor={name}>{label}</Styled.Label>
      <Styled.SelectField
        defaultValue={defaultValue}
        {...register(name as Path<TFormValues>, {
          required: `${label} is required`,
        })}
      >
        {children}
      </Styled.SelectField>

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

export default SelectField;
