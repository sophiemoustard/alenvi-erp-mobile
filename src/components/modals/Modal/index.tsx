import React from 'react';
import { View, Modal } from 'react-native';
import styles from './styles';

interface NiModalProps {
  visible: boolean,
  children: JSX.Element,
  style?: Object,
  contentStyle?: Object,
  onRequestClose?: () => void,
}

const NiModal = ({ visible, children, style, contentStyle, onRequestClose }: NiModalProps) => (
  <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
    <View style={[styles.modalContainer, style]}>
      <View style={[styles.modalContent, contentStyle]}>
        {children}
      </View>
    </View>
  </Modal>
);

export default NiModal;
