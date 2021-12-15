import React from 'react';
import { View, Modal } from 'react-native';
import FeatherButton from '../FeatherButton';
import { ICON } from '../../styles/metrics';
import { COPPER_GREY } from '../../styles/colors';
import styles from './styles';

type NiBottomModalProps = {
  visible: boolean,
  children: JSX.Element,
  onRequestClose: () => void,
  header?: JSX.Element,
}

const BottomModal = ({ visible, children, onRequestClose, header }: NiBottomModalProps) => (
  <Modal visible={visible} onRequestClose={onRequestClose} transparent>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {header || <FeatherButton name='x-circle' onPress={onRequestClose} size={ICON.LG} color={COPPER_GREY[600]}
          style={styles.goBack} />}
        {children}
      </View>
    </View>
  </Modal>);

export default BottomModal;
