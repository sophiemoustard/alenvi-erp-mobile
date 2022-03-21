import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, FlatList, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NiBottomModal from '../BottomModal';
import styles from './styles';
import { ICON } from '../../styles/metrics';
import { COPPER, COPPER_GREY } from '../../styles/colors';
import FeatherButton from '../FeatherButton';
import { FormattedUserType } from '../../types/UserType';

type PersonEditionModalProps = {
  selectedPerson: FormattedUserType,
  personOptions: FormattedUserType[],
  visible: boolean,
  placeHolder: string,
  onRequestClose: () => void,
  onSelectPerson: (person: FormattedUserType) => void,
}

const PersonEditionModal = ({
  selectedPerson,
  visible,
  personOptions,
  placeHolder,
  onSelectPerson,
  onRequestClose,
}: PersonEditionModalProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [displayedPersons, setDisplayedPersons] = useState<FormattedUserType[]>([]);
  let style = styles({});

  useEffect(() => {
    const filteredPersons = personOptions
      .filter(person => person.formattedIdentity.toLowerCase().match(new RegExp(`${searchText.toLowerCase()}`)));
    setDisplayedPersons(filteredPersons);
  }, [searchText, personOptions]);

  const onPress = (person: FormattedUserType) => {
    onSelectPerson(person);
    onPressCloseButton();
  };

  const onPressCloseButton = () => {
    setSearchText('');
    onRequestClose();
  };

  const renderHeader = () => (
    <View style={style.header}>
      <Feather name="search" size={24} color={COPPER_GREY[400]} />
      <TextInput placeholder={placeHolder} value={searchText} onChangeText={setSearchText}
        style={style.searchBar} placeholderTextColor={COPPER_GREY[300]} />
      <FeatherButton name="x" size={24} color={COPPER_GREY[400]} onPress={onPressCloseButton} />
    </View>
  );

  const renderPerson = (person: FormattedUserType) => {
    const avatar = person.picture?.link
      ? { uri: person.picture.link }
      : require('../../../assets/images/default_avatar.png');
    const isSelectedPerson = selectedPerson._id === person._id;
    style = styles({ isSelectedPerson });

    return (
      <TouchableOpacity onPress={() => onPress(person)} style={style.personItem}>
        <Image source={avatar} style={style.avatar} />
        <Text style={style.personItemText}>{person.formattedIdentity}</Text>
        {isSelectedPerson && <Feather name='check' size={ICON.XS} color={COPPER[500]} />}
      </TouchableOpacity>
    );
  };

  const sortOptions = (persons: FormattedUserType[]) => (
    persons.sort((a, b) => (a.formattedIdentity).localeCompare(b.formattedIdentity))
  );

  return (
    <NiBottomModal visible={visible} header={renderHeader()} onRequestClose={onRequestClose}>
      <FlatList data={sortOptions(displayedPersons)} keyExtractor={item => item._id}
        renderItem={({ item }) => renderPerson(item)} showsHorizontalScrollIndicator={false} />
    </NiBottomModal>
  );
};

export default PersonEditionModal;
