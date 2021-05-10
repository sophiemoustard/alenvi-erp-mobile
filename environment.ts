/* eslint-disable import/extensions */
import Constants from 'expo-constants';
// @ts-ignore
import localEnv from './env/env.local';
// @ts-ignore
import devEnv from './env/env.dev';
// @ts-ignore
import prodEnv from './env/env.prod';

const getEnvVars = (): { baseURL: string, sentryKey: string } => {
  const env = Constants.manifest.releaseChannel || '';
  if (__DEV__) return localEnv;
  if (/dev/.test(env)) return devEnv;
  if (/prod/.test(env)) return prodEnv;
  return localEnv;
};

export default getEnvVars;
