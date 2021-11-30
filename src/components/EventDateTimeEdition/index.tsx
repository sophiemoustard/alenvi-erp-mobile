import React, { useEffect, useReducer, useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import EventHistories from '../../api/EventHistories';
import { DATE, isIOS, TIME, TIMESTAMPING_ACTION_TYPE_LIST } from '../../core/data/constants';
import EventDateTime from '../EventDateTime';
import WarningBanner from '../WarningBanner';
import ConfirmationModal from '../modals/ConfirmationModal';
import { EventEditionActionType, EventEditionStateType } from '../../screens/timeStamping/EventEdition/types';
import { SET_DATES, SET_START, SET_TIME } from '../../screens/timeStamping/EventEdition';
import { EventHistoryType, EventType } from '../../types/EventType';
import { ModeType } from '../../types/DateTimeType';
import styles from './styles';

interface EventDateTimeEditionProps {
  initialEvent: EventType,
  event: EventEditionStateType,
  eventEditionDispatch: (action: EventEditionActionType) => void,
  disabled?: boolean,
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

const EventDateTimeEdition = ({ initialEvent, event, eventEditionDispatch }: EventDateTimeEditionProps) => {
  const dateDisabled = initialEvent.startDateTimeStamp || initialEvent.endDateTimeStamp || initialEvent.isBilled;
  const [picker, pickerDispatch] = useReducer(reducer, initialState);
  const [maximumStartDate, setMaximumStartDate] = useState<Date | undefined>(undefined);
  const [minimumEndDate, setMinimumEndDate] = useState<Date | undefined>(undefined);
  const [eventHistories, setEventHistories] = useState<Array<EventHistoryType>>([]);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventHistories = async () => {
      try {
        const fetchedEventHistories = await EventHistories.list(
          { eventId: event._id, action: TIMESTAMPING_ACTION_TYPE_LIST, isCancelled: false }
        );
        setEventHistories(fetchedEventHistories);
      } catch (e) {
        console.error(e);
      }
    };

    fetchEventHistories();
  });

  const onPressPicker = async (start: boolean, mode: ModeType) => {
    if ((start && event.startDateTimeStamp) || (!start && event.endDateTimeStamp)) {
      setConfirmationModal(true);
    } else {
      eventEditionDispatch({ type: SET_START, payload: { start } });
      pickerDispatch({ type: SWITCH_PICKER, payload: { startPickerSelected: start, mode } });
    }
  };

  useEffect(
    () => {
      if (picker.mode === TIME && initialEvent.endDateTimeStamp) setMaximumStartDate(event.endDate);
      else setMaximumStartDate(undefined);
    },
    [event.endDate, initialEvent.endDateTimeStamp, picker.mode]
  );

  useEffect(
    () => {
      if (picker.mode === TIME) setMinimumEndDate(event.startDate);
      else setMinimumEndDate(undefined);
    },
    [event.startDate, initialEvent.endDateTimeStamp, picker.mode]
  );

  const onChangePicker = (pickerEvent: any, newDate: Date | undefined) => {
    if (!newDate) return;

    if (picker.mode === DATE) eventEditionDispatch({ type: SET_DATES, payload: { date: newDate } });

    if (picker.mode === TIME) eventEditionDispatch({ type: SET_TIME, payload: { date: newDate } });

    if (!isIOS) pickerDispatch({ type: HIDE_PICKER });
  };

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Début</Text>
        <EventDateTime isTimeStamped={initialEvent.startDateTimeStamp} date={event.startDate}
          disabled={initialEvent.isBilled} onPress={(mode: ModeType) => onPressPicker(true, mode)} />
        {picker.displayStartPicker && <DateTimePicker value={event.startDate} mode={picker.mode} is24Hour locale="fr-FR"
          display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker} maximumDate={maximumStartDate} />}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Fin</Text>
        <EventDateTime isTimeStamped={initialEvent.endDateTimeStamp} date={event.endDate}
          disabled={initialEvent.isBilled} onPress={(mode: ModeType) => onPressPicker(false, mode)} />
        {picker.displayEndPicker && <DateTimePicker value={event.endDate} mode={picker.mode} is24Hour locale="fr-FR"
          display={isIOS ? 'spinner' : 'default'} onChange={onChangePicker} minimumDate={minimumEndDate} />}
      </View>
      {confirmationModal && (
        <ConfirmationModal visible={confirmationModal} title="Cet évènement a déjà été horodaté"
          cancelText="Retour" confirmText="Annuler l'horodatage" exitButton onPressConfirmButton={() => {}}
          onRequestClose={() => setConfirmationModal(false)} onPressCancelButton={() => setConfirmationModal(false)}>
          <WarningBanner text="Pour modifier l’horaire, vous devez annuler l’horodatage existant.
          Cette action est irréversible." />
        </ConfirmationModal>
      )}

    </>
  );
};

export default EventDateTimeEdition;
