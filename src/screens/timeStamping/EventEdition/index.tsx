import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationType } from '../../../types/NavigationType';
import styles from './styles';

interface EventEditionProps {
  route: { params: { event: any } },
  navigation: NavigationType,
}

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const { event } = route.params;
  console.log('event', event);
  // const [startTime, setStartTime] = useState<Date>(new Date());

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
      </View>
    </View>
  );
};

export default EventEdition;
