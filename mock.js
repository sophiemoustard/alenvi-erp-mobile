import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('expo-constants', () => ({ manifest: { version: '1.0.0' } }));
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
jest.mock('expo-camera', () => {});
jest.mock('expo-font');
