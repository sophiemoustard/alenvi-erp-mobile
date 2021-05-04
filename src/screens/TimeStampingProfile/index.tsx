import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import commonStyle from '../../styles/common';
import Events from '../../api/Events';
import { Context as AuthContext } from '../../context/AuthContext';
import styles from './style';

const TimeStampingProfile = () => {
  const currentDate = new Date();

  const [customerLastName, setCustomerLastName] = useState<string>('');
  const [customerFirstName, setCustomerFirstName] = useState<string>('');
  const [eventStartDate, setEventStartDate] = useState<Date>(new Date());
  const [eventEndDate, setEventEndDate] = useState<Date>(new Date());

  const { loggedUser } = useContext(AuthContext);

  const formatDate = (date: Date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  const formatTime = (date: Date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('fr-FR', options);
  };

  const eventData = async (): Promise<any> => {
    let events = [];
    try {
      // if (loggedUser?._id) {
      const params = {
        // auxiliaryId: loggedUser._id,
        auxiliary: '5947d1aeff6c27ce07405655',
        //startDate: new Date(currentDate.getFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()),
        startDate: new Date(2021, 4, 6),
        //endDate: new Date(currentDate.getTime() + 86400000),
        endDate: new Date(2021, 4, 7),
      };
      events = await Events.events(params);
      console.log('events', events);
      setCustomerLastName(events[1].customer.identity.lastname);
      setCustomerFirstName(events[1].customer.identity.firstname);

      const start = new Date(events[1].startDate);
      const end = new Date(events[1].endDate);
      setEventStartDate(start);
      setEventEndDate(end);
//}
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    eventData();
  });

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.view}>
        <Text style={[commonStyle.title, styles.title]} > Horodatage </Text>
        <Text style={styles.date}>{formatDate(currentDate)}</Text>
        <Text style={styles.time}>{formatTime(currentDate)}</Text>
      </View>
      <View style={styles.cellEvent}>
        <Text style={styles.cellText}>{customerFirstName} {customerLastName}</Text>
        <View style={styles.sectionDelimiter} />
        <View>
          <Text style={styles.eventTimeText}>Debut</Text>
          <Text style={styles.scheduledEvent}>
            {eventStartDate.getHours()}:{eventStartDate.getMinutes()}
          </Text>
        </View>
        <View style={styles.sectionDelimiter} />
        <View>
          <Text style={styles.eventTimeText}>Fin</Text>
          <Text style={styles.scheduledEvent}>
            {eventEndDate.getHours()}:{eventEndDate.getMinutes()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TimeStampingProfile;
