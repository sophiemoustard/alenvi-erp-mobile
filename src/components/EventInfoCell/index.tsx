import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { CIVILITY_OPTIONS } from '../../core/data/constants';
import { formatTime } from '../../core/helpers/nativeDates';
import styles from './styles';

interface EventInfoCellProps {
  identity: { title: string, lastname: string },
  style?: object
}

const EventInfoCell = ({ identity, style }: EventInfoCellProps) => {
  const currentTime = useRef<Date>(new Date());

  return (
    <View style={[styles.cell, style]}>
      <View style={styles.customerInfo}>
        <Text style={styles.subtitle}>Bénéficiaire</Text>
        <Text style={styles.info}>{CIVILITY_OPTIONS[identity.title]} {identity.lastname}</Text>
      </View>
      <View style={styles.sectionDelimiter} />
      <View>
        <Text style={styles.subtitle}>Heure horodatée</Text>
        <Text style={styles.info}>{formatTime(currentTime.current)}</Text>
      </View>
    </View>
  );
};

export default EventInfoCell;
