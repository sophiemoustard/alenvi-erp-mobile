import pick from 'lodash/pick';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { View, ScrollView, Text, BackHandler, KeyboardAvoidingView } from 'react-native';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import EventHistories from '../../../api/EventHistories';
import Events from '../../../api/Events';
import Users from '../../../api/Users';
import { addTime, changeDate, dateDiff, formatDate, getEndOfDay, isBefore, isAfter } from '../../../core/helpers/dates';
import { formatIdentity } from '../../../core/helpers/utils';
import FeatherButton from '../../../components/FeatherButton';
import NiErrorMessage from '../../../components/ErrorMessage';
import ConfirmationModal from '../../../components/modals/ConfirmationModal';
import EventDateTimeEdition from '../../../components/EventDateTimeEdition';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import EventAuxiliaryEdition from '../../../components/EventAuxiliaryEdition';
import { COPPER, COPPER_GREY } from '../../../styles/colors';
import { ICON, KEYBOARD_AVOIDING_VIEW_BEHAVIOR, MARGIN } from '../../../styles/metrics';
import styles from './styles';
import { EventHistoryType, EventType } from '../../../types/EventType';
import { UserType } from '../../../types/UserType';
import { EventEditionActionType, EventEditionProps, EventEditionStateType, FormattedAuxiliaryType } from './types';
import { NUMBER, TIMESTAMPING_ACTION_TYPE_LIST } from '../../../core/data/constants';
import EventFieldEdition from '../../../components/EventFieldEdition';

export const SET_HISTORIES = 'setHistories';
export const SET_DATES = 'setDates';
export const SET_TIME = 'setTime';
export const SET_FIELD = 'setField';

const formatAuxiliary = (auxiliary: UserType): FormattedAuxiliaryType => ({
  _id: auxiliary._id,
  ...pick(auxiliary, ['picture', 'contracts', 'identity']),
  formattedIdentity: formatIdentity(auxiliary.identity, 'FL'),
});

const formatZipCodeAndCity = (intervention: EventType) => {
  const zipCode = get(intervention, 'customer.contact.primaryAddress.zipCode') || '';
  const city = get(intervention, 'customer.contact.primaryAddress.city') || '';

  return `${zipCode} ${city}`;
};

const isTimeStampHistory = (eh: EventHistoryType) =>
  TIMESTAMPING_ACTION_TYPE_LIST.includes(eh.action) && !eh.isCancelled;

const isEditable = (ev: EventType) => !ev.startDateTimeStamp && !ev.endDateTimeStamp && !ev.isBilled;

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const initialState: EventEditionStateType = useMemo(() => ({
    histories: [],
    ...route.params.event,
    startDate: new Date(route.params.event.startDate),
    endDate: new Date(route.params.event.endDate),
    start: false,
  }), [route.params.event]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [activeAuxiliaries, setActiveAuxiliaries] = useState<FormattedAuxiliaryType[]>([]);
  const [isAuxiliaryEditable, setIsAuxiliaryEditable] = useState<boolean>(isEditable(initialState));

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

    const timeStampHistories: EventHistoryType[] = action.payload?.histories?.filter(isTimeStampHistory) || [];

    switch (action.type) {
      case SET_HISTORIES:
        return {
          ...state,
          histories: action.payload?.histories || [],
          startDateTimeStamp: timeStampHistories.some((eh: EventHistoryType) => !!eh.update.startHour),
          endDateTimeStamp: timeStampHistories.some((eh: EventHistoryType) => !!eh.update.endHour),
        };
      case SET_DATES:
        return {
          ...state,
          startDate: changeDate(state.startDate, action.payload?.date || state.startDate),
          endDate: changeDate(state.endDate, action.payload?.date || state.endDate),
        };
      case SET_TIME:
        return {
          ...state,
          ...(state.start && {
            startDate: action.payload?.date || state.startDate,
            endDate: changeEndHourOnStartHourChange(),
          }),
          ...(!state.start && { endDate: action.payload?.date || state.endDate }),
        };
      case SET_FIELD:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  const [event, eventDispatch] = useReducer(reducer, initialState);

  const onLeave = useCallback(
    () => {
      const pickFields = ['startDate', 'endDate', 'auxiliary._id', 'misc', 'kmDuringEvent'];
      return isEqual(pick(event, pickFields), pick(initialState, pickFields))
        ? navigation.goBack()
        : setExitModal(true);
    },
    [initialState, event, navigation]
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

      const pickedFields = pick(event, ['startDate', 'endDate', 'misc']);
      await Events.updateById(
        event._id,
        {
          auxiliary: event.auxiliary._id,
          kmDuringEvent: Number.parseFloat(event.kmDuringEvent) || 0,
          ...pickedFields,
        }
      );
      navigation.goBack();
    } catch (e) {
      if (e.response.status === 409) setErrorMessage(e.response.data.message);
      else if (e.response.status === 422) setErrorMessage('Cette modification n\'est pas autorisée.');
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
          .some(c => isBefore(c.startDate, event.endDate) && (!c.endDate || isAfter(c.endDate, event.startDate))))
        .map((aux: UserType) => (formatAuxiliary(aux)));

      setActiveAuxiliaries(filteredAuxiliaries);
    } catch (e) {
      console.error(e);
    }
  }, [event.endDate, event.startDate]);

  const onChangeKmDuringEvent = (value: string) => (
    eventDispatch({ type: SET_FIELD, payload: { kmDuringEvent: value.replace(',', '.') || '' } })
  );

  useEffect(() => { getActiveAuxiliaries(event.company); }, [event.company, getActiveAuxiliaries]);

  const refreshHistories = useCallback(async () => {
    setLoading(true);
    const eventHistories = await EventHistories.list({ eventId: event._id });
    eventDispatch({ type: SET_HISTORIES, payload: { histories: eventHistories } });
    setLoading(false);
  }, [event._id]);

  useEffect(() => { refreshHistories(); }, [refreshHistories]);
  useEffect(() => {
    setErrorMessage('');
    setIsAuxiliaryEditable(isEditable(event));
  }, [event]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <FeatherButton style={styles.arrow} name="arrow-left" onPress={onLeave} color={COPPER[400]}
          size={ICON.SM} />
        <Text style={styles.text}>{formatDate(event.startDate, true)}</Text>
        {!((event.startDateTimeStamp && event.endDateTimeStamp) || event.isBilled) &&
          <NiPrimaryButton onPress={onSave} title="Enregistrer" loading={loading} titleStyle={styles.buttonTitle}
            style={styles.button} />}
      </View>
      {event.isBilled && <Text style={styles.billedHeader}>Intervention facturée</Text> }
      <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={MARGIN.XL}>
        <ScrollView style={styles.container}>
          <Text style={styles.name}>{formatIdentity(event.customer.identity, 'FL')}</Text>
          <View style={styles.addressContainer}>
            <Feather name="map-pin" size={ICON.SM} color={COPPER_GREY[500]} />
            <View>
              <Text style={styles.addressText}>{`${event?.customer?.contact?.primaryAddress?.street}`}</Text>
              <Text style={styles.addressText}>{formatZipCodeAndCity(event)}</Text>
            </View>
          </View>
          <EventDateTimeEdition event={event} eventEditionDispatch={eventDispatch} refreshHistories={refreshHistories}
            loading={loading} />
          <EventAuxiliaryEdition auxiliary={event.auxiliary} auxiliaryOptions={activeAuxiliaries}
            eventEditionDispatch={eventDispatch} isEditable={isAuxiliaryEditable} />
          <ConfirmationModal onPressConfirmButton={onConfirmExit} onPressCancelButton={() => setExitModal(false)}
            visible={exitModal} contentText="Voulez-vous supprimer les modifications apportées à cet événement ?"
            cancelText="Poursuivre les modifications" confirmText="Supprimer" />
          {!!errorMessage && <NiErrorMessage message={errorMessage} />}
          <EventFieldEdition text={event.misc} inputTitle="Note" disabled={!!event.isBilled}
            buttonTitle="Ajouter une note"
            buttonIcon={<MaterialIcons name={'playlist-add'} size={24} color={COPPER[600]} />}
            onChangeText={(value: string) => eventDispatch({ type: SET_FIELD, payload: { misc: value || '' } })} />
          <EventFieldEdition text={event.kmDuringEvent ? event.kmDuringEvent.toString() : ''} suffix={'km'}
            disabled={!!event.isBilled} inputTitle={'Déplacement véhiculé avec le/la bénéficiaire'} type={NUMBER}
            buttonTitle="Ajouter un déplacement véhiculé avec le/la bénéficiaire" onChangeText={onChangeKmDuringEvent}
            buttonIcon={<MaterialCommunityIcons name='truck-outline' size={24} color={COPPER[600]} />} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EventEdition;
