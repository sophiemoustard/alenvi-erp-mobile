import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MONTHS } from '../../core/data/constants';
import { formatTime } from '../../core/helpers/dates';
import { capitalizeFirstLetter } from '../../core/helpers/utils';
import { COPPER_GREY } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import styles from './styles';

interface EventDateTimeDetailsProps {
  date: Date,
  isTimeStamped?: boolean,
  isBilled?: boolean,
  onPressDate: () => void,
  onPressTime: () => void,
}

const EventDateTimeDetails = ({
  date,
  isTimeStamped = false,
  isBilled = false,
  onPressDate,
  onPressTime,
}: EventDateTimeDetailsProps) => {
  const formattedDate = new Date(date);
  const displayedDate = `${formattedDate.getDate()} ${capitalizeFirstLetter(MONTHS[formattedDate.getMonth()])}`;
  const displayedTime = formatTime(formattedDate);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateCell} onPress={onPressDate} disabled={isTimeStamped || isBilled}>
        <Text style={styles.text}>{displayedDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.timeCell} onPress={onPressTime} disabled={isTimeStamped || isBilled}>
        <Text style={styles.text}>{displayedTime}</Text>
      </TouchableOpacity>
      { !!isTimeStamped && <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Feather name='check' size={ICON.XS} color={COPPER_GREY[500]} />
        </View>
      </View> }
    </View>
  );
};

export default EventDateTimeDetails;
