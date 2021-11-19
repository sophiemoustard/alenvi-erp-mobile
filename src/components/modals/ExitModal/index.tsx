import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NiModal from '../Modal';
import styles from './styles';

interface ExitModalProps {
  visible: boolean,
  title?: string,
  contentText: string,
  cancelText?: string,
  confirmText?: string,
  onPressCancelButton: () => void,
  onPressConfirmButton: () => void,
}

const ExitModal = ({
  visible,
  title = '',
  contentText,
  cancelText = 'Annuler',
  confirmText = 'Quitter',
  onPressCancelButton,
  onPressConfirmButton,
}: ExitModalProps) => (
  <NiModal visible={visible}>
    <>
      {!!title && <Text style={styles.title}>{title}</Text>}
      <Text style={styles.contentText}>{contentText}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onPressCancelButton}>
          <Text style={styles.buttonText}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressConfirmButton}>
          <Text style={styles.buttonText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </>
  </NiModal>
);

export default ExitModal;
