import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NiModal from '../Modal';
import styles from './styles';

interface ConfirmationModalProps {
  visible: boolean,
  title?: string,
  children?: JSX.Element,
  contentText: string,
  cancelText?: string,
  confirmText?: string,
  onPressCancelButton: () => void,
  onPressConfirmButton: () => void,
}

const ConfirmationModal = ({
  visible,
  title = '',
  children,
  contentText,
  cancelText = 'Annuler',
  confirmText = 'Quitter',
  onPressCancelButton,
  onPressConfirmButton,
}: ConfirmationModalProps) => (
  <NiModal visible={visible}>
    <>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {children}
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

export default ConfirmationModal;
