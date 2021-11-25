import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, ScrollView, Text, BackHandler, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Events from '../../../api/Events';
import { DATE, IOS } from '../../../core/data/constants';
import { addTime, changeDate, dateDiff, formatDate, getEndOfDay, isBefore } from '../../../core/helpers/dates';
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

export type ModeType = 'date' | 'time';

interface EventEditionProps {
  route: { params: { event: EventType } },
  navigation: NavigationType,
}

export interface EventEditionStateType {
  startDate: Date,
  endDate: Date,
  start: boolean,
}

export interface EventEditionActionType {
  type: string,
  payload?: { date?: Date, mode?: ModeType, start?: boolean },
}

export const SWITCH_PICKER = 'switchPicker';
export const HIDE_PICKER = 'hidePicker';
export const SET_DATES = 'setDates';
export const SET_TIME = 'setTime';
export const SET_START = 'setStart';

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const { event } = route.params;
  const initialState: EventEditionStateType = {
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    start: false,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [exitModal, setExitModal] = useState<boolean>(false);

  const reducer = (state: EventEditionStateType, action: EventEditionActionType): EventEditionStateType => {
    const changeEndHourOnStartHourChange = () => {
      if (event.endDateTimeStamp) return state.endDate;
      if (isBefore(action.payload?.date || state.startDate, state.endDate)) return state.endDate;

      const newDate = addTime(action.payload?.date || state.startDate, dateDiff(event.endDate, event.startDate));
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const onLeave = useCallback(() => (
    (state.startDate === initialState.startDate && state.endDate === initialState.endDate)
      ? navigation.goBack()
      : setExitModal(true)),
  [initialState.endDate, initialState.startDate, state.endDate, state.startDate, navigation]);

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

      if (isBefore(state.endDate, state.startDate)) {
        setErrorMessage('La date de début est postérieure à la date de fin.');
        return;
      }

      await Events.updateById(
        event._id,
        { auxiliary: event.auxiliary._id, startDate: state.startDate, endDate: state.endDate }
      );
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

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <FeatherButton style={styles.arrow} name="arrow-left" onPress={onLeave} color={COPPER[400]}
          size={ICON.SM} />
        <Text style={styles.text}>{formatDate(event.startDate, true)}</Text>
        {!((event.startDateTimeStamp && event.endDateTimeStamp) || event.isBilled) && <NiPrimaryButton onPress={onSave}
          title="Enregistrer" loading={loading} titleStyle={styles.buttonTitle} style={styles.button} />}
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.name}>
          {`${event.customer?.identity?.firstname} ${event.customer?.identity?.lastname}`}
        </Text>
        <View style={styles.addressContainer}>
          <Feather name="map-pin" size={ICON.SM} color={COPPER_GREY[500]} />
          <View>
            <Text style={styles.addressText}>{`${event?.customer?.contact?.primaryAddress?.street}`}</Text>
            <Text style={styles.addressText}>
              {`${event?.customer?.contact?.primaryAddress?.zipCode} ${event?.customer?.contact?.primaryAddress?.city}`}
            </Text>
          </View>
        </View>
        <EventDateTimeEdition event={event} eventEditionState={state} eventEditionDispatch={dispatch} />
        <ExitModal onPressConfirmButton={onConfirmExit} onPressCancelButton={() => setExitModal(false)}
          visible={exitModal} contentText="Voulez-vous supprimer les modifications apportées à cet événement ?"
          cancelText="Poursuivre les modifications" confirmText="Supprimer" />
        {!!errorMessage && <NiErrorMessage message={errorMessage} />}
      </ScrollView>
    </View>
  );
};

export default EventEdition;
