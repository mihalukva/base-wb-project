import React, { useRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'react-final-form';
import IMask from 'imask';
import { PHONE_LENGTH, PHONE_MASK } from 'constants/ui';

type Props = {
  name: string;
} & TextFieldProps;

export const PhoneNumberInput = ({ name, ...rest }: Props) => {
  const { current: mask } = useRef(IMask.createMask({ mask: PHONE_MASK }));

  const { input, meta } = useField(name, {
    defaultValue: mask.value,
    format: (value: string) => {
      mask.unmaskedValue = value;

      return mask.value;
    },
    parse: (value: string) => {
      mask.value = value;

      return mask.unmaskedValue;
    },
    validate: value => value.length < PHONE_LENGTH,
  });

  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      error={meta.error && meta.touched}
      label="Телефонный номер"
      margin="none"
      name={input.name}
      onBlur={input.onBlur}
      onChange={input.onChange}
      onFocus={input.onFocus}
      placeholder="+7 (000) 000-00-00"
      value={input.value}
    />
  );
};
