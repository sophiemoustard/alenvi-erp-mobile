import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DATE, MONTHS, TIME } from '../../core/data/constants';
import { formatTime } from '../../core/helpers/dates';
import { capitalizeFirstLetter } from '../../core/helpers/utils';
import { ModeType } from '../../screens/timeStamping/EventEdition';
import { COPPER_GREY } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import styles from './styles';

interface EventDateTimeProps {
  date: Date,
  onPress: (mode: ModeType) => void,
  isTimeStamped?: boolean,
  dateDisabled?: boolean,
  timeDisabled?: boolean,
}

const EventDateTime = ({
  date,
  onPress,
  isTimeStamped = false,
  dateDisabled = false,
  timeDisabled = false,
}: EventDateTimeProps) => {
  const [displayedDate, setDisplayedDate] = useState<string>('');
  const [displayedTime, setDisplayedTime] = useState<string>('');

  useEffect(() => {
    const formattedDate = new Date(date);
    setDisplayedDate(`${formattedDate.getDate()} ${capitalizeFirstLetter(MONTHS[formattedDate.getMonth()] || '')}`);
    setDisplayedTime(formatTime(formattedDate));
  }, [date]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateCell} onPress={() => onPress(DATE)} disabled={dateDisabled}>
        <Text style={styles.text}>{displayedDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.timeCell} onPress={() => onPress(TIME)} disabled={timeDisabled}>
        <Text style={styles.text}>{displayedTime}</Text>
      </TouchableOpacity>
      {isTimeStamped && <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Feather name='check' size={ICON.XS} color={COPPER_GREY[500]} />
        </View>
      </View>}
    </View>
  );
};

export default EventDateTime;
