import { FieldAttributes } from 'formik';

import { FormikContainer, FormikErrorText } from '../common.styled';

import * as Styled from './index.styled';

interface SelectFieldProps extends FieldAttributes<any> {
  label: string;
  name: string;
  selectProps?: React.InputHTMLAttributes<HTMLSelectElement>;
}

const SelectField = ({
  label,
  name,
  field,
  form: { touched, errors },
  ...selectProps
}: SelectFieldProps) => {
  return (
    <FormikContainer>
      <label htmlFor={name}>{label}</label>
      <Styled.CustomFormikField
        type="select"
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

export default SelectField;
