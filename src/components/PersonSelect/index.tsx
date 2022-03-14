import React, { useEffect, useState } from 'react';
import { View, Text, ImageSourcePropType, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { formatIdentity } from '../../core/helpers/utils';
import FeatherButton from '../FeatherButton';
import NiPersonEditionModal from '../PersonEditionModal';
import { FormattedUserType } from '../../types/UserType';

type PersonSelectProps = {
  person: FormattedUserType,
  personOptions: FormattedUserType[],
  title: string,
  onSelectPerson: (person: FormattedUserType) => void,
  errorMessage?: string,
  isEditable?: boolean,
  placeHolder?: string,
  modalPlaceHolder?: string,
  displayAvatar?: boolean,
  containerStyle?: Object,
  cellStyle?: Object,
}

const PersonSelect = ({
  person,
  personOptions,
  onSelectPerson,
  title,
  errorMessage = '',
  isEditable = true,
  placeHolder = '',
  modalPlaceHolder = '',
  containerStyle = {},
  displayAvatar = true,
}: PersonSelectProps) => {
  const [personPicture, setPersonPicture] = useState<ImageSourcePropType>({});
  const [personEditionModal, setPersonEditionModal] = useState<boolean>(false);

  useEffect(() => {
    if (person?.picture?.link) setPersonPicture({ uri: person.picture.link });
    else setPersonPicture(require('../../../assets/images/default_avatar.png'));
  }, [person?.picture?.link]);

  const onPress = () => (isEditable
    ? setPersonEditionModal(true)
    : Alert.alert('Impossible', `${errorMessage}`, [{ text: 'OK' }], { cancelable: false })
  );

  return (
    <View style={containerStyle}>
      <Text style={styles.sectionText}>{title}</Text>
      <View style={isEditable ? styles.personCellEditable : styles.personCellNotEditable}>
        <TouchableOpacity style={displayAvatar ? styles.personInfos : styles.personInfosWithoutAvatar}
          onPress={onPress}>
          {displayAvatar && <Image source={personPicture} style={styles.avatar} />}
          <Text style={styles.personText}>{formatIdentity(person?.identity, 'FL') || placeHolder}</Text>
          {isEditable && <FeatherButton name='chevron-down' onPress={() => setPersonEditionModal(true)} />}
        </TouchableOpacity>
        <NiPersonEditionModal visible={personEditionModal} personOptions={personOptions} placeHolder={modalPlaceHolder}
          onRequestClose={() => setPersonEditionModal(false)} onSelectPerson={onSelectPerson}
          selectedPerson={person} />
      </View>
    </View>
  );
};

export default PersonSelect;
