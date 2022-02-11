import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import FeatherButton from '../FeatherButton';
import { ICON } from '../../styles/metrics';
import { COPPER, COPPER_GREY } from '../../styles/colors';
import styles from './styles';
import Modal from '../modals/Modal';
import Shadow from '../design/Shadow';

type OptionType = {
  label: string,
  value: string
};

type NiPickerProps = {
  caption: string,
  options: OptionType[],
  selectedItem: string,
  onItemSelect: (item: string) => void,
}

const Picker = ({ caption, options, selectedItem, onItemSelect }: NiPickerProps) => {
  const [displayPicker, setDisplayPicker] = useState<boolean>(false);

  const onPressCell = () => setDisplayPicker(prevValue => !prevValue);

  const selectItem = (itemValue: string) => {
    onItemSelect(itemValue);
    setDisplayPicker(false);
  };

  const renderItem = (option: OptionType, index: number) => {
    if (option.value === selectedItem) {
      return (
        <View style={styles.selectedPickerItem} key={index}>
          <Text style={styles.selectedPickerItemText}>{option.label}</Text>
          <Feather name='check' color={COPPER[500]} size={ICON.XS} />
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={() => selectItem(option.value)} style={styles.pickerItem} key={index}>
        <Text style={styles.pickerItemText}>{option.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Text style={styles.sectionText}>{caption}</Text>
      <View>
        <TouchableOpacity style={[styles.optionCell, displayPicker && styles.selectedCell]} onPress={onPressCell}>
          <Text style={styles.optionText}>
            {(options.find(item => item.value === selectedItem))?.label || ''}
          </Text>
          {displayPicker
            ? <FeatherButton name='chevron-up' onPress={onPressCell} />
            : <FeatherButton name='chevron-down' onPress={onPressCell} />}
        </TouchableOpacity>
        {displayPicker && <Shadow />}
      </View>
      <Modal visible={displayPicker} contentStyle={styles.picker}>
        <>
          <FeatherButton name="x" size={ICON.SM} color={COPPER_GREY[400]} onPress={() => setDisplayPicker(false)}
            style={styles.pickerCloseButton} />
          <View>
            {options.map(renderItem)}
          </View>
        </>
      </Modal>
    </>
  );
};

export default Picker;
