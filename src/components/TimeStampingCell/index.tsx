import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatTime } from '../../core/helpers/dates';
import { CIVILITY_OPTIONS } from '../../core/data/constants';
import styles from './styles';
import { EventType } from '../../types/EventType';
import NiPrimaryButton from '../form/PrimaryButton';

interface TimeStampingProps {
  event: EventType,
}

const TimeStampingCell = ({ event }: TimeStampingProps) => {
  const [civility, setCivility] = useState<string>('M');
  const [lastName, setLastName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date|null>(null);
  const [endDate, setEndDate] = useState<Date|null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (event) {
      setCivility(event.customer?.identity?.title || '');
      setLastName(event.customer?.identity?.lastname || '');
      setEndDate(new Date(event.endDate));
      setStartDate(new Date(event.startDate));
    }
  }, [setCivility, setLastName, setEndDate, setStartDate, event]);

  const goToManualTimeStamping = (eventStart: boolean) => navigation.navigate(
    'ManualTimeStamping',
    { event: { _id: event._id, customer: { identity: event.customer.identity } }, eventStart }
  );

  return (
    <View style={styles.cell}>
      <Text style={styles.title}>{CIVILITY_OPTIONS[civility]} {lastName.toUpperCase()}</Text>
      <View style={styles.sectionDelimiter} />
      <View style={styles.container}>
        <View>
          <Text style={styles.timeTitle}>Début</Text>
          {!!startDate && <Text style={styles.scheduledTime}>{formatTime(startDate)}</Text>}
        </View>
        <View>
          <NiPrimaryButton title='Commencer' onPress={() => goToManualTimeStamping(true)} style={styles.button} />
        </View>
      </View>
      <View style={styles.sectionDelimiter} />
      <View style={styles.container}>
        <View>
          <Text style={styles.timeTitle}>Fin</Text>
          {!!endDate && <Text style={styles.scheduledTime}>{formatTime(endDate)}</Text>}
        </View>
        <View>
          <NiPrimaryButton title='Terminer' onPress={() => goToManualTimeStamping(false)} style={styles.button} />
        </View>
      </View>
    </View>
  );
};

export default TimeStampingCell;
