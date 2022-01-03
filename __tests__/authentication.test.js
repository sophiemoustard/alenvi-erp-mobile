import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import sinon from 'sinon';
import { render, cleanup, fireEvent, act, waitFor } from '@testing-library/react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import notLoggedAxios from '../src/api/axios/notLogged';
import loggedAxios from '../src/api/axios/logged';
import { Provider as AuthProvider } from '../src/context/AuthContext';
import AppContainer from '../src/AppContainer';
import Environment from '../environment';
import { INTERVENTION } from '../src/core/data/constants';
import CompaniDate from '../src/core/helpers/dates/companiDates';

describe('authentication', () => {
  const baseURL = 'test';
  let loggedAxiosMock;
  let notLoggedAxiosMock;
  let getEnvVars;
  let getBaseUrl;

  beforeEach(() => {
    loggedAxiosMock = new MockAdapter(loggedAxios);
    notLoggedAxiosMock = new MockAdapter(notLoggedAxios);
    getEnvVars = sinon.stub(Environment, 'getEnvVars');
    getBaseUrl = sinon.stub(Environment, 'getBaseUrl');
  });

  afterEach(() => {
    loggedAxiosMock.restore();
    notLoggedAxiosMock.restore();
    getEnvVars.restore();
    getBaseUrl.restore();
    cleanup();
    mockAsyncStorage.clear();
  });

  test('should connect user if right credentials', async () => {
    getEnvVars.returns({ baseURL: 'test' });
    getBaseUrl.returns('test');

    notLoggedAxiosMock.onGet(`${baseURL}/version/should-update`, { params: { mobileVersion: '1.0.0', appName: 'erp' } })
      .reply(200, { data: { mustUpdate: false } })
      .onPost(`${baseURL}/users/logout`)
      .reply(200)
      .onPost(`${baseURL}/users/authenticate`, { email: 'test@alenvi.io', password: '1234567' })
      .reply(
        200,
        {
          data: {
            token: 'token',
            tokenExpireDate: '1234567890',
            refreshToken: 'refreshToken',
            user: { _id: 'userId' },
          },
        }
      );

    const startDate = CompaniDate().startOf('day').toISO();
    const endDate = CompaniDate().endOf('day').toISO();
    const eventStartDate = CompaniDate().set({ hour: 10, minute: 0, second: 0, millisecond: 0 }).toISO();
    const eventEndDate = CompaniDate().set({ hour: 12, minute: 0, second: 0, millisecond: 0 }).toISO();

    loggedAxiosMock.onGet(`${baseURL}/users/userId`)
      .reply(200, { data: { user: { _id: 'userId' } } })
      .onGet(
        `${baseURL}/events`,
        { params: { auxiliary: 'userId', startDate, endDate, type: INTERVENTION, isCancelled: false } }
      )
      .reply(200, { data: { events: [{ _id: 'eventId', startDate: eventStartDate, endDate: eventEndDate }] } });

    const element = render(
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    );

    let emailInput;
    let sendButton;
    let passwordInput;

    await waitFor(() => {
      emailInput = element.getByTestId('Email');
      passwordInput = element.getByTestId('Mot de Passe');
      sendButton = element.getByTestId('Se connecter');
    });

    await act(async () => fireEvent.changeText(emailInput, 'test@alenvi.io'));
    await act(async () => fireEvent.changeText(passwordInput, '1234567'));
    await act(async () => fireEvent.press(sendButton));

    const page = await element.getByTestId('TimeStampingProfile');
    expect(page).toBeTruthy();
  });

  test('should not connect user if wrong credentials', async () => {
    getEnvVars.returns({ baseURL: 'test' });
    getBaseUrl.returns('test');

    notLoggedAxiosMock.onGet(`${baseURL}/version/should-update`, { params: { mobileVersion: '1.0.0', appName: 'erp' } })
      .reply(200, { data: { mustUpdate: false } })
      .onPost(`${baseURL}/users/logout`)
      .reply(200)
      .onPost(`${baseURL}/users/authenticate`, { email: 'test@alenvi.io', password: 'wrong' })
      .reply(401, { response: {} });

    const element = render(
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    );

    let emailInput;
    let sendButton;
    let passwordInput;

    await waitFor(() => {
      emailInput = element.getByTestId('Email');
      passwordInput = element.getByTestId('Mot de Passe');
      sendButton = element.getByTestId('Se connecter');
    });

    await act(async () => fireEvent.changeText(emailInput, 'test@alenvi.io'));
    await act(async () => fireEvent.changeText(passwordInput, 'wrong'));
    await act(async () => fireEvent.press(sendButton));

    const errorMessage = await element.getByTestId('L\'e-mail et/ou le mot de passe est incorrect');
    expect(errorMessage).toBeTruthy();
  });
});
