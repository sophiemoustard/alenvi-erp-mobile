import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, ScrollView, AppState, AppStateStatus } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import commonStyle from '../../../styles/common';
import Events from '../../../api/Events';
import { Context as AuthContext } from '../../../context/AuthContext';
import { ACTIVE_STATE, INTERVENTION } from '../../../core/data/constants';
import { formatWordToPlural } from '../../../core/helpers/utils';
import { formatTime, formatDate, ascendingSortArray } from '../../../core/helpers/nativeDates';
import TimeStampingCell from '../../../components/TimeStampingCell';
import styles from './styles';
import { EventType } from '../../../types/EventType';
import CompaniDate from '../../../core/helpers/dates/CompaniDates';

const renderEvent = (event: EventType) => (
  <View key={event._id}>
    <TimeStampingCell event={event} />
    <View style={styles.separator} />
  </View>
);

const TimeStampingProfile = () => {
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventType[]>([]);
  const [isAppFocused, setIsAppFocused] = useState<boolean>(true);
  const { loggedUser } = useContext(AuthContext);

  const handleBackground = useCallback((nextAppState: AppStateStatus) => {
    if (nextAppState === ACTIVE_STATE) setIsAppFocused(true);
    else setIsAppFocused(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => { setDisplayedDate(new Date()); }, 60000);
    AppState.addEventListener('change', handleBackground);

    return () => {
      clearInterval(interval);
      AppState.removeEventListener('change', handleBackground);
    };
  }, [handleBackground]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchInterventions = async () => {
        const today = new Date();
        try {
          if (!loggedUser || !loggedUser._id) return;
          const params = {
            auxiliary: loggedUser._id,
            startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0),
            endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999),
            type: INTERVENTION,
            isCancelled: false,
          };
          const fetchedEvents = await Events.list(params);

          if (isActive) setEvents(ascendingSortArray(fetchedEvents, 'startDate'));
        } catch (e) {
          console.error(e);
        }
      };

      if (isAppFocused) fetchInterventions();

      return () => { isActive = false; };
    }, [loggedUser, isAppFocused])
  );

  return (
    <ScrollView style={styles.screen} testID="TimeStampingProfile">
      <Text style={commonStyle.title}>Horodatage</Text>
      <View style={styles.container}>
        <View>
          <Text>{CompaniDate().format('dd/LL/yyyy')}</Text>
          <Text style={styles.date}>{formatDate(displayedDate)}</Text>
          <Text style={styles.time}>{formatTime(displayedDate)}</Text>
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
