import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, waitFor, cleanup, fireEvent, act } from '@testing-library/react-native';
import { Provider as AuthProvider } from '../src/context/AuthContext';
import AppContainer from '../src/AppContainer';
import getEnvVars from '../environment';

jest.mock('expo-constants', () => ({ manifest: { version: '1.0.0' } }));
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('authentication', () => {
  const { baseURL } = getEnvVars();
  let axiosMock;

  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.restore();
    cleanup();
  });

  test('should connect user if right credentials', async () => {
    axiosMock.onGet(`${baseURL}/version/should-update`, { params: { mobileVersion: '1.0.0', appName: 'erp' } })
      .reply(200, { data: { mustUpdate: false } })
      .onPost(`${baseURL}/users/logout`)
      .reply(200)
      .onPost(`${baseURL}/users/authenticate`, { email: 'test@alenvi.io', password: '1234567' })
      .reply(200, { data: { token: 'token', tokenExpireDate: '1234567890', refreshToken: 'refreshToken' } });

    const element = render(
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    );

    const emailInput = await waitFor(() => element.queryByTestId('Email'));
    const passwordInput = await waitFor(() => element.queryByTestId('Mot de Passe'));
    const sendButton = await waitFor(() => element.queryByTestId('Se connecter'));

    await act(async () => fireEvent.changeText(emailInput, 'test@alenvi.io'));
    await act(async () => fireEvent.changeText(passwordInput, '1234567'));
    await act(async () => fireEvent.press(sendButton));

    await waitFor(() => element.queryByTestId('ProfilePage'));
  });

  test('should not connect user if wrong credentials', async () => {
    axiosMock.onGet(`${baseURL}/version/should-update`, { params: { mobileVersion: '1.0.0', appName: 'erp' } })
      .reply(200, { data: { mustUpdate: false } })
      .onPost(`${baseURL}/users/logout`)
      .reply(200)
      .onPost(`${baseURL}/users/authenticate`, { email: 'test@alenvi.io', password: '1234567' })
      .reply(401, { response: {} });

    const element = render(
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    );

    const emailInput = await waitFor(() => element.queryByTestId('Email'));
    const passwordInput = await waitFor(() => element.queryByTestId('Mot de Passe'));
    const sendButton = await waitFor(() => element.queryByTestId('Se connecter'));

    await act(async () => fireEvent.changeText(emailInput, 'test@alenvi.io'));
    await act(async () => fireEvent.changeText(passwordInput, '1234567'));
    await act(async () => fireEvent.press(sendButton));

    const errorMessage = await waitFor(() => element.queryByText('L\'e-mail et/ou le mot de passe est incorrect'));
    console.log(errorMessage);
    expect(errorMessage).toBeTruthy();
  });
});
