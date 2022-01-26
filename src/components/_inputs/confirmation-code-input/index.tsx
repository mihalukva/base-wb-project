import React, { useRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'react-final-form';
import IMask from 'imask';
import { CONFIRMATION_CODE_MASK } from 'constants/ui';
import { codeLengthSelector } from 'pages/login/redux';
import { useSelector } from 'react-redux';

type Props = {
  name: string;
} & TextFieldProps;

export const ConfirmationCodeInput = ({ name, ...rest }: Props) => {
  const codeLength = useSelector(codeLengthSelector);
  const { current: mask } = useRef(IMask.createMask({ mask: CONFIRMATION_CODE_MASK }));

  const { input, meta } = useField(name, {
    initialValue: '',
    format: (value: string) => {
      if (value === undefined) {
        return '';
      }
      mask.unmaskedValue = value;

      return mask.value;
    },
    parse: (value: string) => {
      if (value === undefined) {
        return '';
      }
      mask.value = value;

      return mask.unmaskedValue;
    },
    validate: (value: string) => {
      if (!value) {
        return true;
      }
      if (value.length < codeLength) {
        return true;
      }

      return undefined;
    },
  });

  return (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      error={meta.error && meta.touched}
      label="Код подтверждения"
      margin="none"
      name={input.name}
      onBlur={input.onBlur}
      onChange={input.onChange}
      onFocus={input.onFocus}
      placeholder={CONFIRMATION_CODE_MASK}
      value={input.value}
    />
  );
};
