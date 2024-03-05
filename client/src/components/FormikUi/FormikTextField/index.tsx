'use client';

import { FieldAttributes } from 'formik';

import { FormikContainer, FormikErrorText } from '../common.styled';
import * as Styled from '../common.styled';

type TextFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & FieldAttributes<any>;

const TextField = ({
  label,
  name,
  placeholder,
  field,
  form: { touched, errors },
  ...inputProps
}: TextFieldProps) => {
  return (
    <FormikContainer>
      <label htmlFor={name}>{label}</label>
      <Styled.CustomFormikInputField
        type="text"
        name={name}
        placeholder={placeholder}
        value={field.value}
        {...field}
        {...inputProps}
      />

      {touched[field.name] && errors[field.name] && (
        <FormikErrorText>{errors[field.name]}</FormikErrorText>
      )}
    </FormikContainer>
  );
};

export default TextField;
