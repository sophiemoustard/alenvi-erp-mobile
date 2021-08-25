import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import NiModal from '../../../components/modals/Modal';
import PrimaryButton from '../../form/PrimaryButton';
import SecondaryButton from '../../form/SecondaryButton';
import modalStyles from '../modalStyles';
import FeatherButton from '../../FeatherButton';
import { ICON } from '../../../styles/metrics';

interface CameraAccessModalProps {
  visible: boolean,
  onPressAskAgain: () => void,
  goToManualTimeStamping: () => void,
  onRequestClose: () => void,
}

const CameraAccessModal = ({
  visible,
  onPressAskAgain,
  goToManualTimeStamping,
  onRequestClose,
}: CameraAccessModalProps) => (
  <NiModal visible={visible}>
    <>
      <FeatherButton name="x-circle" onPress={onRequestClose} size={ICON.MD} />
      <Text style={modalStyles.title}>Accès à la caméra</Text>
      <Text style={modalStyles.body}>
        Vous n&apos;avez pas autorisé l&apos;accès à la caméra. Veuillez l&apos;autoriser.
      </Text>
      <View style={styles.buttonContainer}>
        <View>
          <SecondaryButton title={'Horodater\n manuellement'} onPress={goToManualTimeStamping} />
        </View>
        <View>
          <PrimaryButton title="Redemander" onPress={onPressAskAgain} />
        </View>
      </View>
    </>
  </NiModal>
);

export default CameraAccessModal;
