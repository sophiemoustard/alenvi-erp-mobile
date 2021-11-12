import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DATE, MONTHS, TIME } from '../../core/data/constants';
import { formatTime } from '../../core/helpers/dates';
import { capitalizeFirstLetter } from '../../core/helpers/utils';
import { ModeType } from '../../screens/timeStamping/EventEdition';
import { COPPER_GREY } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import styles from './styles';

interface EventDateTimeDetailsProps {
  date: Date,
  isTimeStamped?: boolean,
  isBilled?: boolean,
  onPress: (mode: ModeType) => void,
}

const EventDateTimeDetails = ({
  date,
  isTimeStamped = false,
  isBilled = false,
  onPress,
}: EventDateTimeDetailsProps) => {
  const formattedDate = new Date(date);
  const displayedDate = `${formattedDate.getDate()} ${capitalizeFirstLetter(MONTHS[formattedDate.getMonth()])}`;
  const displayedTime = formatTime(formattedDate);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateCell} onPress={() => onPress(DATE)} disabled={isTimeStamped || isBilled}>
        <Text style={styles.text}>{displayedDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.timeCell} onPress={() => onPress(TIME)} disabled={isTimeStamped || isBilled}>
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
