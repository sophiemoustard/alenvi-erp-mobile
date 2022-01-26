import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import FeatherButton from '../../components/FeatherButton';
import { ICON } from '../../styles/metrics';
import { COPPER } from '../../styles/colors';
import Customers from '../../api/Customers';
import { UserType } from '../../types/UserType';
import { formatIdentity } from '../../core/helpers/utils';
import styles from './style';

type CustomerProfileProp = {
  route: { params: { customerId: string } },
};

const CustomerProfile = ({ route }: CustomerProfileProp) => {
  const navigation = useNavigation();
  const { customerId } = route.params;
  const [customer, setCustomer] = useState<UserType | null>(null);

  const getCustomer = useCallback(async () => {
    try {
      const currentCustomer = await Customers.getById(customerId);
      setCustomer(currentCustomer);
    } catch (e) {
      console.error(e);
    }
  }, [customerId]);

  useEffect(() => { getCustomer(); }, [getCustomer]);

  const onLeave = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <FeatherButton name="arrow-left" onPress={onLeave} size={ICON.SM} color={COPPER[500]} />
      </View>
      <Text style={styles.identity}>{formatIdentity(customer?.identity, 'FL')}</Text>
    </ScrollView>
  );
};

export default CustomerProfile;
