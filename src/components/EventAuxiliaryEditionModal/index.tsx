import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NiBottomModal from '../BottomModal';
import { formatIdentity } from '../../core/helpers/utils';
import { EventType } from '../../types/EventType';
import { AuxiliaryType } from '../../types/UserType';
import { EventEditionActionType } from '../../screens/timeStamping/EventEdition/types';
import { SET_FIELD } from '../../screens/timeStamping/EventEdition';
import styles from './styles';

type EventAuxiliaryEditionModalProps = {
  auxiliaryOptions: AuxiliaryType[],
  visible: boolean,
  onRequestClose: () => void,
  eventEditionDispatch: (action: EventEditionActionType) => void,
}

const EventAuxiliaryEditionModal = ({
  visible,
  auxiliaryOptions,
  eventEditionDispatch,
  onRequestClose,
}: EventAuxiliaryEditionModalProps) => {
  const onPress = (aux: EventType['auxiliary']) => {
    eventEditionDispatch({ type: SET_FIELD, payload: { auxiliary: aux } });
    onRequestClose();
  };

  const renderAuxiliary = (aux: EventType['auxiliary']) => {
    const avatar = aux.picture?.link
      ? { uri: aux.picture.link }
      : require('../../../assets/images/default_avatar.png');

    return (
      <TouchableOpacity onPress={() => onPress(aux)} style={styles.auxiliaryItem}>
        <Image source={avatar} style={styles.image} />
        <Text style={styles.auxiliaryItemText}>{formatIdentity(aux.identity, 'FL')}</Text>
      </TouchableOpacity>
    );
  };

  const sortAuxiliaryOptions = (auxiliaries: AuxiliaryType[]) => (
    auxiliaries.sort((a, b) => (a.identity.firstname).localeCompare(b.identity.firstname))
  );

  return (
    <NiBottomModal visible={visible} onRequestClose={onRequestClose}>
      <FlatList data={sortAuxiliaryOptions(auxiliaryOptions)} keyExtractor={item => item._id}
        renderItem={({ item }) => renderAuxiliary(item)} showsHorizontalScrollIndicator={false} />
    </NiBottomModal>
  );
};

export default EventAuxiliaryEditionModal;
