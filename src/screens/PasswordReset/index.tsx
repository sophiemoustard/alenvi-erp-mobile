import React, { useContext, useCallback } from 'react';
import Authentication from '../../api/Authentication';
import PasswordForm from '../../components/PasswordForm';
import { Context as AuthContext } from '../../context/AuthContext';
import { NavigationType } from '../../types/NavigationType';

interface PasswordResetProps {
  route: { params: { userId: string, token: string, email?: string } },
  navigation: NavigationType,
}

const PasswordReset = ({ route, navigation }: PasswordResetProps) => {
  const { signIn } = useContext(AuthContext);

  const goBack = () => { navigation.navigate('ForgotPassword'); };

  const savePassword = useCallback(async (password: string) => {
    const { userId, email, token } = route.params;
    await Authentication.updatePassword(userId, { local: { password } }, token);
    await signIn({ email, password });
  }, [route.params, signIn]);

  return (
    <PasswordForm goBack={goBack} onPress={savePassword} />
  );
};

export default PasswordReset;
