import { createNavigationContainerRef } from '@react-navigation/native';
import { RootBottomTabParamList, RootStackParamList } from './types/NavigationType';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: keyof RootStackParamList | keyof RootBottomTabParamList, params?: any) => {
  if (navigationRef.current) navigationRef.current.navigate(name, params);
};
