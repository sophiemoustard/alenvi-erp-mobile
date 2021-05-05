import React from 'react';
import PasswordForm from '../../components/PasswordForm';
import { NavigationType } from '../../types/NavigationType';

interface PasswordEditionProps {
  route: { params: { userId: string, token: string, email?: string } },
  navigation: NavigationType,
}

const PasswordEdition = ({ navigation }: PasswordEditionProps) => {
  const goBack = () => { navigation.navigate('EmailForm'); };

  return (
    <PasswordForm goBack={goBack} />
  );
};

export default PasswordEdition;
