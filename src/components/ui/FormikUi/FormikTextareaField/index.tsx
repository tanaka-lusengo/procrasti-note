import { FieldAttributes } from 'formik';

import { FormikContainer, FormikErrorText } from '../common.styled';

import * as Styled from './index.styled';

type TeaxtareaFieldProps = {
  label: string;
  name: string;
  children: React.ReactNode;
} & FieldAttributes<any>;

const TeaxtareaField = ({
  label,
  name,
  field,
  form: { touched, errors },
  children,
}: TeaxtareaFieldProps) => {
  return (
    <FormikContainer>
      <label htmlFor={name}>{label}</label>
      <Styled.CustomFormikTextareaField type="textarea" name={name} {...field}>
        {children}
      </Styled.CustomFormikTextareaField>

      {touched[field.name] && errors[field.name] && (
        <FormikErrorText>{errors[field.name]}</FormikErrorText>
      )}
    </FormikContainer>
  );
};

export default TeaxtareaField;
