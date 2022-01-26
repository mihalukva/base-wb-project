import { Button, Typography } from '@mui/material';
import { ConfirmationCodeInput, TimerButton } from 'components';
import React, { useCallback, useMemo } from 'react';
import { Form, FormProps, FormSpy } from 'react-final-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useActions } from 'hooks/use-actions';
import { useSelector } from 'react-redux';
import IMask from 'imask';
import { PHONE_MASK } from 'constants/ui';
import { useLoadingProvider, LoadersDict } from 'components/loading-provider';
import styles from './index.module.scss';
import {
  userActions,
  ConfirmationCodeForm as ConfirmationCodeFormType,
  userPhoneSelector,
  timeoutSelector,
} from '../../redux';

export const ConfirmationCodeForm = () => {
  const isLoading = useLoadingProvider(LoadersDict.SIGN_IN);
  const userPhone = useSelector(userPhoneSelector);
  const timeout = useSelector(timeoutSelector);

  const { handleLogin, handleResetLogin, getCode } = useActions({
    handleLogin: userActions.sigInActionSaga,
    handleResetLogin: userActions.resetLoginData,
    getCode: userActions.getConfirmationCodeActionSaga,
  });

  const handleGetCode = useCallback(() => {
    getCode({ phone: userPhone });
  }, [getCode, userPhone]);

  const maskedValue = useMemo(() => {
    const mask = IMask.createMask({ mask: PHONE_MASK });
    mask.unmaskedValue = userPhone;

    return mask.value;
  }, [userPhone]);

  return (
    <Form<ConfirmationCodeFormType> onSubmit={handleLogin}>
      {(props: FormProps) => (
        <form className={styles.root} onSubmit={props.handleSubmit}>
          <div className={styles.wrapper}>
            <Button onClick={handleResetLogin} startIcon={<ArrowBackIcon />} variant="text">
              Назад
            </Button>
          </div>
          <Typography variant="body1">Код подтверждения был отправлен на номер:</Typography>
          <Typography gutterBottom variant="body1">
            {maskedValue}
          </Typography>
          <div className={styles.controls}>
            <div className={styles.wrapper}>
              <ConfirmationCodeInput disabled={isLoading} name="code" />
            </div>
            <TimerButton disabled={isLoading} onClick={handleGetCode} timeout={timeout}>
              Получить заново
            </TimerButton>
          </div>
          <FormSpy
            onChange={(p: any) => {
              if (p.visited.code && !p.hasValidationErrors) {
                props.form?.submit();
              }
            }}
            subscription={{
              hasValidationErrors: true,
              visited: true,
            }}
          />
        </form>
      )}
    </Form>
  );
};
