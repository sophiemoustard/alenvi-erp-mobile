import React, { useEffect, useState } from 'react';
import { View, Text, ImageSourcePropType, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { formatIdentity, formatPhone } from '../../core/helpers/utils';
import FeatherButton from '../FeatherButton';
import NiPersonEditionModal from '../PersonEditionModal';
import { FormattedUserType } from '../../types/UserType';
import { COPPER } from '../../styles/colors';
import { ICON } from '../../styles/metrics';

type PersonSelectProps = {
  person: FormattedUserType,
  personOptions: FormattedUserType[],
  title: string,
  onSelectPerson: (person: FormattedUserType) => void,
  errorMessage?: string,
  isEditable?: boolean,
  placeHolder?: string,
  phone?: string,
  modalPlaceHolder?: string,
  displayAvatar?: boolean,
  containerStyle?: Object,
}

const PersonSelect = ({
  person,
  personOptions,
  onSelectPerson,
  title,
  errorMessage = '',
  isEditable = true,
  placeHolder = '',
  phone = '',
  modalPlaceHolder = '',
  displayAvatar = true,
  containerStyle = {},
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
        <TouchableOpacity style={styles.personInfos} onPress={onPress}>
          {displayAvatar && <Image source={personPicture} style={styles.avatar} />}
          <Text style={styles.personText}>{formatIdentity(person?.identity, 'FL') || placeHolder}</Text>
          {isEditable && <FeatherButton name='chevron-down' onPress={() => setPersonEditionModal(true)} />}
        </TouchableOpacity>
        <NiPersonEditionModal visible={personEditionModal} personOptions={personOptions} placeHolder={modalPlaceHolder}
          onRequestClose={() => setPersonEditionModal(false)} onSelectPerson={onSelectPerson}
          selectedPerson={person} />
      </View>
      {!!phone &&
        <View style={styles.phoneContainer}>
          <MaterialIcons name="phone" size={ICON.SM} color={COPPER[500]} />
          <Text style={styles.phone}>
            {formatPhone(phone)}
          </Text>
        </View>}
    </View>
  );
};

export default PersonSelect;
