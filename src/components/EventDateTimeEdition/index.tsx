import React, { useReducer, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import EventHistories from '../../api/EventHistories';
import { DATE, isIOS, TIME, TIMESTAMPING_ACTION_TYPE_LIST } from '../../core/data/constants';
import EventDateTime from '../EventDateTime';
import WarningBanner from '../WarningBanner';
import NiInput from '../form/Input';
import ConfirmationModal from '../modals/ConfirmationModal';
import { EventEditionActionType, EventEditionStateType } from '../../screens/timeStamping/EventEdition/types';
import { SET_DATES, SET_START, SET_TIME } from '../../screens/timeStamping/EventEdition';
import { EventHistoryType } from '../../types/EventType';
import { ModeType } from '../../types/DateTimeType';
import styles from './styles';

interface EventDateTimeEditionProps {
  event: EventEditionStateType,
  eventEditionDispatch: (action: EventEditionActionType) => void,
  refreshHistories: () => void,
  loading: boolean,
}

interface StateType {
  mode: ModeType,
  displayStartPicker: boolean,
  displayEndPicker: boolean,
}

interface ActionType {
  type: string,
  payload?: { mode: ModeType, startPickerSelected: boolean },
}

const initialState: StateType = {
  mode: DATE,
  displayStartPicker: false,
  displayEndPicker: false,
};

const SWITCH_PICKER = 'switchPicker';
const HIDE_PICKER = 'hidePicker';

const reducer = (state: StateType, action: ActionType): StateType => {
  const isSamePayload = state.displayStartPicker === !!action.payload?.startPickerSelected &&
    state.displayEndPicker === !action.payload?.startPickerSelected && state.mode === action.payload?.mode;

  switch (action.type) {
    case SWITCH_PICKER:
      if (isIOS && isSamePayload) return { ...state, displayStartPicker: false, displayEndPicker: false };

      return {
        ...state,
        displayStartPicker: !!action.payload?.startPickerSelected,
        displayEndPicker: !action.payload?.startPickerSelected,
        mode: action.payload?.mode || DATE,
      };
    case HIDE_PICKER:
      return { ...state, displayStartPicker: false, displayEndPicker: false };
    default:
      return state;
  }
};

const START_DATE = 'startDate';
const END_DATE = 'endDate';
type CANCELLED_DATE_TYPE = typeof START_DATE | typeof END_DATE | null;

const EventDateTimeEdition = ({
  event,
  eventEditionDispatch,
  refreshHistories,
  loading,
}: EventDateTimeEditionProps) => {
  const [picker, pickerDispatch] = useReducer(reducer, initialState);
  const [maximumStartDate, setMaximumStartDate] = useState<Date | undefined>(undefined);
  const [minimumEndDate, setMinimumEndDate] = useState<Date | undefined>(undefined);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [cancellationModal, setCancellationModal] = useState<boolean>(false);
  const [reason, setReason] = useState<string>('');
  const [cancelledDate, setCancelledDate] = useState<CANCELLED_DATE_TYPE>(null);
  const [confirmationLoading, setConfirmationLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onPressPicker = async (start: boolean, mode: ModeType) => {
    if (loading) return;

    if ((start && event.startDateTimeStamp) || (!start && event.endDateTimeStamp)) {
      setConfirmationModal(true);
      setErrorMessage('');
      setReason('');
      setCancelledDate(start ? START_DATE : END_DATE);

      return;
    }

    if ((event.startDateTimeStamp || event.endDateTimeStamp) && mode === DATE) return;

    eventEditionDispatch({ type: SET_START, payload: { start } });
    pickerDispatch({ type: SWITCH_PICKER, payload: { startPickerSelected: start, mode } });
  };

  useEffect(
    () => {
      if (picker.mode === TIME && event.endDateTimeStamp) setMaximumStartDate(event.endDate);
      else setMaximumStartDate(undefined);
    },
    [event.endDate, event.endDateTimeStamp, picker.mode]
  );

  useEffect(
    () => {
      if (picker.mode === TIME) setMinimumEndDate(event.startDate);
      else setMinimumEndDate(undefined);
    },
    [event.startDate, event.endDateTimeStamp, picker.mode]
  );

  const onChangePicker = (pickerEvent: any, newDate: Date | undefined) => {
    if (!newDate) return;

    if (picker.mode === DATE) eventEditionDispatch({ type: SET_DATES, payload: { date: newDate } });

    if (picker.mode === TIME) eventEditionDispatch({ type: SET_TIME, payload: { date: newDate } });

    if (!isIOS) pickerDispatch({ type: HIDE_PICKER });
  };

  const openCancellationModal = () => {
    setConfirmationModal(false);
    setCancellationModal(true);
  };

  const cancelTimeStamp = async () => {
    try {
      setErrorMessage('');
      setConfirmationLoading(true);

      if (!reason) return setErrorMessage('Veuillez remplir un motif.');

      const eventHistory = event.histories && event.histories
        .filter((eh: EventHistoryType) => TIMESTAMPING_ACTION_TYPE_LIST.includes(eh.action) && !eh.isCancelled)
        .find((eh: EventHistoryType) => (cancelledDate === START_DATE ? !!eh.update.startHour : !!eh.update.endHour));

      if (!eventHistory) return setErrorMessage('Une erreur s\'est produite, veuillez réessayer ultérieurement.');

      await EventHistories.updateById(eventHistory._id, { isCancelled: true, timeStampCancellationReason: reason });

      setCancellationModal(false);

      return refreshHistories();
    } catch (e) {
      console.error(e);
      return setErrorMessage('Une erreur s\'est produite, veuillez réessayer ultérieurement.');
    } finally {
      setConfirmationLoading(false);
    }
  };

  const handleCancelButton = () => {
    if (loading) return;
    setCancellationModal(false);
  };

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Début</Text>
        <EventDateTime isTimeStamped={event.startDateTimeStamp} date={event.startDate} loading={loading}
          disabled={event.isBilled} onPress={(mode: ModeType) => onPressPicker(true, mode)} />
        {picker.displayStartPicker && <DateTimePicker value={event.startDate} mode={picker.mode} is24Hour locale="fr-FR"
          display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker} maximumDate={maximumStartDate} />}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Fin</Text>
        <EventDateTime isTimeStamped={event.endDateTimeStamp} date={event.endDate} loading={loading}
          disabled={event.isBilled} onPress={(mode: ModeType) => onPressPicker(false, mode)} />
        {picker.displayEndPicker && <DateTimePicker value={event.endDate} mode={picker.mode} is24Hour locale="fr-FR"
          display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker} minimumDate={minimumEndDate} />}
      </View>
      <ConfirmationModal visible={confirmationModal} title="Cet évènement a déjà été horodaté" exitButton
        cancelText="Retour" confirmText="Annuler l'horodatage" onPressConfirmButton={openCancellationModal}
        onRequestClose={() => setConfirmationModal(false)} onPressCancelButton={() => setConfirmationModal(false)}>
        <WarningBanner text="Pour modifier l’horaire, vous devez annuler l’horodatage existant.
          Cette action est irréversible." />
      </ConfirmationModal>
      <ConfirmationModal visible={cancellationModal} title="Motif d'annulation" cancelText="Retour" exitButton
        confirmText="Confirmer" contentText="Veuillez préciser pourquoi vous annulez l'horodatage."
        onPressConfirmButton={cancelTimeStamp} onRequestClose={handleCancelButton} loading={confirmationLoading}
        onPressCancelButton={handleCancelButton}>
        <NiInput caption="Motif" value={reason} onChangeText={setReason} validationMessage={errorMessage}
          validationStyle={styles.errorMessage} />
      </ConfirmationModal>
    </>
  );
};

export default EventDateTimeEdition;
