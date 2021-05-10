import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { displayMinutes } from '../../core/helpers/utils';
import { CIVILITY_OPTIONS } from '../../core/data/constants';
import styles from './styles';
import { EventType } from '../../types/EventType';

interface TimeStampingProps {
  event: EventType,
}

const TimeStampingCell = ({ event }: TimeStampingProps) => {
  const [civility, setCivility] = useState<string>('M');
  const [lastName, setLastName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date|null>(null);
  const [endDate, setEndDate] = useState<Date|null>(null);

  useEffect(() => {
    if (event) {
      setCivility(event.customer?.identity?.title || '');
      setLastName(event.customer?.identity?.lastname || '');
      setEndDate(new Date(event.endDate));
      setStartDate(new Date(event.startDate));
    }
  }, [setCivility, setLastName, setEndDate, setStartDate, event]);

  return (
    <View style={styles.cell}>
      <Text style={styles.title}>{CIVILITY_OPTIONS[civility]} {lastName.toUpperCase()}</Text>
      <View style={styles.sectionDelimiter} />
      <View style={styles.view}>
        <Text style={styles.timeTitle}>Début</Text>
        {!!startDate &&
          <Text style={styles.scheduledTime}>{startDate.getHours()}:{displayMinutes(startDate)}</Text>
        }
      </View>
      <View style={styles.sectionDelimiter} />
      <View style={styles.view}>
        <Text style={styles.timeTitle}>Fin</Text>
        {!!endDate &&
          <Text style={styles.scheduledTime}>{endDate.getHours()}:{displayMinutes(endDate)}</Text>
        }
      </View>
    </View>
  );
};

export default TimeStampingCell;
