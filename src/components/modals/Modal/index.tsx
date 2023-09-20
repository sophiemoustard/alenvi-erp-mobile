import { View, Modal, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import { isIOS } from '../../../core/data/constants';

interface NiModalProps {
  visible: boolean,
  children: JSX.Element,
  style?: Object,
  contentStyle?: Object,
  onRequestClose?: () => void,
}

const NiModal = ({ visible, children, style, contentStyle, onRequestClose }: NiModalProps) => (
  <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
    <KeyboardAvoidingView style={[styles.modalContainer, style]} behavior={isIOS ? 'padding' : 'height'}>
      <View style={[styles.modalContent, contentStyle]}>
        {children}
      </View>
    </KeyboardAvoidingView>
  </Modal>
);

export default NiModal;
