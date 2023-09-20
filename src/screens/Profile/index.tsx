import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, ImageSourcePropType, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import NiSecondaryButton from '../../components/form/SecondaryButton';
import { Context as AuthContext } from '../../context/AuthContext';
import commonStyle from '../../styles/common';
import { formatPhone } from '../../core/helpers/utils';
import styles from './styles';

const Profile = () => {
  const { signOut, loggedUser } = useContext(AuthContext);
  const [source, setSource] = useState<ImageSourcePropType>(require('../../../assets/images/default_avatar.png'));
  const navigation = useNavigation<StackNavigationProp<any>>();

  const goToPasswordReset = () => (
    navigation.navigate('PasswordEdition', { userId: loggedUser?._id })
  );

  const goToProfileEdition = () => navigation.navigate('ProfileEdition');

  useEffect(() => {
    if (loggedUser?.picture?.link) setSource({ uri: loggedUser.picture.link });
  }, [loggedUser?.picture?.link]);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={commonStyle.title}>Mon profil</Text>
      <View style={styles.identityContainer}>
        <View style={styles.profilView}>
          <Image source={source} style={styles.image} />
          <View style={styles.infosProfilView}>
            <Text style={styles.name}>{loggedUser?.identity?.firstname} {loggedUser?.identity?.lastname}</Text>
            <Text style={styles.company}>{loggedUser?.company?.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionDelimiter} />
      <View style={styles.contactContainer}>
        <Text style={styles.contact}>Contact</Text>
        <Text style={styles.subtitle}>Téléphone</Text>
        <Text style={styles.infos}>{formatPhone(loggedUser?.contact?.phone) || 'Non renseigné'}</Text>
        <Text style={styles.subtitle}>E-mail</Text>
        <Text style={styles.infos}>{loggedUser?.local?.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <NiSecondaryButton title='Modifier mes informations' onPress={goToProfileEdition} style={styles.button} />
        <NiSecondaryButton title='Modifier mon mot de passe' onPress={goToPasswordReset} />
      </View>
      <View style={styles.sectionDelimiter} />
      <View style={styles.buttonContainer}>
        <NiSecondaryButton title='Me déconnecter' onPress={signOut} style={styles.button} />
      </View>
    </ScrollView>
  );
};

export default Profile;
