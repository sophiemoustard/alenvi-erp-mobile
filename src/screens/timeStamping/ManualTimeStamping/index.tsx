import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { displayMinutes } from '../../../core/helpers/dates';
import styles from './styles';

const ManualTimeStamping = () => {
  const [currentTime] = useState<Date>(new Date());
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Début de l'intervention</Text>
      <View >
        <View style={styles.container}>
          <View style={styles.view}>
            <Text style={styles.subtitle}>Bénéficiaire</Text>
            <Text>Name</Text>
          </View>
          <View style={styles.sectionDelimiter} />
          <View style={styles.view}>
            <Text style={styles.subtitle}>Heure horodatée</Text>
            <Text style={styles.time}>{currentTime.getHours()}:{displayMinutes(currentTime)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ManualTimeStamping;
