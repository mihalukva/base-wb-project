import React from 'react';
import { Reducer } from 'redux';
import { Saga } from 'redux-saga';
import { InjectedComponent } from './components';

type Props = {
  reducers?: Record<string, Reducer>;
  sagas?: Record<string, Saga>;
};
/* eslint-disable react/jsx-props-no-spreading */
export const withInject = ({ reducers = {}, sagas = {} }: Props) => {
  return (BaseComponent: any) => (props: any) => (
    <InjectedComponent reducers={reducers} sagas={sagas}>
      <BaseComponent {...props} />
    </InjectedComponent>
  );
};
/* eslint-enable react/jsx-props-no-spreading */
