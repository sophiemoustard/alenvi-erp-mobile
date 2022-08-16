import PasswordForm from '../../components/PasswordForm';
import { NavigationType } from '../../types/NavigationType';
import Authentication from '../../api/Authentication';

interface PasswordEditionProps {
  route: { params: { userId: string } },
  navigation: NavigationType,
}

const PasswordEdition = ({ route, navigation }: PasswordEditionProps) => {
  const { userId } = route.params;

  const goBack = () => { navigation.navigate('Home', { screen: 'Profile' }); };

  const savePassword = async (password: string) => {
    await Authentication.updatePassword(userId, { local: { password } });
    goBack();
  };

  return (<PasswordForm goBack={goBack} onPress={savePassword} />);
};

export default PasswordEdition;
