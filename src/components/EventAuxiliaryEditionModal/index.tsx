import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import NiBottomModal from '../BottomModal';
import { EventType } from '../../types/EventType';
import { SET_FIELD } from '../../screens/timeStamping/EventEdition';
import { EventEditionActionType, FormattedAuxiliaryType } from '../../screens/timeStamping/EventEdition/types';
import styles from './styles';

type EventAuxiliaryEditionModalProps = {
  auxiliaryOptions: FormattedAuxiliaryType[],
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
  const [searchText, setSearchText] = useState<string>('');
  const [displayedAuxiliaries, setDisplayedAuxiliaries] = useState<FormattedAuxiliaryType[]>([]);

  useEffect(() => {
    const filteredAuxiliaries = auxiliaryOptions
      .filter(aux => aux.formattedIdentity.toLowerCase().match(new RegExp(`${searchText.toLowerCase()}`)));
    setDisplayedAuxiliaries(filteredAuxiliaries);
  }, [searchText, auxiliaryOptions]);

  useEffect(() => { setDisplayedAuxiliaries(auxiliaryOptions); }, [auxiliaryOptions]);

  const onPress = (aux: EventType['auxiliary']) => {
    eventEditionDispatch({ type: SET_FIELD, payload: { auxiliary: aux } });
    onRequestClose();
  };

  const renderAuxiliary = (aux: FormattedAuxiliaryType) => {
    const avatar = aux.picture?.link
      ? { uri: aux.picture.link }
      : require('../../../assets/images/default_avatar.png');

    return (
      <TouchableOpacity onPress={() => onPress(aux)} style={styles.auxiliaryItem}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.auxiliaryItemText}>{aux.formattedIdentity}</Text>
      </TouchableOpacity>
    );
  };

  const sortAuxiliaryOptions = (auxiliaries: FormattedAuxiliaryType[]) => (
    auxiliaries.sort((a, b) => (a.identity.firstname).localeCompare(b.identity.firstname))
  );

  return (
    <NiBottomModal visible={visible} onRequestClose={onRequestClose}>
      <>
        <TextInput placeholder="Chercher un intervenant" value={searchText} onChangeText={setSearchText} />
        <FlatList data={sortAuxiliaryOptions(displayedAuxiliaries)} keyExtractor={item => item._id}
          renderItem={({ item }) => renderAuxiliary(item)} showsHorizontalScrollIndicator={false} />
      </>
    </NiBottomModal>
  );
};

export default EventAuxiliaryEditionModal;
