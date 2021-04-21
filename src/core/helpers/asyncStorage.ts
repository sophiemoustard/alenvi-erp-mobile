import AsyncStorage from '@react-native-async-storage/async-storage';

const setAlenviToken = async (token: string, tokenExpireDate: string): Promise<void> => {
  await AsyncStorage.setItem('alenviToken', token);
  await AsyncStorage.setItem('alenviTokenExpireDate', tokenExpireDate);
};

const removeAlenviToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('alenviToken');
  await AsyncStorage.removeItem('alenviTokenExpireDate');
};

export default {
  setAlenviToken,
  removeAlenviToken,
};
