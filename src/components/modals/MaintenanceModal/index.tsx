import React from 'react';
import { Text } from 'react-native';
import Modal from '../Modal';
import styles from './styles';
import modalStyles from '../modalStyles';

interface MaintenanceModalProps {
  visible: boolean,
}

const MaintenanceModal = ({ visible }: MaintenanceModalProps) => (
  <Modal visible={visible}>
    <>
      <Text style={modalStyles.title}> L&apos;application est en maintenance !</Text>
      <Text style={[modalStyles.body, styles.body]}>
        Elle sera de nouveau disponible dans quelques minutes.
      </Text>
    </>
  </Modal>
);

export default MaintenanceModal;
