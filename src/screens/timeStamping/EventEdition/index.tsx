import pick from 'lodash/pick';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { View, ScrollView, Text, BackHandler, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import EventHistories from '../../../api/EventHistories';
import Events from '../../../api/Events';
import Users from '../../../api/Users';
import { formatIdentity } from '../../../core/helpers/utils';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import ConfirmationModal from '../../../components/modals/ConfirmationModal';
import EventDateTimeEdition from '../../../components/EventDateTimeEdition';
import NiHeader from '../../../components/Header';
import EventAuxiliaryEdition from '../../../components/EventAuxiliaryEdition';
import { COPPER, COPPER_GREY } from '../../../styles/colors';
import { ICON, KEYBOARD_PADDING_TOP } from '../../../styles/metrics';
import styles from './styles';
import { EventHistoryType, EventType } from '../../../types/EventType';
import { UserType } from '../../../types/UserType';
import {
  EditedEventValidType,
  EventEditionActionType,
  EventEditionProps,
  EventEditionStateType,
  FormattedAuxiliaryType,
} from './types';
import {
  EVENT_TRANSPORT_OPTIONS,
  FLOAT_REGEX,
  NUMBER,
  TIMESTAMPING_ACTION_TYPE_LIST,
} from '../../../core/data/constants';
import EventFieldEdition from '../../../components/EventFieldEdition';
import ErrorMessage from '../../../components/ErrorMessage';

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
    startDate: CompaniDate(route.params.event.startDate).toISO(),
    endDate: CompaniDate(route.params.event.endDate).toISO(),
    start: false,
    transportMode: route.params.event.transportMode ||
    route.params.event.auxiliary?.administrative?.transportInvoice?.transportType ||
    '',
  }), [route.params.event]);
  const [loading, setLoading] = useState<boolean>(false);
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [activeAuxiliaries, setActiveAuxiliaries] = useState<FormattedAuxiliaryType[]>([]);
  const [isAuxiliaryEditable, setIsAuxiliaryEditable] = useState<boolean>(isEditable(initialState));
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');
  const [dateErrorMessage, setDateErrorMessage] = useState<string>('');
  const [kmDuringEventErrorMessage, setKmDuringEventErrorMessage] = useState<string>('');
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [editedEventValidations, setEditedEventValidations] = useState<EditedEventValidType>({
    dateRange: false,
    kmDuringEvent: false,
  });

  const reducer = (state: EventEditionStateType, action: EventEditionActionType): EventEditionStateType => {
    const changeEndHourOnStartHourChange = () => {
      if (route.params.event.endDateTimeStamp) return state.endDate;

      const updatedStartDate = CompaniDate(action.payload?.date || state.startDate);
      if (updatedStartDate.isBefore(state.endDate)) return state.endDate;

      const newDate = updatedStartDate.add(CompaniDate(initialState.endDate).diff(initialState.startDate, 'minutes'));
      const endOfDay = CompaniDate(state.endDate).endOf('day');
      return CompaniDate(newDate).isBefore(endOfDay) ? newDate.toISO() : endOfDay.toISO();
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
      case SET_DATES: {
        const newDateUnits = action.payload?.date
          ? CompaniDate(action.payload.date).getUnits(['year', 'month', 'day'])
          : undefined;
        return {
          ...state,
          startDate: newDateUnits ? CompaniDate(state.startDate).set(newDateUnits).toISO() : state.startDate,
          endDate: newDateUnits ? CompaniDate(state.endDate).set(newDateUnits).toISO() : state.endDate,
        };
      }
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
  const [editedEvent, editedEventDispatch] = useReducer(reducer, initialState);

  const onLeave = useCallback(
    () => {
      const pickedFields = ['startDate', 'endDate', 'auxiliary._id', 'misc', 'transportMode'];
      if (editedEvent.kmDuringEvent) pickedFields.push('kmDuringEvent');
      return isEqual(pick(editedEvent, pickedFields), pick(initialState, pickedFields))
        ? navigation.goBack()
        : setExitModal(true);
    },
    [initialState, editedEvent, navigation]
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
      setIsValidationAttempted(true);

      if (isValid) {
        const pickedFields = pick(editedEvent, ['startDate', 'endDate', 'misc', 'transportMode']);
        await Events.updateById(
          editedEvent._id,
          {
            auxiliary: editedEvent.auxiliary._id,
            kmDuringEvent: Number.parseFloat(editedEvent.kmDuringEvent) || 0,
            ...pickedFields,
          }
        );
        navigation.goBack();
      }
    } catch (e) {
      if (e.response.status === 409) setApiErrorMessage(e.response.data.message);
      else if (e.response.status === 422) setApiErrorMessage('Cette modification n\'est pas autorisée.');
      else setApiErrorMessage('Une erreur s\'est produite, si le problème persiste, contactez le support technique.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditedEventValidations({
      dateRange: CompaniDate(editedEvent.endDate).isBefore(editedEvent.startDate),
      kmDuringEvent: !!editedEvent.kmDuringEvent && !editedEvent.kmDuringEvent.toString().match(FLOAT_REGEX),
    });
  }, [editedEvent]);

  useEffect(() => {
    const { dateRange, kmDuringEvent } = editedEventValidations;
    if (dateRange || kmDuringEvent) setIsValid(false);
    else setIsValid(true);
  }, [editedEventValidations]);

  useEffect(() => {
    if (editedEventValidations.dateRange && isValidationAttempted) {
      setDateErrorMessage('Champ invalide: la date de début doit être antérieure à la date de fin.');
    } else setDateErrorMessage('');

    if (editedEventValidations.kmDuringEvent && isValidationAttempted) {
      setKmDuringEventErrorMessage('Champ invalide : veuillez saisir un nombre positif.');
    } else setKmDuringEventErrorMessage('');
  }, [editedEventValidations, isValidationAttempted]);

  const onConfirmExit = () => {
    setExitModal(false);
    navigation.goBack();
  };

  const getActiveAuxiliaries = useCallback(async (company: string) => {
    try {
      const auxiliaries = await Users.listWithSectorHistories({ company });
      const filteredAuxiliaries = auxiliaries
        .filter((aux: UserType) => aux.contracts && aux.contracts
          .some(c => CompaniDate(c.startDate).isBefore(editedEvent.endDate) &&
            (!c.endDate || CompaniDate(c.endDate).isAfter(editedEvent.startDate))))
        .map((aux: UserType) => (formatAuxiliary(aux)));

      setActiveAuxiliaries(filteredAuxiliaries);
    } catch (e) {
      console.error(e);
    }
  }, [editedEvent.endDate, editedEvent.startDate]);

  const onChangeKmDuringEvent = (value: string) => (
    editedEventDispatch({ type: SET_FIELD, payload: { kmDuringEvent: value.replace(',', '.') || '' } })
  );

  const selectTransportMode = (itemValue: string) => {
    editedEventDispatch({
      type: SET_FIELD,
      payload: { transportMode: itemValue },
    });
  };
  useEffect(() => { getActiveAuxiliaries(editedEvent.company); }, [editedEvent.company, getActiveAuxiliaries]);

  const refreshHistories = useCallback(async () => {
    setLoading(true);
    const eventHistories = await EventHistories.list({ eventId: editedEvent._id });
    editedEventDispatch({ type: SET_HISTORIES, payload: { histories: eventHistories } });
    setLoading(false);
  }, [editedEvent._id]);

  useEffect(() => { refreshHistories(); }, [refreshHistories]);

  useEffect(() => {
    setApiErrorMessage('');
    setIsAuxiliaryEditable(isEditable(editedEvent));
  }, [editedEvent]);

  const goToCustomerProfile = (id: string) => navigation.navigate('CustomerProfile', { customerId: id });

  const headerTitle = CompaniDate(editedEvent.startDate).format('cccc dd LLL');

  return (
    <>
      <NiHeader onPressIcon={onLeave} title={headerTitle} buttonTitle='Enregistrer' loading={loading}
        onPressButton={onSave}/>
      {editedEvent.isBilled && <Text style={styles.billedHeader}>Intervention facturée</Text> }
      <KeyboardAwareScrollView extraScrollHeight={KEYBOARD_PADDING_TOP} enableOnAndroid>
        <ScrollView style={styles.container}>
          <Text style={styles.name}>{formatIdentity(editedEvent.customer.identity, 'FL')}</Text>
          <TouchableOpacity style={styles.customerProfileButton} disabled={loading}
            onPress={() => goToCustomerProfile(editedEvent.customer._id)}>
            <Text style={styles.customerProfileButtonTitle}>Fiche bénéficiaire</Text>
            <Feather name="chevron-right" color={COPPER[500]}/>
          </TouchableOpacity>
          <View style={styles.addressContainer}>
            <Feather name="map-pin" size={ICON.SM} color={COPPER_GREY[500]} />
            <View>
              <Text style={styles.addressText}>{`${editedEvent?.customer?.contact?.primaryAddress?.street}`}</Text>
              <Text style={styles.addressText}>{formatZipCodeAndCity(editedEvent)}</Text>
            </View>
          </View>
          <EventDateTimeEdition event={editedEvent} eventEditionDispatch={editedEventDispatch}
            refreshHistories={refreshHistories} loading={loading} dateErrorMessage={dateErrorMessage || ''}/>
          <EventAuxiliaryEdition auxiliary={editedEvent.auxiliary} auxiliaryOptions={activeAuxiliaries}
            eventEditionDispatch={editedEventDispatch} isEditable={isAuxiliaryEditable} />
          <ConfirmationModal onPressConfirmButton={onConfirmExit} onPressCancelButton={() => setExitModal(false)}
            visible={exitModal} contentText="Voulez-vous supprimer les modifications apportées à cet événement ?"
            cancelText="Poursuivre les modifications" confirmText="Supprimer" />
          <EventFieldEdition text={editedEvent.misc} inputTitle="Note" disabled={!!editedEvent.isBilled}
            buttonTitle="Ajouter une note" multiline
            onChangeText={(value: string) => editedEventDispatch({ type: SET_FIELD, payload: { misc: value || '' } })}
            buttonIcon={<MaterialIcons name={'playlist-add'} size={24} color={COPPER[600]} />} />
          <EventFieldEdition text={editedEvent.kmDuringEvent ? editedEvent.kmDuringEvent.toString() : ''} suffix={'km'}
            disabled={!!editedEvent.isBilled} inputTitle={'Déplacement véhiculé avec bénéficiaire'} type={NUMBER}
            buttonTitle="Ajouter un déplacement véhiculé avec bénéficiaire" onChangeText={onChangeKmDuringEvent}
            buttonIcon={<MaterialCommunityIcons name='truck-outline' size={24} color={COPPER[600]} />}
            errorMessage={kmDuringEventErrorMessage || ''} />
          <Picker selectedValue={editedEvent.transportMode} onValueChange={selectTransportMode}
            itemStyle={{ fontSize: 16 }}>
            {EVENT_TRANSPORT_OPTIONS.map((option, index) => (
              <Picker.Item label={option.label} value={option.value} key={index} />
            ))}
          </Picker>
          <ErrorMessage message={apiErrorMessage || ''} />
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EventEdition;
