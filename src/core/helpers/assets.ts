import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

const fetchFonts = () => Font.loadAsync({
  'fira-sans-black': require('../../../assets/fonts/FiraSans-Black.ttf'),
  'fira-sans-bold': require('../../../assets/fonts/FiraSans-Bold.ttf'),
  'fira-sans-italic': require('../../../assets/fonts/FiraSans-Italic.ttf'),
  'fira-sans-medium': require('../../../assets/fonts/FiraSans-Medium.ttf'),
  'fira-sans-regular': require('../../../assets/fonts/FiraSans-Regular.ttf'),
  'nunito-semi': require('../../../assets/fonts/Nunito-SemiBold.ttf'),
  'nunito-regular': require('../../../assets/fonts/Nunito-Regular.ttf'),
  'nunito-regular-bold-italic': require('../../../assets/fonts/Nunito-BoldItalic.ttf'),
  'nunito-light': require('../../../assets/fonts/Nunito-Light.ttf'),
  'nunito-black': require('../../../assets/fonts/Nunito-Black.ttf'),
});

const fetchImages = async () => {
  const cachedImages = [
    require('../../../assets/images/android_icon.png'),
    require('../../../assets/images/authentication_background_image.jpg'),
    require('../../../assets/images/ios_icon.png'),
    require('../../../assets/images/splash.png'),
  ];

  const imageAssets = cachedImages.map(img => Asset.fromModule(img).downloadAsync());
  await Promise.all([...imageAssets]);
};

export const initializeAssets = async () => {
  await fetchFonts();
  await fetchImages();
};
