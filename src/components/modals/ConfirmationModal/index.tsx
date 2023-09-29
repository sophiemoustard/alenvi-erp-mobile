import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COPPER, COPPER_GREY } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import FeatherButton from '../../FeatherButton';
import NiModal from '../Modal';
import styles from './styles';

interface ConfirmationModalProps {
  visible: boolean,
  onPressCancelButton: () => void,
  onPressConfirmButton: () => void,
  title?: string,
  exitButton?: boolean,
  children?: JSX.Element,
  contentText?: string,
  cancelText?: string,
  confirmText?: string,
  loading?: boolean,
  onRequestClose?: () => void,
}

const ConfirmationModal = ({
  visible,
  children,
  onPressCancelButton,
  onPressConfirmButton,
  title = '',
  exitButton = false,
  contentText = '',
  cancelText = 'Annuler',
  confirmText = 'Quitter',
  loading = false,
  onRequestClose = () => {},
}: ConfirmationModalProps) => (
  <NiModal visible={visible}>
    <>
      {!!(title || exitButton) && (
        <View style={styles.header}>
          {!!title && <Text style={styles.title}>{title}</Text>}
          {exitButton && <FeatherButton name="x" onPress={onRequestClose} size={ICON.SM} color={COPPER_GREY[400]}
            style={styles.closeButton} />}
        </View>
      )}
      {!!contentText && <Text style={styles.contentText}>{contentText}</Text>}
      {children}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onPressCancelButton} disabled={loading}>
          <Text style={styles.buttonText}>{cancelText}</Text>
        </TouchableOpacity>
        {loading
          ? <ActivityIndicator style={styles.button} color={COPPER[500]} size="small" />
          : <TouchableOpacity style={styles.button} onPress={onPressConfirmButton}>
            <Text style={styles.buttonText}>{confirmText}</Text>
          </TouchableOpacity>}
      </View>
    </>
  </NiModal>
);

export default ConfirmationModal;
