import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NiBottomModal from '../BottomModal';
import { formatIdentity } from '../../core/helpers/utils';
import { EventType } from '../../types/EventType';
import { AuxiliaryType } from '../../types/UserType';
import { EventEditionActionType } from '../../screens/timeStamping/EventEdition/types';
import { SET_AUXILIARY } from '../../screens/timeStamping/EventEdition';
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
    eventEditionDispatch({ type: SET_AUXILIARY, payload: { auxiliary: aux } });
    onRequestClose();
  };

  const renderAuxiliary = (aux: EventType['auxiliary']) => (
    <TouchableOpacity onPress={() => onPress(aux)} style={styles.auxiliaryItem}>
      <Text style={styles.auxiliaryItemText}>{formatIdentity(aux.identity, 'FL')}</Text>
    </TouchableOpacity>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const sortAuxiliaryOptions = (auxiliaries: AuxiliaryType[]) => (
    auxiliaries.sort((a, b) => (a.identity.lastname).localeCompare(b.identity.lastname))
  );

  return (
    <NiBottomModal visible={visible} onRequestClose={onRequestClose}>
      <FlatList data={sortAuxiliaryOptions(auxiliaryOptions)} keyExtractor={item => item._id}
        ItemSeparatorComponent={renderSeparator} renderItem={({ item }) => renderAuxiliary(item)}
        showsHorizontalScrollIndicator={false} />
    </NiBottomModal>
  );
};

export default EventAuxiliaryEditionModal;
