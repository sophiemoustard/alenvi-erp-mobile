import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, ScrollView, AppState, AppStateStatus } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import commonStyle from '../../../styles/common';
import Events from '../../../api/Events';
import { Context as AuthContext } from '../../../context/AuthContext';
import { ACTIVE_STATE, INTERVENTION } from '../../../core/data/constants';
import { formatWordToPlural, ascendingSortArray } from '../../../core/helpers/utils';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import TimeStampingCell from '../../../components/TimeStampingCell';
import { EventType } from '../../../types/EventType';
import styles from './styles';

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
        try {
          if (!loggedUser || !loggedUser._id) return;
          const params = {
            auxiliary: loggedUser._id,
            startDate: CompaniDate().startOf('day').toDate(),
            endDate: CompaniDate().endOf('day').toDate(),
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
          <Text style={styles.date}>{CompaniDate(displayedDate).format('cccc dd LLLL')}</Text>
          <Text style={styles.time}>{CompaniDate(displayedDate).format('HH:mm')}</Text>
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
