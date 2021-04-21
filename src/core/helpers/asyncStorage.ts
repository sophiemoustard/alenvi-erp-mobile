import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default {
  setAlenviToken,
  removeAlenviToken,
  getAlenviToken,
};
