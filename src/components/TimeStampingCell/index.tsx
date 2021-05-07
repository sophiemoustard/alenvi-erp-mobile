import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { displayMinutes } from '../../core/helpers/utils';
import { CIVILITY_OPTIONS } from '../../core/data/constants';
import styles from './style';
import { EventType } from '../../types/EventType';

interface timeStampingProps {
  event: EventType,
}

const TimeStampingCell = ({ event }: timeStampingProps) => {
  const [civility, setCivility] = useState<string>('M');
  const [lastName, setLastName] = useState<string>('');
  const [startDateEvent, setStartDateEvent] = useState<Date|null>(null);
  const [endDateEvent, setEndDateEvent] = useState<Date|null>(null);

  useEffect(() => {
    setCivility(event?.customer?.identity?.title || '');
    setLastName(event?.customer?.identity?.lastname || '');
    if (event) {
      setEndDateEvent(new Date(event.endDate));
      setStartDateEvent(new Date(event.startDate));
    }
  }, [setCivility, setLastName, setEndDateEvent, setStartDateEvent, event]);
  return (
    <View style={styles.cell}>
      <Text style={styles.title}>{CIVILITY_OPTIONS.find(opt => opt.value === civility)?.label} {lastName}</Text>
      <View style={styles.sectionDelimiter} />
      <View style={styles.view}>
        <Text style={styles.timeTitle}>Debut</Text>
        {!!startDateEvent &&
          <Text style={styles.scheduledTime}>{startDateEvent.getHours()}:{displayMinutes(startDateEvent)}</Text>
        }
      </View>
      <View style={styles.sectionDelimiter} />
      <View style={styles.view}>
        <Text style={styles.timeTitle}>Fin</Text>
        {!!endDateEvent &&
          <Text style={styles.scheduledTime}>{endDateEvent.getHours()}:{displayMinutes(endDateEvent)}</Text>
        }
      </View>
    </View>
  );
};

export default TimeStampingCell;
