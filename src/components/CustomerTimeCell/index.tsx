import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { CIVILITY_OPTIONS } from '../../core/data/constants';
import { formatTime } from '../../core/helpers/dates';
import styles from './styles';

interface CustomerTimeCellProps {
  identity: { title: string, lastname: string },
  style?: object
}

const CustomerTimeCell = ({ identity, style }: CustomerTimeCellProps) => {
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

export default CustomerTimeCell;
