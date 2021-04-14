import React from 'react';
import { Text } from 'react-native';
import NiModal from '../Modal';
import NiButton from '../../Button';
import styles from './styles';
import commonStyles from '../commonStyles';

interface UpdateAppModalProps {
  visible: boolean,
}

const UpdateAppModal = ({ visible }: UpdateAppModalProps) => (
  <NiModal visible={visible}>
    <>
      <Text style={commonStyles.title}> Nouvelle version de l&apos;app disponible !</Text>
      <Text style={[commonStyles.body, styles.body]}>
        Merci de mettre à jour votre application pour pouvoir continuer à l&apos;utiliser :)
      </Text>
      <NiButton title="Mettre à jour" onPress={() => {}}/>
    </>
  </NiModal>
);

export default UpdateAppModal;
