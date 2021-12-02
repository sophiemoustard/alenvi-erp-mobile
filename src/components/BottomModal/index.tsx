import React from 'react';
import { View, Modal } from 'react-native';
import FeatherButton from '../FeatherButton';
import { ICON } from '../../styles/metrics';
import { COPPER_GREY } from '../../styles/colors';
import styles from './styles';

interface NiBottomModalProps {
  visible: boolean,
  children: any,
  onRequestClose: () => void,
}

const BottomModal = ({ visible, children, onRequestClose }: NiBottomModalProps) => (
  <Modal visible={visible} onRequestClose={onRequestClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={COPPER_GREY[600]}
          style={styles.goBack} />
        {children}
      </View>
    </View>
  </Modal>);

export default BottomModal;
