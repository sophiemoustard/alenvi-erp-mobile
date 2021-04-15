import React from 'react';
import { Text } from 'react-native';
import Modal from '../Modal';
import styles from './styles';
import commonStyles from '../commonStyles';

interface MaintenanceModalProps {
  visible: boolean,
}

const MaintenanceModal = ({ visible }: MaintenanceModalProps) => (
  <Modal visible={visible}>
    <>
      <Text style={commonStyles.title}> L&apos;application est en maintenance !</Text>
      <Text style={[commonStyles.body, styles.body]}>
        L&apos;application devrait de nouveau être disponible dans quelques minutes.
      </Text>
    </>
  </Modal>
);

export default MaintenanceModal;
