import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import NiModal from '../../../components/modals/Modal';
import PrimaryButton from '../../form/PrimaryButton';
import SecondaryButton from '../../form/SecondaryButton';
import modalStyles from '../modalStyles';

interface CameraAccessModalProps {
  visible: boolean,
  onPressDismiss: () => void,
  onPressAskAgain: () => void,
}

const CameraAccessModal = ({ visible, onPressDismiss, onPressAskAgain }: CameraAccessModalProps) => (
  <NiModal visible={visible} style={styles.container}>
    <>
      <Text style={modalStyles.title}>Accès à la caméra</Text>
      <Text style={modalStyles.body}>
        Vous n&apos;avez pas autorisé l&apos;accès à la caméra. Veuillez l&apos;autoriser.
      </Text>
      <View style={styles.buttonContainer}>
        <View>
          <SecondaryButton title="J'ai compris" onPress={onPressDismiss} />
        </View>
        <View>
          <PrimaryButton title="Redemander" onPress={onPressAskAgain} />
        </View>
      </View>
    </>
  </NiModal>
);

export default CameraAccessModal;
