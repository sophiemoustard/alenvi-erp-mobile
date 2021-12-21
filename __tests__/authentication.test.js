import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import sinon from 'sinon';
import { render, cleanup, fireEvent, act } from '@testing-library/react-native';
import notLoggedAxios from '../src/api/axios/notLogged';
import loggedAxios from '../src/api/axios/logged';
import { Provider as AuthProvider } from '../src/context/AuthContext';
import AppContainer from '../src/AppContainer';
import Environment from '../environment';
import { INTERVENTION } from '../src/core/data/constants';

describe('authentication', () => {
  const baseURL = 'test';
  let loggedAxiosMock;
  let notLoggedAxiosMock;
  let getEnvVarsStub;
  let getBaseUrlStub;

  beforeEach(() => {
    loggedAxiosMock = new MockAdapter(loggedAxios);
    notLoggedAxiosMock = new MockAdapter(notLoggedAxios);
    getEnvVarsStub = sinon.stub(Environment, 'getEnvVars');
    getBaseUrlStub = sinon.stub(Environment, 'getBaseUrl');
  });

  afterEach(() => {
    loggedAxiosMock.restore();
    notLoggedAxiosMock.restore();
    getEnvVarsStub.restore();
    getBaseUrlStub.restore();
    cleanup();
  });

  test('should connect user if right credentials', async () => {
    getEnvVarsStub.returns({ baseURL: 'test' });
    getBaseUrlStub.returns('test');

    notLoggedAxiosMock.onGet(`${baseURL}/version/should-update`, { params: { mobileVersion: '1.0.0', appName: 'erp' } })
      .reply(200, { data: { mustUpdate: false } })
      .onPost(`${baseURL}/users/logout`)
      .reply(200)
      .onPost(`${baseURL}/users/authenticate`, { email: 'test@alenvi.io', password: '1234567' })
      .reply(
        200,
        { data: { token: 'token', tokenExpireDate: '1234567890', refreshToken: 'refreshToken', userId: 'userId' } }
      );

    const currentDate = new Date();
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    loggedAxiosMock.onGet(`${baseURL}/users/usersId`, { params: { mobileVersion: '1.0.0', appName: 'erp' } })
      .reply(200, { data: { _id: 'userId' } })
      .onGet(
        `${baseURL}/events`,
        { params: { auxiliary: 'userId', startDate: date, endDate: date, type: INTERVENTION } }
      )
      .reply(200, { data: [] });

    const element = render(
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    );

    const emailInput = await element.findByTestId('Email');
    const passwordInput = await element.findByTestId('Mot de Passe');
    const sendButton = await element.findByTestId('Se connecter');

    const changeEmail = async () => fireEvent.changeText(emailInput, 'test@alenvi.io');
    const changePassword = async () => fireEvent.changeText(passwordInput, '1234567');
    const press = async () => fireEvent.press(sendButton);

    act(() => changeEmail())
      .then(() => act(() => changePassword())
        .then(() => act(() => press())
          .then(async () => {
            const page = await element.findByText('Horodatage');
            expect(page).toBeInTheDocument();
          })));
  });

  test('should not connect user if wrong credentials', async () => {
    getEnvVarsStub.returns({ baseURL: 'test' });
    getBaseUrlStub.returns('test');

    notLoggedAxiosMock.onGet(`${baseURL}/version/should-update`, { params: { mobileVersion: '1.0.0', appName: 'erp' } })
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

    const emailInput = await element.findByTestId('Email');
    const passwordInput = await element.findByTestId('Mot de Passe');
    const sendButton = await element.findByTestId('Se connecter');

    await act(async () => fireEvent.changeText(emailInput, 'test@alenvi.io'));
    await act(async () => fireEvent.changeText(passwordInput, '1234567'));
    await act(async () => fireEvent.press(sendButton));

    const errorMessage = await element.findByText('L\'e-mail et/ou le mot de passe est incorrect');
    expect(errorMessage).toBeTruthy();
  });
});
