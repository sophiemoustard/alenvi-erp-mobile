import React from 'react';
import { Text } from 'react-native';
import NiModal from '../Modal';
import NiButton from '../../Button';
import styles from './styles';

interface UpdateAppModalProps {
  visible: boolean,
}

const UpdateAppModal = ({ visible } : UpdateAppModalProps) => (
  <NiModal visible={visible}>
    <>
      <Text style={styles.title}> Nouvelle version de l&apos;app disponible !</Text>
      <Text style={styles.body}>
        Merci de mettre à jour votre application pour pouvoir continuer à l&apos;utiliser :)
      </Text>
      <NiButton title="Mettre à jour" onPress={() => {}}/>
    </>
  </NiModal>
);

export default UpdateAppModal;
