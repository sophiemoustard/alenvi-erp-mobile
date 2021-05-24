import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { formatTime } from '../../core/helpers/dates';
import { CIVILITY_OPTIONS, MANUAL_TIME_STAMPING } from '../../core/data/constants';
import styles from './styles';
import { EventType, EventHistoryType } from '../../types/EventType';
import NiPrimaryButton from '../form/PrimaryButton';
import { GREEN } from '../../styles/colors';
import { ICON } from '../../styles/metrics';

interface TimeStampingProps {
  event: EventType,
}

const TimeStampingCell = ({ event }: TimeStampingProps) => {
  const [civility, setCivility] = useState<string>('M');
  const [lastName, setLastName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date|null>(null);
  const [endDate, setEndDate] = useState<Date|null>(null);
  const [startTimeStamped, setStartTimeStamped] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (event) {
      setCivility(event.customer?.identity?.title || '');
      setLastName(event.customer?.identity?.lastname || '');
      setEndDate(new Date(event.endDate));
      setStartDate(new Date(event.startDate));
    }
  }, [setCivility, setLastName, setEndDate, setStartDate, event]);

  const goToManualTimeStamping = (eventStart: boolean) => {
    navigation.navigate(
      'ManualTimeStamping',
      { event: { _id: event._id, customer: { identity: event.customer.identity } }, eventStart }
    );
  };

  useEffect(() => {
    if (event.histories) {
      setStartTimeStamped(
        event.histories.some(
          (history: EventHistoryType) => history.action === MANUAL_TIME_STAMPING && !!history.update.startHour
        )
      );
    }
  }, [event.histories]);

  return (
    <View style={styles.cell}>
      <Text style={styles.title}>{CIVILITY_OPTIONS[civility]} {lastName.toUpperCase()}</Text>
      <View style={styles.sectionDelimiter} />
      <View style={styles.container}>
        <View>
          <Text style={styles.timeTitle}>Début</Text>
          {!!startDate && <Text style={styles.scheduledTime}>{formatTime(startDate)}</Text>}
        </View>
        {!startTimeStamped &&
          <NiPrimaryButton title='Commencer' onPress={() => goToManualTimeStamping(true)} style={styles.button} />}
        {startTimeStamped &&
          <View style= {styles.timeStampingContainer}>
            <View style= {styles.iconContainer}>
              <Ionicons name='ios-checkmark-circle' size={ICON.MD} color={GREEN[600]} style={styles.icon} />
            </View>
            <Text style={styles.timeStamping}>Horodaté</Text>
          </View>}
      </View>
      <View style={styles.sectionDelimiter} />
      <View style={styles.container}>
        <View>
          <Text style={styles.timeTitle}>Fin</Text>
          {!!endDate && <Text style={styles.scheduledTime}>{formatTime(endDate)}</Text>}
        </View>
        <View>
          <NiPrimaryButton title='Terminer' onPress={() => goToManualTimeStamping(false)} style={styles.button} />
        </View>
      </View>
    </View>
  );
};

export default TimeStampingCell;
