import React from 'react';
import { Text } from 'react-native';
import NiModal from '../Modal';
import NiButton from '../../form/Button';
import styles from './styles';
import modalStyles from '../modalStyles';

interface UpdateAppModalProps {
  visible: boolean,
}

const UpdateAppModal = ({ visible }: UpdateAppModalProps) => (
  <NiModal visible={visible}>
    <>
      <Text style={modalStyles.title}> Nouvelle version de l&apos;app disponible !</Text>
      <Text style={[modalStyles.body, styles.body]}>
        Merci de mettre à jour votre application pour pouvoir continuer à l&apos;utiliser :)
      </Text>
      <NiButton title="Mettre à jour" onPress={() => {}}/>
    </>
  </NiModal>
);

export default UpdateAppModal;
