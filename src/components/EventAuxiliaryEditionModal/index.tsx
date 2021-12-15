import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, FlatList, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NiBottomModal from '../BottomModal';
import { EventType } from '../../types/EventType';
import { SET_FIELD } from '../../screens/timeStamping/EventEdition';
import { EventEditionActionType, FormattedAuxiliaryType } from '../../screens/timeStamping/EventEdition/types';
import styles from './styles';
import { ICON } from '../../styles/metrics';
import { COPPER_GREY } from '../../styles/colors';
import FeatherButton from '../FeatherButton';

type EventAuxiliaryEditionModalProps = {
  selectedAuxiliary: EventType['auxiliary'],
  auxiliaryOptions: FormattedAuxiliaryType[],
  visible: boolean,
  onRequestClose: () => void,
  eventEditionDispatch: (action: EventEditionActionType) => void,
}

const EventAuxiliaryEditionModal = ({
  selectedAuxiliary,
  visible,
  auxiliaryOptions,
  eventEditionDispatch,
  onRequestClose,
}: EventAuxiliaryEditionModalProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [displayedAuxiliaries, setDisplayedAuxiliaries] = useState<FormattedAuxiliaryType[]>([]);
  let style = styles({});

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

  const renderHeader = () => (
    <View style={style.header}>
      <Feather name="search" size={24} color={COPPER_GREY[400]} />
      <TextInput placeholder="Chercher un intervenant" value={searchText} onChangeText={setSearchText}
        style={style.searchBar} />
      <FeatherButton name="x" size={24} color={COPPER_GREY[400]} onPress={onRequestClose} />
    </View>
  );

  const renderAuxiliary = (aux: FormattedAuxiliaryType) => {
    const avatar = aux.picture?.link
      ? { uri: aux.picture.link }
      : require('../../../assets/images/default_avatar.png');
    const isSelectedAuxiliary = selectedAuxiliary._id === aux._id;
    style = styles({ isSelectedAuxiliary });

    return (
      <TouchableOpacity onPress={() => onPress(aux)} style={style.auxiliaryItem}>
        <Image source={avatar} style={style.avatar} />
        <Text style={style.auxiliaryItemText}>{aux.formattedIdentity}</Text>
        { isSelectedAuxiliary && <Feather name='check' size={ICON.XS} color={COPPER_GREY[500]} /> }
      </TouchableOpacity>
    );
  };

  const sortAuxiliaryOptions = (auxiliaries: FormattedAuxiliaryType[]) => (
    auxiliaries.sort((a, b) => (a.identity.firstname).localeCompare(b.identity.firstname))
  );

  return (
    <NiBottomModal visible={visible} onRequestClose={onRequestClose} header={renderHeader()}>
      <FlatList data={sortAuxiliaryOptions(displayedAuxiliaries)} keyExtractor={item => item._id}
        renderItem={({ item }) => renderAuxiliary(item)} showsHorizontalScrollIndicator={false} />
    </NiBottomModal>
  );
};

export default EventAuxiliaryEditionModal;
