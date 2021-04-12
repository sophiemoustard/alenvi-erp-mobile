import * as Font from 'expo-font';

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

export const initializeAssets = async () => {
  await fetchFonts();
};
