import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import { hasTokenSelector } from './redux';
import { PhoneForm } from './components/phone-form';
import { Title } from './components/title';
import { ConfirmationCodeForm } from './components/confirmation-code-form';

export const LoginPage = () => {
  const hasToken = useSelector(hasTokenSelector);

  return (
    <div className={styles.root}>
      <div className={styles.leftSide}>
        <Title />
        <div className={styles.controls}>{hasToken ? <ConfirmationCodeForm /> : <PhoneForm />}</div>
      </div>
      <div className={styles.rightSide} />
    </div>
  );
};
