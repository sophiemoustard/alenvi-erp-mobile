import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import NiButton from '../../components/Button';
import { Context as AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.view }>
      <Text>Welcome to Compani!!</Text>
      <NiButton customStyles={{ button: styles.button, textButton: styles.textButton }}
        title='Me déconnecter' onPress={signOut} />
    </View>
  );
};

export default Profile;
