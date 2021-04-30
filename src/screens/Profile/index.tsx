import React, { useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NiSecondaryButton from '../../components/form/SecondaryButton';
import { Context as AuthContext } from '../../context/AuthContext';
import commonStyle from '../../styles/common';
import styles from './styles';

const Profile = () => {
  const { signOut, loggedUser } = useContext(AuthContext);

  return (
    <>
      <ScrollView >
        <View style={styles.identityContainer }>
          <Text style={commonStyle.title}>Mon profil</Text>
          <View style={styles.profilView} >
            <Image
              source={require('../../../assets/images/default_avatar.png')} style={styles.image}
            />
            <View>
              <Text style={styles.name}> {loggedUser?.identity?.lastname} {loggedUser?.identity?.firstname}</Text>
              <Text style={styles.company}>{loggedUser?.company?.name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionDelimiter} />
        <View style={styles.contactContainer}>
          <Text style={styles.contact}>Contact</Text>
          <Text style={styles.subtitle}>Téléphone</Text>
          <Text style={styles.infos}>{loggedUser?.contact?.phone ? loggedUser?.contact.phone : 'Non renseigné'}</Text>
          <Text style={styles.subtitle}>eMail</Text>
          <Text style={styles.infos}>{loggedUser?.local?.email}</Text>
        </View>
        <View style={styles.sectionDelimiter} />
        <View style={styles.buttonContainer}>
          <NiSecondaryButton style={styles.button} title='Me déconnecter' onPress={signOut} />
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
