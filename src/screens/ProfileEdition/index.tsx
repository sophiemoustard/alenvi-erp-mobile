import { useNavigation } from '@react-navigation/core';
import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import FeatherButton from '../../components/FeatherButton';
import ExitModal from '../../components/modals/ExitModal';
import NiInput from '../../components/form/Input';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import { GREY } from '../../styles/colors';
import { ICON, IS_LARGE_SCREEN, KEYBOARD_AVOIDING_VIEW_BEHAVIOR, MARGIN } from '../../styles/metrics';
import { Context as AuthContext } from '../../context/AuthContext';
import styles from './styles';

const ProfileEdition = () => {
  const { loggedUser } = useContext(AuthContext);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [lastname, setLastname] = useState<string>(loggedUser?.identity?.lastname || '');
  const [firstname, setFirstname] = useState<string>(loggedUser?.identity?.firstname || '');
  const [phone, setPhone] = useState<string>(loggedUser?.contact?.phone || '');
  const [email, setEmail] = useState<string>(loggedUser?.local?.email || '');

  const navigation = useNavigation();

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Home', { screen: 'Profile' });
  };

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD}
            color={GREY[600]} />
          <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
            onPressCancelButton={() => setExitConfirmationModal(false)}
            title={'Êtes-vous sûr de cela ?'} contentText={'Vos modifications ne seront pas enregistrées'} />
          <Text style={styles.title}>Modifier mes informations</Text>
        </View>
        <View style={styles.container}>
          <NiInput caption='Nom' value={lastname} type='lastname' onChangeText={(text: string) => setLastname(text)}/>
          <NiInput caption='Prénom' type='firstname' value={firstname}
            onChangeText={(text: string) => setFirstname(text)} />
          <NiInput caption='Téléphone' type='phone' value={phone} onChangeText={(text: string) => setPhone(text)} />
          <NiInput caption='E-mail' type='email' value={email} onChangeText={(text: string) => setEmail(text)} />
        </View>
        <NiPrimaryButton title='Valider' onPress={() => {}}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileEdition;
