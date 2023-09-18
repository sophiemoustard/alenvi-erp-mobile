import { EventEditionType } from '../screens/timeStamping/EventEdition/types';

export interface NavigationType {
  dispatch: (action: any) => {},
  goBack: () => {}
}

export type RootStackParamList = {
  Authentication: undefined;
  PasswordReset: { userId: string, email: string, token: string }
  ProfileEdition: undefined;
  PasswordEdition: { userId: string };
  EventEdition: { event: EventEditionType };
  ForgotPassword: undefined;
}

export type RootBottomTabParamList = {
  CustomerProfile: {customerId: string}
  ForgotPassword: undefined;
  Profile: undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface RootParamList extends RootBottomTabParamList {}
  }
}
