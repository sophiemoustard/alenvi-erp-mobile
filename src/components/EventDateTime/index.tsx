import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DATE, TIME } from '../../core/data/constants';
import CompaniDate from '../../core/helpers/dates/companiDates';
import { COPPER_GREY } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import { ModeType } from '../../types/DateTimeType';
import styles from './styles';

interface EventDateTimeProps {
  date: string,
  onPress: (mode: ModeType) => void,
  loading: boolean,
  isTimeStamped?: boolean,
  disabled?: boolean,
}

const EventDateTime = ({ date, onPress, loading, isTimeStamped = false, disabled = false }: EventDateTimeProps) => {
  const [displayedDate, setDisplayedDate] = useState<string>('');
  const [displayedTime, setDisplayedTime] = useState<string>('');

  useEffect(() => {
    setDisplayedDate(CompaniDate(date).format('dd cccc'));
    setDisplayedTime(CompaniDate(date).format('HH:mm'));
  }, [date]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateCell} onPress={() => onPress(DATE)} disabled={disabled}>
        <Text style={styles.text}>{displayedDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.timeCell} onPress={() => onPress(TIME)} disabled={disabled}>
        <Text style={styles.text}>{displayedTime}</Text>
      </TouchableOpacity>
      {isTimeStamped && <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Feather name='check' size={ICON.XS} color={COPPER_GREY[500]} />
        </View>
      </View>}
      {loading && !isTimeStamped && <ActivityIndicator style={styles.icon} size="small" color={COPPER_GREY[300]} />}
    </View>
  );
};

export default EventDateTime;
