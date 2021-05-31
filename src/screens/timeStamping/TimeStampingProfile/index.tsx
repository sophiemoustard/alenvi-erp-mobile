import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, ScrollView, AppState, AppStateStatus } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import commonStyle from '../../../styles/common';
import Events from '../../../api/Events';
import { Context as AuthContext } from '../../../context/AuthContext';
import { ACTIVE_STATE, INTERVENTION } from '../../../core/data/constants';
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
  const [displayedDate, setDisplayedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventType[]>([]);
  const [isAppBackgrounded, setIsAppBackgrounded] = useState<boolean>(false);
  const { loggedUser } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => { setDisplayedDate(new Date()); }, 60000);

    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      let appState = AppState.currentState;

      const handleBackground = (nextAppState: AppStateStatus) => {
        if ((appState === 'background' || appState === 'inactive') && nextAppState === ACTIVE_STATE) {
          setIsAppBackgrounded(true);
        }
        appState = nextAppState;
      };

      handleBackground(ACTIVE_STATE);

      const fetchInterventions = async () => {
        const today = new Date();
        try {
          if (!loggedUser || !loggedUser._id) return;
          const params = {
            auxiliary: loggedUser._id,
            startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0),
            endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999),
            type: INTERVENTION,
          };
          const fetchedEvents = await Events.events(params);

          if (isActive || isAppBackgrounded) setEvents(fetchedEvents);
        } catch (e) {
          console.error(e);
        }
      };

      fetchInterventions();

      return () => {
        isActive = false;
        setIsAppBackgrounded(false);
      };
    }, [loggedUser, isAppBackgrounded])
  );

  return (
    <ScrollView style={styles.screen} testID="TimeStampingProfile">
      <Text style={commonStyle.title}>Horodatage</Text>
      <View style={styles.container}>
        <View>
          <Text style={styles.date}>{capitalizeFirstLetter(formatDate(displayedDate))}</Text>
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
