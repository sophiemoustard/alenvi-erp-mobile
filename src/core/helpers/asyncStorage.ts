import AsyncStorage from '@react-native-async-storage/async-storage';

const setAlenviToken = async (token: string, tokenExpireDate: string): Promise<void> => {
  await AsyncStorage.setItem('alenviToken', token);
  await AsyncStorage.setItem('alenvitokenExpireDate', tokenExpireDate);
};

export default {
  setAlenviToken,
};
