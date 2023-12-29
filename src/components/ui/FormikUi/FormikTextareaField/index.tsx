import { FieldAttributes } from 'formik';

import { FormikContainer, FormikErrorText } from '../common.styled';

import * as Styled from './index.styled';

interface TeaxtareaFieldProps extends FieldAttributes<any> {
  label: string;
  name: string;
  selectProps?: React.InputHTMLAttributes<HTMLSelectElement>;
}

const TeaxtareaField = ({
  label,
  name,
  field,
  form: { touched, errors },
  ...selectProps
}: TeaxtareaFieldProps) => {
  return (
    <FormikContainer>
      <label htmlFor={name}>{label}</label>
      <Styled.CustomFormikField
        type="textarea"
        name={name}
        {...field}
        {...selectProps}
      >
        {selectProps.children}
      </Styled.CustomFormikField>

      {touched[field.name] && errors[field.name] && (
        <FormikErrorText>{errors[field.name]}</FormikErrorText>
      )}
    </FormikContainer>
  );
};

export default TeaxtareaField;
