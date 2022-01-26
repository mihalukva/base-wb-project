import { Button, CircularProgress } from '@mui/material';
import { PhoneNumberInput } from 'components';
import React from 'react';
import { Form, FormProps } from 'react-final-form';
import { useActions } from 'hooks/use-actions';
import { LoadersDict, useLoadingProvider } from 'components/loading-provider';
import styles from './index.module.scss';
import { userActions, PhoneForm as PhoneFormType } from '../../redux';

export const PhoneForm = () => {
  const isLoading = useLoadingProvider(LoadersDict.GET_CONFIRMATION_CODE);
  const { handleGetCode } = useActions({ handleGetCode: userActions.getConfirmationCodeActionSaga });

  return (
    <Form<PhoneFormType> onSubmit={handleGetCode}>
      {(props: FormProps) => (
        <form className={styles.root} onSubmit={props.handleSubmit}>
          <div className={styles.wrapper}>
            <PhoneNumberInput disabled={isLoading} name="phone" />
          </div>
          <Button
            disabled={!props.valid || isLoading}
            startIcon={isLoading && <CircularProgress color="inherit" size={20} />}
            type="submit"
            variant="contained"
          >
            Получить код
          </Button>
        </form>
      )}
    </Form>
  );
};
