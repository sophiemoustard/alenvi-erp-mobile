import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEqual, pick } from 'lodash';
import Customers from '../../api/Customers';
import { CustomerType } from '../../types/UserType';
import { formatIdentity } from '../../core/helpers/utils';
import NiHeader from '../../components/Header';
import NiInput from '../../components/form/Input';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import ErrorMessage from '../../components/ErrorMessage';
import { KEYBOARD_PADDING_TOP } from '../../styles/metrics';
import styles from './style';
import { COPPER } from '../../styles/colors';

type CustomerProfileProp = {
  route: { params: { customerId: string } },
};

const CustomerProfile = ({ route }: CustomerProfileProp) => {
  const navigation = useNavigation();
  const { customerId } = route.params;
  const customer = {
    _id: '',
    identity: { firstname: '', lastname: '' },
    followUp: { environment: '', objectives: '' },
  };
  const [initialCustomer, setInitialCustomer] = useState<CustomerType>(customer);
  const [editedCustomer, setEditedCustomer] = useState<CustomerType>(customer);
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const getCustomer = useCallback(async () => {
    try {
      setLoading(true);
      const currentCustomer = await Customers.getById(customerId);
      setInitialCustomer(currentCustomer);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => { getCustomer(); }, [getCustomer]);

  useEffect(() => { setEditedCustomer(initialCustomer); }, [initialCustomer]);

  const onLeave = () => {
    const pickedFields = ['environment', 'objectives'];
    if (isEqual(pick(editedCustomer?.followUp, pickedFields), pick(initialCustomer?.followUp, pickedFields))) {
      navigation.goBack();
    } else setExitModal(true);
  };

  const onConfirmExit = () => {
    setExitModal(false);
    navigation.goBack();
  };

  const onSave = async () => {
    try {
      setLoading(true);
      const payload = { followUp: editedCustomer?.followUp || { environment: '', objectives: '' } };

      await Customers.updateById(customerId, payload);
      setInitialCustomer(editedCustomer);
    } catch (e) {
      console.error(e);
      setApiErrorMessage('Une erreur s\'est produite, si le problème persiste, contactez le support technique.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setApiErrorMessage(''), [setApiErrorMessage, editedCustomer]);

  const onChangeFollowUpText = (key: string) => (text: string) => {
    setEditedCustomer({ ...editedCustomer, followUp: { ...editedCustomer.followUp, [key]: text } });
  };

  return (
    <>
      <NiHeader onPressIcon={onLeave} onPressButton={onSave} loading={loading} />
      <KeyboardAwareScrollView extraScrollHeight={KEYBOARD_PADDING_TOP} enableOnAndroid>
        {loading && <ActivityIndicator style={styles.loader} size="small" color={COPPER[500]} />}
        {!loading &&
          <ScrollView contentContainerStyle={styles.screen}>
            <Text style={styles.identity}>{formatIdentity(initialCustomer?.identity, 'FL')}</Text>
            <View style={styles.separator}></View>
            <Text style={styles.sectionText}>Infos pratiques</Text>
            <View style={styles.separator}></View>
            <Text style={styles.sectionText}>Accompagnement</Text>
            <NiInput style={styles.input} caption="Environnement" value={editedCustomer?.followUp?.environment}
              multiline onChangeText={onChangeFollowUpText('environment')}
              placeholder="Précisez l'environnement de l'accompagnement : entourage de la personne, famille, voisinage,
                histoire de vie, contexte actuel..." />
            <NiInput style={styles.input} caption="Objectifs" value={editedCustomer?.followUp?.objectives}
              multiline onChangeText={onChangeFollowUpText('objectives')} placeholder="Précisez les objectifs
                de l'accompagnement : lever, toilette, préparation des repas, courses, déplacement véhiculé..." />
            <ConfirmationModal onPressConfirmButton={onConfirmExit} onPressCancelButton={() => setExitModal(false)}
              visible={exitModal} contentText="Voulez-vous supprimer les modifications apportées ?"
              cancelText="Poursuivre les modifications" confirmText="Supprimer" />
            <ErrorMessage message={apiErrorMessage || ''} />
          </ScrollView>}
      </KeyboardAwareScrollView>
    </>
  );
};

export default CustomerProfile;
