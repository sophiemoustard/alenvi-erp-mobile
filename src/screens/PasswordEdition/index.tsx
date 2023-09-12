import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import PasswordForm from '../../components/PasswordForm';
import { RootBottomTabParamList, RootStackParamList } from '../../types/NavigationType';
import Authentication from '../../api/Authentication';

interface PasswordEditionProps extends CompositeScreenProps<
StackScreenProps<RootStackParamList, 'PasswordEdition'>,
StackScreenProps<RootBottomTabParamList>
> {}

const PasswordEdition = ({ route, navigation }: PasswordEditionProps) => {
  const { userId } = route.params;

  const goBack = () => { navigation.navigate('Profile'); };

  const savePassword = async (password: string) => {
    await Authentication.updatePassword(userId, { local: { password } });
    goBack();
  };

  return (<PasswordForm goBack={goBack} onPress={savePassword} />);
};

export default PasswordEdition;
