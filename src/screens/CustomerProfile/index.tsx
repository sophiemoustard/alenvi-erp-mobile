import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import Customers from '../../api/Customers';
import { UserType } from '../../types/UserType';
import { formatIdentity } from '../../core/helpers/utils';
import NiHeader from '../../components/Header';
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

  const onLeave = () => navigation.goBack();

  return (
    <>
      <NiHeader onPressIcon={onLeave} />
      <ScrollView style={styles.screen}>
        <Text style={styles.identity}>{formatIdentity(customer?.identity, 'FL')}</Text>
      </ScrollView>
    </>
  );
};

export default CustomerProfile;
