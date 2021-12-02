import React, { useEffect, useState } from 'react';
import { View, Text, ImageSourcePropType, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { formatIdentity } from '../../core/helpers/utils';
import { EventType } from '../../types/EventType';
import { AuxiliaryType } from '../../types/UserType';
import FeatherButton from '../FeatherButton';
import NiEventAuxiliaryEditionModal from '../EventAuxiliaryEditionModal';
import { EventEditionActionType } from '../../screens/timeStamping/EventEdition';

interface EventAuxiliaryEditionProps {
  auxiliary: EventType['auxiliary'],
  auxiliaryOptions: AuxiliaryType[],
  isEditable: boolean,
  eventEditionDispatch: (action: EventEditionActionType) => void,
}

const EventAuxiliaryEdition = ({
  auxiliary,
  auxiliaryOptions,
  eventEditionDispatch,
  isEditable,
}: EventAuxiliaryEditionProps) => {
  const [auxiliaryPicture, setAuxiliaryPicture] = useState<ImageSourcePropType>({});
  const [auxiliaryEditionModal, setAuxiliaryEditionModal] = useState<boolean>(false);

  useEffect(() => {
    if (auxiliary?.picture?.link) setAuxiliaryPicture({ uri: auxiliary.picture.link });
    else setAuxiliaryPicture(require('../../../assets/images/default_avatar.png'));
  }, [auxiliary?.picture?.link]);

  return (
    <>
      <Text style={styles.sectionText}>Intervenant</Text>
      <View style={isEditable ? styles.auxiliaryCellEditable : styles.auxiliaryCellNotEditable}>
        <TouchableOpacity style={styles.auxiliaryInfos} onPress={() => setAuxiliaryEditionModal(true)}
          disabled={!isEditable}>
          <Image source={auxiliaryPicture} style={styles.image} />
          <Text style={styles.auxiliaryText}>{formatIdentity(auxiliary.identity, 'FL')}</Text>
        </TouchableOpacity>
        { isEditable &&
        <>
          <FeatherButton name='chevron-down' onPress={() => setAuxiliaryEditionModal(true)} />
          <NiEventAuxiliaryEditionModal visible={auxiliaryEditionModal} auxiliaryOptions={auxiliaryOptions}
            onRequestClose={() => setAuxiliaryEditionModal(false)} eventEditionDispatch={eventEditionDispatch} />
        </>
        }
      </View>
    </>
  );
};

export default EventAuxiliaryEdition;
