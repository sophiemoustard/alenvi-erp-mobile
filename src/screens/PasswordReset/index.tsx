import React from 'react';
import PasswordForm from '../../components/PasswordForm';
import { NavigationType } from '../../types/NavigationType';

interface PasswordResetProps {
  route: { params: { userId: string, token: string, email?: string } },
  navigation: NavigationType,
}

const PasswordReset = ({ navigation }: PasswordResetProps) => {
  const goBack = () => { navigation.navigate('ForgotPassword'); };

  return (
    <PasswordForm goBack={goBack} />
  );
};

export default PasswordReset;
