import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import FeatherButton from '../FeatherButton';
import { EventEditionActionType } from '../../screens/timeStamping/EventEdition/types';
import { EVENT_TRANSPORT_OPTIONS } from '../../core/data/constants';
import { SET_FIELD } from '../../screens/timeStamping/EventEdition';

type EventTransportModeEditionProps = {
  transportMode: any,
  eventEditionDispatch: (action: EventEditionActionType) => void,
}

const EventTransportModeEdition = ({
  transportMode,
  eventEditionDispatch,
}: EventTransportModeEditionProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const onPressCell = () => { setShowPicker(prevValue => !prevValue); };

  const selectTransportMode = (itemValue: string) => {
    eventEditionDispatch({ type: SET_FIELD, payload: { transportMode: itemValue } });
  };

  return (
    <>
      <Text style={styles.sectionText}>Transport pour aller à l&apos;intervention</Text>
      <TouchableOpacity style={styles.transportCell} onPress={onPressCell}>
        <Text style={styles.transportText}>
          {(EVENT_TRANSPORT_OPTIONS.find(item => item.value === transportMode))?.label || ''}
        </Text>
        {showPicker
          ? <FeatherButton name='chevron-up' onPress={onPressCell} />
          : <FeatherButton name='chevron-down' onPress={onPressCell} />}
      </TouchableOpacity>
      {showPicker && <Picker selectedValue={transportMode} onValueChange={selectTransportMode}
        itemStyle={{ fontSize: 16 }}>
        {EVENT_TRANSPORT_OPTIONS.map((option, index) => (
          <Picker.Item label={option.label} value={option.value} key={index} />
        ))}
      </Picker>}
    </>
  );
};

export default EventTransportModeEdition;
