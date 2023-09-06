import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('expo-constants', () => ({ manifest: { version: '1.0.0' } }));
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('expo-camera', () => {});
jest.mock('expo-font');
