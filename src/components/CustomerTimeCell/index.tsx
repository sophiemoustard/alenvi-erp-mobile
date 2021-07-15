import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { CIVILITY_OPTIONS } from '../../core/data/constants';
import { formatTime } from '../../core/helpers/dates';
import styles from './styles';

const CustomerTimeCell = ({ identity }: { identity: {title: string, lastname: string} }) => {
  const currentTime = useRef<Date>(new Date());
  const [civility, setCivility] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');

  useEffect(() => {
    setCivility(identity.title);
    setLastname(identity.lastname.toUpperCase());
  }, [identity]);

  return (
    <View style={styles.cell}>
      <View style={styles.customerInfo}>
        <Text style={styles.subtitle}>Bénéficiaire</Text>
        <Text style={styles.info}>{CIVILITY_OPTIONS[civility]} {lastname}</Text>
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
