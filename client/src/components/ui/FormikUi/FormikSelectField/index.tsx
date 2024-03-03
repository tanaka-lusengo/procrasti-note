import { FieldAttributes } from 'formik';

import { FormikContainer, FormikErrorText } from '../common.styled';

import * as Styled from './index.styled';

type SelectFieldProps = {
  label: string;
  name: string;
  selectProps?: React.InputHTMLAttributes<HTMLSelectElement>;
} & FieldAttributes<any>;

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
      <Styled.CustomFormikSelectField
        type="select"
        name={name}
        {...field}
        {...selectProps}
      >
        {selectProps.children}
      </Styled.CustomFormikSelectField>

      {touched[field.name] && errors[field.name] && (
        <FormikErrorText>{errors[field.name]}</FormikErrorText>
      )}
    </FormikContainer>
  );
};

export default SelectField;
