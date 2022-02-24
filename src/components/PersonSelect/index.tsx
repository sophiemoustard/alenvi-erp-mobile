import React, { useEffect, useState } from 'react';
import { View, Text, ImageSourcePropType, Image, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { formatIdentity } from '../../core/helpers/utils';
import { EventType } from '../../types/EventType';
import FeatherButton from '../FeatherButton';
import NiPersonEditionModal from '../PersonEditionModal';
import { FormattedAuxiliaryType } from '../../screens/timeStamping/EventEdition/types';
import { AuxiliaryType } from '../../types/UserType';

type PersonSelectProps = {
  person: EventType['auxiliary'],
  personOptions: FormattedAuxiliaryType[],
  isEditable: boolean,
  title: string,
  onSelectPerson: (aux: AuxiliaryType) => void,
  errorMessage?: string,
}

const PersonSelect = ({
  person,
  personOptions,
  onSelectPerson,
  isEditable,
  title,
  errorMessage = '',
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
    <>
      <Text style={styles.sectionText}>{title}</Text>
      <View style={isEditable ? styles.personCellEditable : styles.personCellNotEditable}>
        <TouchableOpacity style={styles.personInfos} onPress={onPress}>
          <Image source={personPicture} style={styles.avatar} />
          <Text style={styles.personText}>{formatIdentity(person?.identity, 'FL')}</Text>
          {isEditable && <FeatherButton name='chevron-down' onPress={() => setPersonEditionModal(true)} />}
        </TouchableOpacity>
        <NiPersonEditionModal visible={personEditionModal} personOptions={personOptions}
          onRequestClose={() => setPersonEditionModal(false)} onSelectPerson={onSelectPerson}
          selectedPerson={person} />
      </View>
    </>
  );
};

export default PersonSelect;
