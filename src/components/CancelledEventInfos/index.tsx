import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useReducer, useState } from 'react';
import { Text, View } from 'react-native';
import Events from '../../api/Events';
import { CANCELLATION_REASONS, INVOICED_AND_NOT_PAID, INVOICED_AND_PAID } from '../../core/data/constants';
import { errorReducer, initialErrorState, SET_ERROR } from '../../reducers/error';
import { EventEditionStateType } from '../../screens/timeStamping/EventEdition/types';
import { COPPER_GREY } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import { MaterialCommunityIconsType } from '../../types/IconType';
import NiButton from '../form/SecondaryButton';
import NiError from '../ErrorMessage';
import ConfirmationModal from '../modals/ConfirmationModal';
import styles from './styles';

interface CancelledEventInfosProps {
  event: EventEditionStateType
}

const CancelledEventInfos = ({ event } : CancelledEventInfosProps) => {
  const [invoicedIcon, setInvoicedIcon] = useState<MaterialCommunityIconsType>('close');
  const [paidIcon, setPaidIcon] = useState<MaterialCommunityIconsType>('close');
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [confirmationLoading, setConfirmationLoading] = useState<boolean>(false);
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);
  const navigation = useNavigation();

  useEffect(() => {
    if (event?.cancel?.condition === INVOICED_AND_PAID) {
      setInvoicedIcon('check');
      setPaidIcon('check');
    } else if (event?.cancel?.condition === INVOICED_AND_NOT_PAID) setInvoicedIcon('check');
  }, [event?.cancel?.condition]);

  const cancelCancellation = async () => {
    try {
      setConfirmationLoading(true);

      await Events.updateById(
        event._id,
        { startDate: event.startDate, endDate: event.endDate, isCancelled: false, auxiliary: event.auxiliary._id }
      );
      navigation.goBack();
    } catch (e) {
      console.error(e);
      dispatchError({ type: SET_ERROR, payload: 'Une erreur s\'est produite, veuillez réessayer ultérieurement.' });
    } finally {
      setConfirmationLoading(false);
      setConfirmationModal(false);
    }
  };

  return (
    <>
      <View style={styles.separator} />
      <View style={styles.container}>
        <Text style={styles.section}>Conditions d&apos;annulation</Text>
        <Text style={styles.subsection}>Personne à l&apos;origine de l&apos;annulation</Text>
        <Text style={styles.infos}>{CANCELLATION_REASONS.find(opt => opt.value === event?.cancel?.reason)?.label}</Text>
        <Text style={styles.subsection}>Conditions de facturation</Text>
        <View style={styles.details}>
          <Text style={styles.infos}>Facturé au client</Text>
          <View style={styles.dashedLine}/>
          <MaterialCommunityIcons name={invoicedIcon} color={COPPER_GREY[900]} size={ICON.XS}/>
        </View>
        <View style={styles.details}>
          <Text style={styles.infos}>Payé à l&apos;auxiliaire</Text>
          <View style={styles.dashedLine}/>
          <MaterialCommunityIcons name={paidIcon} color={COPPER_GREY[900]} size={ICON.XS}/>
        </View>
      </View>
      {!event.isBilled && <>
        <View style={styles.separator} />
        <View style={styles.container}>
          <NiButton title="Rétablir l&apos;intervention" style={styles.button} textStyle={styles.textButton}
            onPress={() => setConfirmationModal(true)}/>
          {!!error && <NiError message={error.message} />}
          <ConfirmationModal visible={confirmationModal} title="Confirmation" cancelText="Annuler" exitButton
            confirmText="Rétablir l'intervention" contentText="Êtes vous sûr(e) de vouloir rétablir l'intervention ?"
            onPressConfirmButton={cancelCancellation} onRequestClose={() => setConfirmationModal(false)}
            loading={confirmationLoading} onPressCancelButton={() => setConfirmationModal(false)} />
        </View>
      </>}
    </>
  );
};

export default CancelledEventInfos;
