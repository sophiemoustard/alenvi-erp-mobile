import AsyncStorage from '@react-native-async-storage/async-storage';
import DatesHelper from '../helpers/dates';
import { ONE_YEAR_IN_MILLISECONDS } from '../data/constants';

const isTokenValid = (token: string | null, tokenExpireDate: string | null): boolean =>
  !!token && !!tokenExpireDate && DatesHelper.isBefore(new Date(), tokenExpireDate);

interface AlenviToken {
  alenviToken: string | null,
  alenviTokenExpireDate: string | null,
}

const setAlenviToken = async (token: string, tokenExpireDate: string): Promise<void> => {
  await AsyncStorage.setItem('alenviToken', token);
  await AsyncStorage.setItem('alenviTokenExpireDate', tokenExpireDate);
};

const getAlenviToken = async (): Promise<AlenviToken> => ({
  alenviToken: await AsyncStorage.getItem('alenviToken'),
  alenviTokenExpireDate: await AsyncStorage.getItem('alenviTokenExpireDate'),
});

const removeAlenviToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('alenviToken');
  await AsyncStorage.removeItem('alenviTokenExpireDate');
};

interface RefreshToken {
  refreshToken: string | null,
  refreshTokenExpireDate: string | null,
}

const setRefreshToken = async (token: string): Promise<void> => {
  const refreshTokenExpireDate = new Date(Date.now() + ONE_YEAR_IN_MILLISECONDS);
  await AsyncStorage.setItem('refreshToken', token);
  await AsyncStorage.setItem('refreshTokenExpireDate', refreshTokenExpireDate.toString());
};

const getRefreshToken = async (): Promise<RefreshToken> => ({
  refreshToken: await AsyncStorage.getItem('refreshToken'),
  refreshTokenExpireDate: await AsyncStorage.getItem('refreshTokenExpireDate'),
});

export default {
  isTokenValid,
  setAlenviToken,
  getAlenviToken,
  removeAlenviToken,
  setRefreshToken,
  getRefreshToken,
};
