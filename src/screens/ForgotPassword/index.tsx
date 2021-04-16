import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import NiButton from '../../components/Button';
import FeatherButton from '../../components/FeatherButton';
import NiInput from '../../components/Input';
import ExitModal from '../../components/modals/ExitModal';
import { ICON } from '../../styles/metrics';
import { GREY } from '../../styles/colors';
import { NavigationType } from '../../types/NavigationType';
import styles from './styles';

interface EmailFormProps {
  navigation: NavigationType,
}

const ForgotPassword = ({ navigation }: EmailFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Authentication');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD} color={GREY[600]}/>
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title={'Êtes-vous sûr de cela ?'} contentText={'Vous reviendrez à la page d\'accueil.'} />
      </View>
      <View style={styles.body}>
        <View style={styles.content}>
          <NiInput style={styles.input} title='Email' type='email' setValue={setEmail} value={email} />
        </View>
        <NiButton title='Valider' onPress={() => {}} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
