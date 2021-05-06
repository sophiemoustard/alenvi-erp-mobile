import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import commonStyle from '../../styles/common';
import Events from '../../api/Events';
import { Context as AuthContext } from '../../context/AuthContext';
import { INTERVENTION } from '../../core/data/constants';
import { formatTime, formatDate, capitalizeFirstLetter } from '../../core/helpers/utils';
import styles from './style';
import TimeStampingCell from '../../components/TimeStampingCell';

const TimeStampingProfile = () => {
  const currentDate = new Date();
  const [events, setEvents] = useState<any[]>([]);
  const [eventsNumber, setEventsNumber] = useState<number>(0);
  const [intervention, setIntervention] = useState<string>('intervention');

  const { loggedUser } = useContext(AuthContext);

  const fetchInterventions = async () => {
    try {
      if (!loggedUser || !loggedUser._id) return;
      const params = {
        auxiliary: loggedUser._id,
        startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
        type: INTERVENTION,
      };
      const fetchedEvents = await Events.events(params);

      setEventsNumber(fetchedEvents.length);
      setEvents(fetchedEvents);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInterventions();
    if (eventsNumber > 1) setIntervention('interventions');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderEvent = (event: any[]) => <TimeStampingCell event={event}/>;
  const renderSeparator = () => <View style={styles.renderSeparator}></View>;

  return (
    <ScrollView style={styles.screen}>
      <Text style={[commonStyle.title, styles.title]}>Horodatage </Text>
      <View style={styles.container}>
        <View style={styles.viewDate}>
          <Text style={styles.date}>{capitalizeFirstLetter(formatDate(currentDate))}</Text>
          <Text style={styles.time}>{formatTime(currentDate)}</Text>
        </View>
        <View style={styles.viewIntervention}>
          <Text style={styles.textIntervention}>{eventsNumber} {intervention}</Text>
        </View>
      </View>
      <FlatList data={events} keyExtractor={event => event._id} renderItem={({ item }) => renderEvent(item)}
        ItemSeparatorComponent={renderSeparator}/>
    </ScrollView>
  );
};

export default TimeStampingProfile;
