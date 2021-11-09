import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { formatDate } from '../../../core/helpers/dates';
import FeatherButton from '../../../components/FeatherButton';
import { NavigationType } from '../../../types/NavigationType';
import styles from './styles';
import { COPPER } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { EventType } from '../../../types/EventType';

interface EventEditionProps {
  route: { params: { event: EventType } },
  navigation: NavigationType,
}

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const { event } = route.params;

  const goBack = useCallback(() => { navigation.goBack(); }, [navigation]);

  const hardwareBackPress = useCallback(() => {
    goBack();
    return true;
  }, [goBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <FeatherButton style={styles.arrow} name='arrow-left' onPress={goBack} color={COPPER[400]}
          size={ICON.SM} />
        <Text style={styles.text}>{formatDate(event.startDate, true)}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.textButton}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.name}>
          {`${event.customer?.identity?.firstname} ${event.customer?.identity?.lastname}`}
        </Text>
      </View>
    </View>
  );
};

export default EventEdition;
