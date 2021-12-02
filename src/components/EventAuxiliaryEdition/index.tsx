import React, { useEffect, useState } from 'react';
import { View, Text, ImageSourcePropType, Image, TouchableOpacity } from 'react-native';
import { formatIdentity } from '../../core/helpers/utils';
import { EventType } from '../../types/EventType';
import { AuxiliaryType } from '../../types/UserType';
import FeatherButton from '../FeatherButton';
import NiEventAuxiliaryEditionModal from '../EventAuxiliaryEditionModal';
import styles from './styles';
import { EventEditionActionType } from '../../screens/timeStamping/EventEdition';

interface EventAuxiliaryEditionProps {
  auxiliary: EventType['auxiliary'],
  auxiliaryOptions: AuxiliaryType[],
  eventEditionDispatch: (action: EventEditionActionType) => void,
}

const EventAuxiliaryEdition = ({ auxiliary, auxiliaryOptions, eventEditionDispatch }: EventAuxiliaryEditionProps) => {
  const [auxiliaryPicture, setAuxiliaryPicture] = useState<ImageSourcePropType>({});
  const [auxiliaryEditionModal, setAuxiliaryEditionModal] = useState<boolean>(false);

  useEffect(() => {
    if (auxiliary?.picture?.link) setAuxiliaryPicture({ uri: auxiliary.picture.link });
    else setAuxiliaryPicture(require('../../../assets/images/default_avatar.png'));
  }, [auxiliary?.picture?.link]);

  return (
    <>
      <Text style={styles.sectionText}>Intervenant</Text>
      <View style={styles.auxiliaryCellNotEditable}>
        <TouchableOpacity style={styles.auxiliaryInfos} onPress={() => setAuxiliaryEditionModal(true)}>
          <Image source={auxiliaryPicture} style={styles.image} />
          <Text style={styles.auxiliaryText}>{formatIdentity(auxiliary.identity, 'FL')}</Text>
        </TouchableOpacity>
        <FeatherButton name='chevron-down' onPress={() => setAuxiliaryEditionModal(true)} />
        <NiEventAuxiliaryEditionModal visible={auxiliaryEditionModal} auxiliaryOptions={auxiliaryOptions}
          onRequestClose={() => setAuxiliaryEditionModal(false)} eventEditionDispatch={eventEditionDispatch} />
      </View>
    </>
  );
};

export default EventAuxiliaryEdition;
