import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { displayMinutes, displayCivility } from '../../core/helpers/utils';
import styles from './style';

const TimeStampingCell = ({ event }: any) => {
  const [civility, setCivility] = useState<string>('M');
  const [lastName, setLastName] = useState<string>('');
  const [startDateEvent, setStartDateEvent] = useState<Date|null>(new Date());
  const [endDateEvent, setEndDateEvent] = useState<Date|null>(new Date());

  useEffect(() => {
    setCivility(event?.customer?.identity?.title);
    setLastName(event?.customer?.identity?.lastname);
    setEndDateEvent(new Date(event?.endDate));
    setStartDateEvent(new Date(event?.startDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.cellEvent}>
      <Text style={styles.cellText}>{displayCivility(civility)} {lastName}</Text>
      <View style={styles.sectionDelimiter} />
      <View>
        <Text style={styles.eventTimeText}>Debut</Text>
        {!!startDateEvent &&
        <Text style={styles.scheduledEvent}>{startDateEvent?.getHours()}:{displayMinutes(startDateEvent)}</Text>
        }
      </View>
      <View style={styles.sectionDelimiter} />
      <View>
        <Text style={styles.eventTimeText}>Fin</Text>
        {!!endDateEvent &&
        <Text style={styles.scheduledEvent}>{endDateEvent?.getHours()}:{displayMinutes(endDateEvent)}</Text>
        }
      </View>
    </View>
  );
};

export default TimeStampingCell;
