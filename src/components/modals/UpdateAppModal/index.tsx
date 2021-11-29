import React from 'react';
import { Text, Linking } from 'react-native';
import NiModal from '../Modal';
import NiPrimaryButton from '../../form/PrimaryButton';
import styles from './styles';
import modalStyles from '../modalStyles';
import { isIOS } from '../../../core/data/constants';

interface UpdateAppModalProps {
  visible: boolean,
}

const UpdateAppModal = ({ visible }: UpdateAppModalProps) => {
  const appUrl = isIOS ? 'https://apps.apple.com/app/id/1564254334' : 'market://details?id=com.compani.erp';

  return (
    <NiModal visible={visible}>
      <>
        <Text style={modalStyles.title}> Nouvelle version de l&apos;app disponible !</Text>
        <Text style={[modalStyles.body, styles.body]}>
          Merci de mettre à jour votre application pour pouvoir continuer à l&apos;utiliser :)
        </Text>
        <NiPrimaryButton title="Mettre à jour" onPress={() => { Linking.openURL(appUrl); }}/>
      </>
    </NiModal>
  );
};

export default UpdateAppModal;
