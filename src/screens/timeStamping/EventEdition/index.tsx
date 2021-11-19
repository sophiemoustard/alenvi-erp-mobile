import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, ScrollView, Text, BackHandler, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather } from '@expo/vector-icons';
import Events from '../../../api/Events';
import { DATE, IOS, TIME } from '../../../core/data/constants';
import { addTime, changeDate, dateDiff, formatDate, getEndOfDay } from '../../../core/helpers/dates';
import EventDateTime from '../../../components/EventDateTime';
import FeatherButton from '../../../components/FeatherButton';
import NiErrorMessage from '../../../components/ErrorMessage';
import ExitModal from '../../../components/modals/ExitModal';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import styles from './styles';
import { COPPER, COPPER_GREY } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { EventType } from '../../../types/EventType';
import { NavigationType } from '../../../types/NavigationType';

export type ModeType = 'date' | 'time';

interface EventEditionProps {
  route: { params: { event: EventType } },
  navigation: NavigationType,
}

interface StateType {
  startDate: Date,
  endDate: Date,
  mode: ModeType,
  displayStartPicker: boolean,
  displayEndPicker: boolean,
  start: boolean,
}

interface ActionType {
  type: string,
  payload?: { date?: Date, mode?: ModeType, start?: boolean },
}

const SWITCH_PICKER = 'switchPicker';
const HIDE_PICKER = 'hidePicker';
const SET_DATES = 'setDates';
const SET_TIME = 'setTime';

const EventEdition = ({ route, navigation }: EventEditionProps) => {
  const { event } = route.params;
  const initialState: StateType = {
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    mode: DATE,
    displayStartPicker: false,
    displayEndPicker: false,
    start: false,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [exitModal, setExitModal] = useState<boolean>(false);
  const isIOS = Platform.OS === IOS;
  const dateDisabled = event.startDateTimeStamp || event.endDateTimeStamp || event.isBilled;

  const reducer = (state: StateType, action: ActionType): StateType => {
    const changeEndHourOnStartHourChange = () => {
      if (event.endDateTimeStamp) return state.endDate;

      const newDate = addTime(action.payload?.date || state.startDate, dateDiff(state.endDate, state.startDate));
      return newDate.getDate() !== state.endDate.getDate() ? getEndOfDay(state.endDate) : newDate;
    };

    switch (action.type) {
      case SWITCH_PICKER:
        if (state.displayStartPicker === !!action.payload?.start && state.displayEndPicker === !action.payload?.start &&
          state.mode === action.payload?.mode) return { ...state, displayStartPicker: false, displayEndPicker: false };

        return {
          ...state,
          displayStartPicker: !!action.payload?.start,
          displayEndPicker: !action.payload?.start,
          mode: action.payload?.mode || DATE,
          start: !!action.payload?.start,
        };
      case HIDE_PICKER:
        return { ...state, displayStartPicker: false, displayEndPicker: false };
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

  const onPressPicker = (start: boolean, mode: ModeType) => dispatch({ type: SWITCH_PICKER, payload: { start, mode } });

  const onChangePicker = (pickerEvent: any, newDate: Date | undefined) => {
    if (state.mode === DATE) dispatch({ type: SET_DATES, payload: { date: newDate } });

    if (state.mode === TIME) dispatch({ type: SET_TIME, payload: { date: newDate } });

    if (!isIOS) dispatch({ type: HIDE_PICKER });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <FeatherButton style={styles.arrow} name='arrow-left' onPress={onLeave} color={COPPER[400]}
          size={ICON.SM} />
        <Text style={styles.text}>{formatDate(event.startDate, true)}</Text>
        {!((event.startDateTimeStamp && event.endDateTimeStamp) || event.isBilled) && <NiPrimaryButton onPress={onSave}
          title='Enregistrer' loading={loading} titleStyle={styles.buttonTitle} style={styles.button} />}
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.name}>
          {`${event.customer?.identity?.firstname} ${event.customer?.identity?.lastname}`}
        </Text>
        <View style={styles.addressContainer}>
          <Feather name='map-pin' size={ICON.SM} color={COPPER_GREY[500]} />
          <View>
            <Text style={styles.addressText}>{`${event?.customer?.contact?.primaryAddress?.street}`}</Text>
            <Text style={styles.addressText}>
              {`${event?.customer?.contact?.primaryAddress?.zipCode} ${event?.customer?.contact?.primaryAddress?.city}`}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Début</Text>
          <EventDateTime isTimeStamped={event.startDateTimeStamp} date={state.startDate} dateDisabled={dateDisabled}
            onPress={(mode: ModeType) => onPressPicker(true, mode)}
            timeDisabled={event.startDateTimeStamp || event.isBilled} />
          {state.displayStartPicker && <DateTimePicker value={state.startDate} mode={state.mode}
            is24Hour locale="fr-FR" display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker}
            maximumDate={(state.mode === TIME && event.endDateTimeStamp) ? state.endDate : undefined} />}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Fin</Text>
          <EventDateTime isTimeStamped={event.endDateTimeStamp} onPress={(mode: ModeType) => onPressPicker(false, mode)}
            date={state.endDate} dateDisabled={dateDisabled}
            timeDisabled={event.endDateTimeStamp || event.isBilled} />
          {state.displayEndPicker && <DateTimePicker value={state.endDate} mode={state.mode} is24Hour
            display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker} locale="fr-FR"
            minimumDate={state.mode === TIME ? state.startDate : undefined} />}
        </View>
        <ExitModal onPressConfirmButton={onConfirmExit} onPressCancelButton={() => setExitModal(false)}
          visible={exitModal} contentText={'Supprimer les modifications apportées à cet événement ?'} />
        {!!errorMessage && <NiErrorMessage message={errorMessage} />}
      </ScrollView>
    </View>
  );
};

export default EventEdition;
