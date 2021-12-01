import React, { useEffect, useState } from 'react';
import { View, Text, ImageSourcePropType, Image } from 'react-native';
import { formatIdentity } from '../../core/helpers/utils';
import { EventType } from '../../types/EventType';
import { AuxiliaryType } from '../../types/UserType';
import styles from './styles';

interface EventAuxiliaryEditionProps {
  auxiliary: EventType['auxiliary'],
  auxiliaryOptions: AuxiliaryType[]
}

const EventAuxiliaryEdition = ({ auxiliary }: EventAuxiliaryEditionProps) => {
  const [auxiliaryPicture, setAuxiliaryPicture] = useState<ImageSourcePropType>({});

  useEffect(() => {
    if (auxiliary?.picture?.link) setAuxiliaryPicture({ uri: auxiliary.picture.link });
    else setAuxiliaryPicture(require('../../../assets/images/default_avatar.png'));
  }, [auxiliary?.picture?.link]);

  return (
    <>
      <Text style={styles.sectionText}>Intervenant</Text>
      <View style={styles.auxiliaryCellNotEditable}>
        <View style={styles.auxiliaryInfos}>
          <Image source={auxiliaryPicture} style={styles.image} />
          <Text style={styles.auxiliaryText}>{formatIdentity(auxiliary.identity, 'FL')}</Text>
        </View>
      </View>
    </>
  );
};

export default EventAuxiliaryEdition;
