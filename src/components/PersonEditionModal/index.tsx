import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, FlatList, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NiBottomModal from '../BottomModal';
import { EventType } from '../../types/EventType';
import { FormattedAuxiliaryType } from '../../screens/timeStamping/EventEdition/types';
import styles from './styles';
import { ICON } from '../../styles/metrics';
import { COPPER, COPPER_GREY } from '../../styles/colors';
import FeatherButton from '../FeatherButton';
import { AuxiliaryType } from '../../types/UserType';

type PersonEditionModalProps = {
  selectedPerson: EventType['auxiliary'],
  personOptions: FormattedAuxiliaryType[],
  visible: boolean,
  onRequestClose: () => void,
  onSelectPerson: (aux: AuxiliaryType) => void,
}

const PersonEditionModal = ({
  selectedPerson,
  visible,
  personOptions,
  onSelectPerson,
  onRequestClose,
}: PersonEditionModalProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [displayedAuxiliaries, setDisplayedAuxiliaries] = useState<FormattedAuxiliaryType[]>([]);
  let style = styles({});

  useEffect(() => {
    const filteredPersons = personOptions
      .filter(person => person.formattedIdentity.toLowerCase().match(new RegExp(`${searchText.toLowerCase()}`)));
    setDisplayedAuxiliaries(filteredPersons);
  }, [searchText, personOptions]);

  const onPress = (aux: EventType['auxiliary']) => {
    onSelectPerson(aux);
    onPressCloseButton();
  };

  const onPressCloseButton = () => {
    setSearchText('');
    onRequestClose();
  };

  const renderHeader = () => (
    <View style={style.header}>
      <Feather name="search" size={24} color={COPPER_GREY[400]} />
      <TextInput placeholder="Chercher un intervenant" value={searchText} onChangeText={setSearchText}
        style={style.searchBar} placeholderTextColor={COPPER_GREY[300]} />
      <FeatherButton name="x" size={24} color={COPPER_GREY[400]} onPress={onPressCloseButton} />
    </View>
  );

  const renderPerson = (aux: FormattedAuxiliaryType) => {
    const avatar = aux.picture?.link ? { uri: aux.picture.link } : require('../../../assets/images/default_avatar.png');
    const isSelectedPerson = selectedPerson._id === aux._id;
    style = styles({ isSelectedPerson });

    return (
      <TouchableOpacity onPress={() => onPress(aux)} style={style.personItem}>
        <Image source={avatar} style={style.avatar} />
        <Text style={style.personItemText}>{aux.formattedIdentity}</Text>
        {isSelectedPerson && <Feather name='check' size={ICON.XS} color={COPPER[500]} />}
      </TouchableOpacity>
    );
  };

  const sortOptions = (persons: FormattedAuxiliaryType[]) => (
    persons.sort((a, b) => (a.identity.firstname).localeCompare(b.identity.firstname))
  );

  return (
    <NiBottomModal visible={visible} header={renderHeader()} onRequestClose={onRequestClose}>
      <FlatList data={sortOptions(displayedAuxiliaries)} keyExtractor={item => item._id}
        renderItem={({ item }) => renderPerson(item)} showsHorizontalScrollIndicator={false} />
    </NiBottomModal>
  );
};

export default PersonEditionModal;
