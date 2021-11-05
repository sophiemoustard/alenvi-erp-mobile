import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { formatTime, formatDate } from '../../../core/helpers/dates';
import FeatherButton from '../../../components/FeatherButton';
import { NavigationType } from '../../../types/NavigationType';
import styles from './styles';
import { COPPER, WHITE } from '../../../styles/colors';
import commonStyle from '../../../styles/common';
import { ICON } from '../../../styles/metrics';

interface EventEditionProps {
  route: { params: { event: any } },
  navigation: NavigationType,
}

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const { event } = route.params;
  console.log('event', event);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <FeatherButton style={styles.arrow} name='arrow-left' onPress={() => console.log('skusku')} color={COPPER[400]}
          size={ICON.SM} />
        <Text style={styles.text}>{formatDate(event.startDate, true)}</Text>
        <TouchableOpacity style={styles.button} onPress={() => console.log('sku')}>
          {!loading && <Text style={styles.textButton}>Enregistrer</Text>}
          {loading && <ActivityIndicator style={commonStyle.disabled} color={WHITE} size="small" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventEdition;
