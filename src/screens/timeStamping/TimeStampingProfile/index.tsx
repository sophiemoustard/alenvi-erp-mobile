import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, ScrollView } from 'react-native';
import commonStyle from '../../../styles/common';
import Events from '../../../api/Events';
import { Context as AuthContext } from '../../../context/AuthContext';
import { INTERVENTION } from '../../../core/data/constants';
import { capitalizeFirstLetter, formatWordToPlural } from '../../../core/helpers/utils';
import { formatTime, formatDate } from '../../../core/helpers/dates';
import TimeStampingCell from '../../../components/TimeStampingCell';
import styles from './styles';
import { EventType } from '../../../types/EventType';

const renderEvent = (event: EventType) => (
  <View key={event._id}>
    <TimeStampingCell event={event} />
    <View style={styles.separator} />
  </View>
);

const TimeStampingProfile = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventType[]>([]);

  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => { setCurrentDate(new Date()); }, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchInterventions = useCallback(async () => {
    try {
      if (!loggedUser || !loggedUser._id) return;
      const params = {
        auxiliary: loggedUser._id,
        startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
        type: INTERVENTION,
      };
      const fetchedEvents = await Events.events(params);

      setEvents(fetchedEvents);
    } catch (e) {
      console.error(e);
    }
  }, [loggedUser, currentDate]);

  useEffect(() => {
    if (loggedUser?._id) fetchInterventions();
  }, [loggedUser, fetchInterventions]);

  return (
    <ScrollView style={styles.screen}>
      <Text style={commonStyle.title}>Horodatage</Text>
      <View style={styles.container}>
        <View>
          <Text style={styles.date}>{capitalizeFirstLetter(formatDate(currentDate))}</Text>
          <Text style={styles.time}>{formatTime(currentDate)}</Text>
        </View>
        <View style={styles.viewIntervention}>
          <Text style={styles.textIntervention}>{events.length} {formatWordToPlural(events, 'intervention')}</Text>
        </View>
      </View>
      {events.map(event => renderEvent(event))}
    </ScrollView>
  );
};

export default TimeStampingProfile;
