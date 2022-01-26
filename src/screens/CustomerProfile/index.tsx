import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import FeatherButton from '../../components/FeatherButton';
import { ICON } from '../../styles/metrics';
import { COPPER } from '../../styles/colors';
import styles from './style';

const CustomerProfile = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.screen}>
      <FeatherButton name="arrow-left" onPress={() => navigation.goBack()} size={ICON.SM} color={COPPER[500]} />
    </ScrollView>
  );
};

export default CustomerProfile;
