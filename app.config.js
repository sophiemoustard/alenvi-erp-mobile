/* eslint-disable max-len */
import 'dotenv/config';

const ENVIRONMENT_VARIABLES = {
  BASE_URL_LOCAL: process.env.BASE_URL_LOCAL,
  BASE_URL_DEV: process.env.BASE_URL_DEV,
  BASE_URL_STAGING: process.env.BASE_URL_STAGING,
  BASE_URL_PROD: process.env.BASE_URL_PROD,
  PROFILE: process.env.PROFILE,
  SENTRY_KEY: process.env.SENTRY_KEY,
  TEST_EMAILS: process.env.TEST_EMAILS,
  TEST_IDS: process.env.TEST_IDS,
  PLATFORM: process.env.PLATFORM,
};

const LOCAL = 'local';
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const getVariables = () => {
  switch (process.env.PROFILE) {
    case LOCAL:
      return { appName: 'Compani Outils - local', bundleIdentifier: 'com.compani.erp.local' };
    case DEVELOPMENT:
      return { appName: 'Compani Outils - Dev', bundleIdentifier: 'com.compani.erp.dev' };
    case PRODUCTION:
      return { appName: 'Compani Outils', bundleIdentifier: 'com.compani.erp' };
    default:
      return 'Compani Outils';
  }
};

const variables = getVariables();

export default {
  expo: {
    name: variables.appName,
    slug: 'erp-mobile',
    description: 'Interface auxiliaire de l\'ERP Compani',
    platforms: ['ios', 'android'],
    version: '1.12.0',
    orientation: 'portrait',
    primaryColor: '#FFFFFF',
    icon: './assets/images/ios_icon.png',
    backgroundColor: '#FFFFFF',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#005774',
    },
    assetBundlePatterns: ['assets/images/*'],
    extra: {
      ...ENVIRONMENT_VARIABLES,
      eas: {
        projectId: process.env.PROJECT_ID,
      },
      hooks: { // eas updates -> to be removed when using eas updates - waiting for eas updates to be configures
        postPublish: [{
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'alenvi',
            project: 'mobile-erp',
          },
        }],
      },
    },
    updates: {
      enabled: true,
      checkAutomatically: 'ON_LOAD',
      fallbackToCacheTimeout: 3000,
    },
    notification: {
      icon: './assets/images/android_notification_icon.png',
      color: '#FFFFFF',
    },
    ios: {
      buildNumber: '1.12.0',
      bundleIdentifier: variables.bundleIdentifier,
      requireFullScreen: true,
      icon: './assets/images/ios_icon.png',
      infoPlist: {
        NSCameraUsageDescription: 'Autorisez l\'accès à votre caméra pour pouvoir prendre une photo et la charger comme photo de profil dans Compani et scanner le QR code.',
        NSPhotoLibraryUsageDescription: 'Autorisez l\'accès à votre librairie pour pouvoir choisir une photo et la charger comme photo de profil dans Compani.',
      },
    },
    android: {
      package: variables.bundleIdentifier,
      googleServicesFile: './google-services.json',
      permissions: ['CAMERA', 'READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE'],
      icon: './assets/images/android_icon_old.png',
      adaptiveIcon: {
        foregroundImage: './assets/images/android_icon.png',
        backgroundColor: '#FFFFFF',
      },
      versionCode: 30,
    },
  },
};
