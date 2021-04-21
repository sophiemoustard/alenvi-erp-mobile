import React, { useState } from 'react';
import { Text, View, Modal, ScrollView } from 'react-native';
import NiPrimaryButton from '../../form/PrimaryButton';
import FeatherButton from '../../FeatherButton';
import { EMAIL, PHONE } from '../../../core/data/constants';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import styles from './styles';

interface ForgotPasswordModalProps {
  visible: boolean,
}

const ForgotPasswordModal = ({ visible }: ForgotPasswordModalProps) => {
  const [isLoading] = useState<boolean>(false);
  const [chosenMethod] = useState<string>('');

  const onRequestClose = () => {};

  const beforeCodeSent = () => (
    <>
      <Text style={styles.beforeCodeSentText}>
        Pour réinitialiser votre mot de passe, vous devez d’abord confirmer votre identité par un code temporaire.
      </Text>
      <NiPrimaryButton title='Recevoir le code par e-mail' style={styles.button}
        loading={isLoading && chosenMethod === EMAIL} />
      <NiPrimaryButton title='Recevoir le code par SMS' style={styles.button}
        loading={isLoading && chosenMethod === PHONE} />
    </>
  );

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
      <ScrollView contentContainerStyle={styles.modalContainer} keyboardShouldPersistTaps='handled'>
        <View style={styles.modalContent}>
          <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={GREY[600]}
            style={styles.goBack} />
          <Text style={styles.title}>Confirmez votre identité</Text>
          {beforeCodeSent()}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ForgotPasswordModal;