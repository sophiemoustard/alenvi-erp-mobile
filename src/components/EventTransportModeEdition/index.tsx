import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import FeatherButton from '../FeatherButton';
import { EventEditionActionType } from '../../screens/timeStamping/EventEdition/types';
import { EVENT_TRANSPORT_OPTIONS } from '../../core/data/constants';
import { SET_FIELD } from '../../screens/timeStamping/EventEdition';
import { COPPER } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import Shadow from '../design/Shadow';

type EventTransportModeEditionProps = {
  transportMode: string,
  eventEditionDispatch: (action: EventEditionActionType) => void,
}

const EventTransportModeEdition = ({ transportMode, eventEditionDispatch }: EventTransportModeEditionProps) => {
  const [displayPicker, setDisplayPicker] = useState<boolean>(false);

  const onPressCell = () => setDisplayPicker(prevValue => !prevValue);

  const selectTransportMode = (itemValue: string) => {
    eventEditionDispatch({ type: SET_FIELD, payload: { transportMode: itemValue } });
    setDisplayPicker(false);
  };

  const renderEventTransportItem = (option: { label: string, value: string }, index: number) => {
    if (option.value === transportMode) {
      return (
        <View style={styles.selectedPickerItem} key={index}>
          <Text style={styles.selectedPickerItemText}>{option.label}</Text>
          <Feather name='check' color={COPPER[500]} size={ICON.XS} />
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={() => selectTransportMode(option.value)} style={styles.pickerItem} key={index}>
        <Text style={styles.pickerItemText}>{option.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Text style={styles.sectionText}>Transport pour aller à l&apos;intervention</Text>
      <View>
        <TouchableOpacity style={[styles.transportCell, displayPicker && styles.selectedCell]} onPress={onPressCell}>
          <Text style={styles.transportText}>
            {(EVENT_TRANSPORT_OPTIONS.find(item => item.value === transportMode))?.label || ''}
          </Text>
          {displayPicker
            ? <FeatherButton name='chevron-up' onPress={onPressCell} />
            : <FeatherButton name='chevron-down' onPress={onPressCell} />}
        </TouchableOpacity>
        {displayPicker && <Shadow />}
      </View>
      {displayPicker &&
        <View style={styles.picker}>
          {EVENT_TRANSPORT_OPTIONS.map(renderEventTransportItem)}
        </View>
      }
    </>
  );
};

export default EventTransportModeEdition;
