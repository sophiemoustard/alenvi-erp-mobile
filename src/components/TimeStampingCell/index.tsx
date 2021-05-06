import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const TimeStampingCell = ({ event }: any) => {
  const [lastName, setLastName] = useState<string>('');
  const [startDateEvent, setStartDateEvent] = useState<Date|null>(new Date());
  const [endDateEvent, setEndDateEvent] = useState<Date|null>(new Date());

  useEffect(() => {
    setLastName(event?.customer?.identity?.lastname);
    setEndDateEvent(new Date(event?.endDate));
    setStartDateEvent(new Date(event?.startDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.cellEvent}>
      <Text style={styles.cellText}>{lastName}</Text>
      <View style={styles.sectionDelimiter} />
      <View>
        <Text style={styles.eventTimeText}>Debut</Text>
        <Text style={styles.scheduledEvent}>{startDateEvent?.getHours()}:{startDateEvent?.getMinutes()}</Text>
      </View>
      <View style={styles.sectionDelimiter} />
      <View>
        <Text style={styles.eventTimeText}>Fin</Text>
        <Text style={styles.scheduledEvent}>{endDateEvent?.getHours()}:{endDateEvent?.getMinutes()}</Text>
      </View>
    </View>
  );
};

export default TimeStampingCell;
