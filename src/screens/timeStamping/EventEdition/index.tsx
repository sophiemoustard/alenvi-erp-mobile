import pick from 'lodash.pick';
import get from 'lodash.get';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, ScrollView, Text, BackHandler } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Events from '../../../api/Events';
import { addTime, changeDate, dateDiff, formatDate, getEndOfDay, isBefore, isAfter } from '../../../core/helpers/dates';
import { formatIdentity } from '../../../core/helpers/utils';
import FeatherButton from '../../../components/FeatherButton';
import NiErrorMessage from '../../../components/ErrorMessage';
import ExitModal from '../../../components/modals/ExitModal';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import styles from './styles';
import { COPPER, COPPER_GREY } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { EventType } from '../../../types/EventType';
import { NavigationType } from '../../../types/NavigationType';
import EventDateTimeEdition from '../../../components/EventDateTimeEdition';
import Users from '../../../api/Users';
import { UserType } from '../../../types/UserType';
import EventAuxiliaryEdition from '../../../components/EventAuxiliaryEdition';

export type ModeType = 'date' | 'time';

interface EventEditionProps {
  route: { params: { event: EventType } },
  navigation: NavigationType,
}

export type AuxiliaryType = {
  _id: string,
  identity: { firstname: string; lastname: string; },
  picture?: { link: string; },
  contracts: [{ _id: string, startDate: Date, endDate?: Date }],
}

export type EventEditionStateType = EventType & { start: boolean };

export interface EventEditionActionType {
  type: string,
  payload?: { date?: Date, mode?: ModeType, start?: boolean },
}

export const SET_DATES = 'setDates';
export const SET_TIME = 'setTime';
export const SET_START = 'setStart';

const formatAuxiliary = (auxiliary: UserType) => ({
  _id: auxiliary._id,
  identity: { ...pick(auxiliary.identity, ['firstname', 'lastname']) },
  picture: auxiliary?.picture,
  contracts: auxiliary.contracts,
});

const formatZipCodeAndCity = (intervention: EventType) => {
  const zipCode = get(intervention, 'customer.contact.primaryAddress.zipCode') || '';
  const city = get(intervention, 'customer.contact.primaryAddress.city') || '';

  return `${zipCode} ${city}`;
};

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const initialState: EventEditionStateType = { ...route.params.event, start: false };
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [activeAuxiliaries, setActiveAuxiliaries] = useState<AuxiliaryType[]>([]);

  const reducer = (state: EventEditionStateType, action: EventEditionActionType): EventEditionStateType => {
    const changeEndHourOnStartHourChange = () => {
      if (route.params.event.endDateTimeStamp) return state.endDate;
      if (isBefore(action.payload?.date || state.startDate, state.endDate)) return state.endDate;

      const newDate = addTime(
        action.payload?.date || state.startDate,
        dateDiff(initialState.endDate, initialState.startDate)
      );
      const newDateIsAfterMidnight = newDate.getDate() !== state.endDate.getDate();
      return newDateIsAfterMidnight ? getEndOfDay(state.endDate) : newDate;
    };

    switch (action.type) {
      case SET_DATES:
        return {
          ...state,
          startDate: changeDate(state.startDate, action.payload?.date || state.startDate),
          endDate: changeDate(state.endDate, action.payload?.date || state.endDate),
        };
      case SET_TIME:
        return {
          ...state,
          ...(state.start && { startDate: action.payload?.date, endDate: changeEndHourOnStartHourChange() }),
          ...(!state.start && { endDate: action.payload?.date }),
        };
      case SET_START:
        return { ...state, start: action.payload?.start || false };
      default:
        return state;
    }
  };
  const [event, eventDispatch] = useReducer(reducer, initialState);

  const onLeave = useCallback(
    () => ((event.startDate === initialState.startDate && event.endDate === initialState.endDate)
      ? navigation.goBack()
      : setExitModal(true)),
    [initialState.endDate, initialState.startDate, event.endDate, event.startDate, navigation]
  );

  const hardwareBackPress = useCallback(() => {
    onLeave();
    return true;
  }, [onLeave]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, [hardwareBackPress]);

  const onSave = async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      if (isBefore(event.endDate, event.startDate)) {
        setErrorMessage('La date de début est postérieure à la date de fin.');
        return;
      }

      await Events.updateById(event._id, { auxiliary: event.auxiliary._id, ...pick(event, ['startDate', 'endDate']) });
      navigation.goBack();
    } catch (e) {
      if (e.response.status === 409) setErrorMessage(e.response.data.message);
      else setErrorMessage('Une erreur s\'est produite, si le problème persiste, contactez le support technique.');
    } finally {
      setLoading(false);
    }
  };

  const onConfirmExit = () => {
    setExitModal(false);
    navigation.goBack();
  };

  const getActiveAuxiliaries = useCallback(async (company: string) => {
    try {
      const auxiliaries = await Users.listWithSectorHistories({ company });
      const filteredAuxiliaries = auxiliaries
        .filter((aux: UserType) => aux.contracts && aux.contracts
          .some(c => isBefore(c.startDate, initialState.endDate) &&
            (!c.endDate || isAfter(c.endDate, initialState.startDate))))
        .map((aux: UserType) => (formatAuxiliary(aux)));

      setActiveAuxiliaries(filteredAuxiliaries);
    } catch (e) {
      console.error(e);
    }
  }, [initialState.endDate, initialState.startDate]);

  useEffect(() => { getActiveAuxiliaries(initialState.company); }, [initialState.company, getActiveAuxiliaries]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <FeatherButton style={styles.arrow} name="arrow-left" onPress={onLeave} color={COPPER[400]}
          size={ICON.SM} />
        <Text style={styles.text}>{formatDate(initialState.startDate, true)}</Text>
        {!((initialState.startDateTimeStamp && initialState.endDateTimeStamp) || initialState.isBilled) &&
          <NiPrimaryButton onPress={onSave} title="Enregistrer" loading={loading} titleStyle={styles.buttonTitle}
            style={styles.button} />}
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.name}>{formatIdentity(initialState.customer.identity, 'FL')}</Text>
        <View style={styles.addressContainer}>
          <Feather name="map-pin" size={ICON.SM} color={COPPER_GREY[500]} />
          <View>
            <Text style={styles.addressText}>{`${initialState?.customer?.contact?.primaryAddress?.street}`}</Text>
            <Text style={styles.addressText}>{formatZipCodeAndCity(initialState)}</Text>
          </View>
        </View>
        <EventDateTimeEdition initialEvent={initialState} event={event} eventEditionDispatch={eventDispatch} />
        <EventAuxiliaryEdition auxiliary={event.auxiliary} auxiliaryOptions={activeAuxiliaries} />
        <ExitModal onPressConfirmButton={onConfirmExit} onPressCancelButton={() => setExitModal(false)}
          visible={exitModal} contentText="Voulez-vous supprimer les modifications apportées à cet événement ?"
          cancelText="Poursuivre les modifications" confirmText="Supprimer" />
        {!!errorMessage && <NiErrorMessage message={errorMessage} />}
      </ScrollView>
    </View>
  );
};

export default EventEdition;
