import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import NiModal from '../../../components/modals/Modal';

interface CameraAccessModalProps {
  visible: boolean,
  onPressDismiss: () => void,
  onPressAskAgain: () => void
}

const CameraAccessModal = ({ visible, onPressDismiss, onPressAskAgain }: CameraAccessModalProps) => (
  <NiModal visible={visible} style={styles.container}>
    <>
      <Text style={styles.text}>
        {'Vous n\'avez pas autorisé l\'accès à la caméra. Veuillez l\'autoriser.'}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onPressDismiss}>
          <Text style={styles.buttonText}>{'J\'ai compris'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressAskAgain}>
          <Text style={styles.buttonText}>{'Redemander'}</Text>
        </TouchableOpacity>
      </View>
    </>
  </NiModal>
);

export default CameraAccessModal;
