import pick from 'lodash/pick';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { View, ScrollView, Text, BackHandler, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import EventHistories from '../../../api/EventHistories';
import Events from '../../../api/Events';
import Users from '../../../api/Users';
import { formatAuxiliary } from '../../../core/helpers/auxiliaries';
import CompaniDate from '../../../core/helpers/dates/companiDates';
import {
  EVENT_TRANSPORT_OPTIONS,
  FLOAT_REGEX,
  INTERNAL_HOUR,
  INTERVENTION,
  NUMBER,
  TIMESTAMPING_ACTION_TYPE_LIST,
  SET_HISTORIES,
  SET_DATES,
  SET_TIME,
  SET_FIELD,
} from '../../../core/data/constants';
import ConfirmationModal from '../../../components/modals/ConfirmationModal';
import EventDateTimeEdition from '../../../components/EventDateTimeEdition';
import NiHeader from '../../../components/Header';
import NiPersonSelect from '../../../components/PersonSelect';
import EventFieldEdition from '../../../components/EventFieldEdition';
import ErrorMessage from '../../../components/ErrorMessage';
import NiSelect from '../../../components/Select';
import CancelledEventInfos from '../../../components/CancelledEventInfos';
import { COPPER, COPPER_GREY, WHITE } from '../../../styles/colors';
import { ICON, KEYBOARD_PADDING_TOP } from '../../../styles/metrics';
import styles from './styles';
import { EventHistoryType } from '../../../types/EventType';
import { UserType, FormattedUserType } from '../../../types/UserType';
import { EditedEventValidType, EventEditionActionType, EventEditionStateType, EventEditionType } from './types';
import InternalHours from '../../../api/InternalHours';
import { NavigationType } from '../../../types/NavigationType';

type InternalHourOptionsType = {
  label: string,
  value: string,
};

type subHeaderType = {
  text: string,
  bgColor: string,
  textColor: string,
}

const formatZipCodeAndCity = (event: EventEditionStateType) => {
  const zipCode = get(event, 'customer.contact.primaryAddress.zipCode') || get(event, 'address.zipCode') || '';
  const city = get(event, 'customer.contact.primaryAddress.city') || get(event, 'address.city') || '';

  return `${zipCode} ${city}`;
};

const formatAddress = (event: EventEditionStateType) => (
  get(event, 'customer.contact.primaryAddress.street') || get(event, 'address.street') || ''
);

const isTimeStampHistory = (eh: EventHistoryType) =>
  TIMESTAMPING_ACTION_TYPE_LIST.includes(eh.action) && !eh.isCancelled;

const isEditable = (ev: EventEditionStateType) => !ev.startDateTimeStamp && !ev.endDateTimeStamp && !ev.isBilled;

interface EventEditionProps {
  route: { params: { event: EventEditionType } },
  navigation: NavigationType,
}

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const { event } = route.params;
  const [initialState, setInitialState] = useState<EventEditionStateType>({
    histories: [],
    ...event,
    ...(event.internalHour && { internalHour: event.internalHour?._id }),
    startDate: CompaniDate(event.startDate).toISO(),
    endDate: CompaniDate(event.endDate).toISO(),
    start: false,
    transportMode: event.transportMode ||
      event.auxiliary?.administrative?.transportInvoice?.transportType ||
      '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [activeAuxiliaries, setActiveAuxiliaries] = useState<FormattedUserType[]>([]);
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
  const [internalHourOptions, setInternalHourOptions] = useState<InternalHourOptionsType[]>([]);
  const [subHeader, setSubHeader] = useState<subHeaderType>({ text: '', bgColor: WHITE, textColor: WHITE });

  const reducer = (state: EventEditionStateType, action: EventEditionActionType): EventEditionStateType => {
    const changeEndHourOnStartHourChange = () => {
      if (event.endDateTimeStamp) return state.endDate;

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
      const pickedFields = ['startDate', 'endDate', 'auxiliary._id', 'misc', 'transportMode', 'internalHour'];
      if (editedEvent.kmDuringEvent) pickedFields.push('kmDuringEvent');
      return isEqual(pick(editedEvent, pickedFields), pick(initialState, pickedFields))
        ? navigation.goBack()
        : setExitModal(true);
    },
    [editedEvent, initialState, navigation]
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
        const pickedFields = pick(
          editedEvent,
          ['startDate', 'endDate', 'misc', 'transportMode', 'internalHour', 'isCancelled']
        );
        const payload = {
          auxiliary: editedEvent.auxiliary._id,
          kmDuringEvent: Number.parseFloat(editedEvent.kmDuringEvent) || 0,
          ...pickedFields,
        };

        await Events.updateById(editedEvent._id, payload);
        setInitialState(editedEvent);
        navigation.goBack();
      }
    } catch (e) {
      console.error(e);
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

  const selectTransportMode = (value: string) => {
    editedEventDispatch({ type: SET_FIELD, payload: { transportMode: value } });
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

  const onSelectPerson = (aux: UserType) => {
    editedEventDispatch({ type: SET_FIELD, payload: { auxiliary: aux } });
    editedEventDispatch({
      type: SET_FIELD,
      payload: { transportMode: aux.administrative?.transportInvoice?.transportType },
    });
  };

  const getInternalHours = useCallback(async () => {
    try {
      const internalHours = await InternalHours.list();
      const formattedInternalHours = internalHours.map(ih => ({ label: ih.name, value: ih._id }));

      setInternalHourOptions(formattedInternalHours);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => { getInternalHours(); }, [getInternalHours]);

  const selectInternalHourType = (value: string) => {
    editedEventDispatch({
      type: SET_FIELD,
      payload: { internalHour: value, title: internalHourOptions.find(opt => opt.value === value)?.label },
    });
  };

  useEffect(() => {
    let payload;
    if (editedEvent.isBilled) {
      payload = { bgColor: COPPER[400], textColor: WHITE };
      if (editedEvent.isCancelled) {
        payload = { ...payload, text: 'Intervention annulée et facturée' };
      } else {
        payload = { ...payload, text: 'Intervention facturée' };
      }
    } else if (editedEvent.isCancelled) {
      payload = { text: 'Intervention annulée', bgColor: COPPER_GREY[200], textColor: COPPER_GREY[700] };
    }

    if (payload) setSubHeader(payload);
  }, [editedEvent.isBilled, editedEvent.isCancelled]);

  return (
    <>
      <NiHeader onPressIcon={onLeave} title={headerTitle} loading={loading} onPressButton={onSave}
        disabled={editedEvent.isBilled} />
      {(editedEvent.isBilled || editedEvent.isCancelled) &&
        <Text style={[styles.billedHeader, { backgroundColor: subHeader.bgColor, color: subHeader.textColor }]}>
          {subHeader.text}
        </Text>}
      <KeyboardAwareScrollView extraScrollHeight={KEYBOARD_PADDING_TOP} enableOnAndroid style={styles.screen}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.name}>{editedEvent.title}</Text>
            {editedEvent.type === INTERVENTION &&
              <TouchableOpacity style={styles.customerProfileButton} disabled={loading}
                onPress={() => goToCustomerProfile(editedEvent.customer._id)}>
                <Text style={styles.customerProfileButtonTitle}>Fiche bénéficiaire</Text>
                <Feather name="chevron-right" color={COPPER[500]}/>
              </TouchableOpacity>}
            {editedEvent.address && <View style={styles.addressContainer}>
              <Feather name="map-pin" size={ICON.SM} color={COPPER_GREY[500]} />
              <View>
                <Text style={styles.addressText}>{formatAddress(editedEvent)}</Text>
                <Text style={styles.addressText}>{formatZipCodeAndCity(editedEvent)}</Text>
              </View>
            </View>}
            <EventDateTimeEdition event={editedEvent} eventEditionDispatch={editedEventDispatch}
              refreshHistories={refreshHistories} loading={loading} dateErrorMessage={dateErrorMessage || ''}
              style={styles.date} />
            {editedEvent.type === INTERVENTION &&
            <>
              <NiPersonSelect title={'Intervenant'} person={formatAuxiliary(editedEvent.auxiliary)}
                personOptions={activeAuxiliaries} onSelectPerson={onSelectPerson} isEditable={isAuxiliaryEditable}
                errorMessage={'Vous ne pouvez pas modifier l\'intervenant d\'une intervention horodatée ou facturée.'}
                modalPlaceHolder="Chercher un intervenant" />
              <NiSelect selectedItem={editedEvent.transportMode} caption="Transport pour aller à l&apos;intervention"
                options={EVENT_TRANSPORT_OPTIONS} onItemSelect={selectTransportMode} title="transport"
                disabled={editedEvent.isBilled} />
              <EventFieldEdition text={editedEvent.kmDuringEvent ? editedEvent.kmDuringEvent.toString() : ''}
                disabled={!!editedEvent.isBilled} inputTitle={'Déplacement véhiculé avec bénéficiaire'} type={NUMBER}
                buttonTitle="Ajouter un déplacement véhiculé avec bénéficiaire" onChangeText={onChangeKmDuringEvent}
                buttonIcon={<MaterialCommunityIcons name='truck-outline' size={24} color={COPPER[600]} suffix={'km'} />}
                errorMessage={kmDuringEventErrorMessage || ''} />
            </>}
            {editedEvent.type === INTERNAL_HOUR &&
              <NiSelect caption="Type d’heure interne" options={internalHourOptions}
                onItemSelect={selectInternalHourType} selectedItem={editedEvent.internalHour} title="Heure interne" />}
            <EventFieldEdition text={editedEvent.misc} inputTitle="Note" disabled={!!editedEvent.isBilled}
              buttonTitle="Ajouter une note" multiline
              onChangeText={(value: string) => editedEventDispatch({ type: SET_FIELD, payload: { misc: value || '' } })}
              buttonIcon={<MaterialIcons name={'playlist-add'} size={24} color={COPPER[600]} />} />
          </View>
          {editedEvent.isCancelled && <CancelledEventInfos event={editedEvent} />}
          <ConfirmationModal onPressConfirmButton={onConfirmExit} onPressCancelButton={() => setExitModal(false)}
            visible={exitModal} contentText="Voulez-vous supprimer les modifications apportées à cet événement ?"
            cancelText="Poursuivre les modifications" confirmText="Supprimer" />
          <ErrorMessage message={apiErrorMessage || ''} />
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EventEdition;
