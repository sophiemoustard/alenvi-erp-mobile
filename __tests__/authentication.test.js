import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, waitFor, cleanup } from '@testing-library/react-native';
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

  test('should display authentication page', async () => {
    axiosMock.onGet(`${baseURL}/version/should-update`, { params: { mobileVersion: '1.0.0', appName: 'erp' } })
      .reply(200, { data: { mustUpdate: false } })
      .onPost(`${baseURL}/users/logout`)
      .reply(200);

    const element = render(
      <AuthProvider>
        <AppContainer />
      </AuthProvider>
    );

    await waitFor(() => element.getByTestId('authentication'));
  });
});
