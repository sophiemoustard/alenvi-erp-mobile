import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { isEqual, pick } from 'lodash';
import Customers from '../../api/Customers';
import { UserType } from '../../types/UserType';
import { formatIdentity } from '../../core/helpers/utils';
import NiHeader from '../../components/Header';
import NiInput from '../../components/form/Input';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import styles from './style';

type CustomerProfileProp = {
  route: { params: { customerId: string } },
};

const CustomerProfile = ({ route }: CustomerProfileProp) => {
  const navigation = useNavigation();
  const { customerId } = route.params;
  const [customer, setCustomer] = useState<UserType | null>(null);
  const [editedFollowUp, setEditedFollowUp] = useState<UserType['followUp']>({ environment: '' });
  const [exitModal, setExitModal] = useState<boolean>(false);

  const getCustomer = useCallback(async () => {
    try {
      const currentCustomer = await Customers.getById(customerId);
      setCustomer(currentCustomer);
      setEditedFollowUp({ environment: customer?.followUp.environment || '' });
    } catch (e) {
      console.error(e);
    }
  }, [customer?.followUp.environment, customerId]);

  useEffect(() => { getCustomer(); }, [getCustomer]);

  const onLeave = () => {
    if (isEqual(pick(editedFollowUp, ['environment']), pick(customer?.followUp, ['environment']))) navigation.goBack();
    else setExitModal(true);
  };

  const onConfirmExit = () => {
    setExitModal(false);
    navigation.goBack();
  };

  const onSave = async () => {
    try {
      await Customers.updateById(customerId, { followUp: editedFollowUp });
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <NiHeader onPressIcon={onLeave} buttonTitle="Enregistrer" onPressButton={onSave} />
      <ScrollView style={styles.screen}>
        <Text style={styles.identity}>{formatIdentity(customer?.identity, 'FL')}</Text>
        <NiInput style={styles.input} caption="Environnement" value={editedFollowUp.environment} multiline
          onChangeText={(value: string) => { setEditedFollowUp({ ...editedFollowUp, environment: value }); } }/>
        <ConfirmationModal onPressConfirmButton={onConfirmExit} onPressCancelButton={() => setExitModal(false)}
          visible={exitModal} contentText="Voulez-vous supprimer les modifications apportées ?"
          cancelText="Poursuivre les modifications" confirmText="Supprimer" />
      </ScrollView>
    </>
  );
};

export default CustomerProfile;
