import { useContext, useCallback } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import Authentication from '../../api/Authentication';
import PasswordForm from '../../components/PasswordForm';
import { Context as AuthContext } from '../../context/AuthContext';
import { RootBottomTabParamList, RootStackParamList } from '../../types/NavigationType';

interface PasswordResetProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'PasswordReset'>,
StackScreenProps<RootBottomTabParamList>
> {}

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
