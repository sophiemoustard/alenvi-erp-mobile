import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import commonStyle from '../../styles/common';
import Events from '../../api/Events';
import { Context as AuthContext } from '../../context/AuthContext';
import { INTERVENTION } from '../../core/data/constants';
import { formatTime, formatDate, capitalizeFirstLetter, formatWordToPlural } from '../../core/helpers/utils';
import TimeStampingCell from '../../components/TimeStampingCell';
import styles from './styles';
import { EventType } from '../../types/EventType';

const TimeStampingProfile = () => {
  const [currentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventType[]>([]);

  const { loggedUser } = useContext(AuthContext);

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

  const renderEvent = (event: EventType) => <TimeStampingCell event={event} />;

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <ScrollView style={styles.screen}>
      <Text style={[commonStyle.title, styles.title]}>Horodatage</Text>
      <View style={styles.container}>
        <View style={styles.viewDate}>
          <Text style={styles.date}>{capitalizeFirstLetter(formatDate(currentDate))}</Text>
          <Text style={styles.time}>{formatTime(currentDate)}</Text>
        </View>
        <View style={styles.viewIntervention}>
          <Text style={styles.textIntervention}>{events.length} {formatWordToPlural(events, 'intervention')}</Text>
        </View>
      </View>
      <FlatList data={events} keyExtractor={event => event._id} renderItem={({ item }) => renderEvent(item)}
        ItemSeparatorComponent={renderSeparator} />
    </ScrollView>
  );
};

export default TimeStampingProfile;
