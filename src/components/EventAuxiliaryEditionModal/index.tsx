import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NiBottomModal from '../BottomModal';
import { formatIdentity } from '../../core/helpers/utils';
import { EventType } from '../../types/EventType';
import { AuxiliaryType } from '../../types/UserType';
import { EventEditionActionType } from '../../screens/timeStamping/EventEdition/types';
import { SET_AUXILIARY } from '../../screens/timeStamping/EventEdition';

interface EventAuxiliaryEditionModalProps {
  auxiliaryOptions: AuxiliaryType [],
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
    eventEditionDispatch({ type: SET_AUXILIARY, payload: { auxiliary: aux } });
    onRequestClose();
  };

  const renderAuxiliary = (aux: EventType['auxiliary']) => (
    <TouchableOpacity onPress={() => onPress(aux)}>
      <Text>{formatIdentity(aux.identity, 'FL')}</Text>
    </TouchableOpacity>
  );

  return (
    <NiBottomModal visible={visible} onRequestClose={onRequestClose}>
      <FlatList data={auxiliaryOptions} keyExtractor={item => item._id}
        renderItem={({ item }) => renderAuxiliary(item)} showsHorizontalScrollIndicator={false} />
    </NiBottomModal>
  );
};

export default EventAuxiliaryEditionModal;
