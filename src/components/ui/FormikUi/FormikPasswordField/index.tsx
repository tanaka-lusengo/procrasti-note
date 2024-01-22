import { FieldAttributes } from 'formik';

import { FormikContainer, FormikErrorText } from '../common.styled';
import * as Styled from '../common.styled';

type PasswordFieldProps = {
  label: string;
  name: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & FieldAttributes<any>;

const PasswordField = ({
  label,
  name,
  field,
  form: { touched, errors },
  ...inputProps
}: PasswordFieldProps) => {
  return (
    <FormikContainer>
      <label htmlFor={name}>{label}</label>
      <Styled.CustomFormikInputField
        type="password"
        name={name}
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

export default PasswordField;
