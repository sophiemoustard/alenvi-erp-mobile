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

type NiSelectProps = {
  title: string,
  caption: string,
  options: OptionType[],
  selectedItem: string,
  onItemSelect: (item: string) => void,
}

const Select = ({ title, caption, options, selectedItem, onItemSelect }: NiSelectProps) => {
  const [displaySelect, setDisplaySelect] = useState<boolean>(false);

  const onPressCell = () => setDisplaySelect(prevValue => !prevValue);

  const selectItem = (itemValue: string) => {
    onItemSelect(itemValue);
    setDisplaySelect(false);
  };

  const renderItem = (option: OptionType, index: number) => {
    if (option.value === selectedItem) {
      return (
        <View style={styles.selectedItem} key={index}>
          <Text style={styles.selectedItemText}>{option.label}</Text>
          <Feather name='check' color={COPPER[500]} size={ICON.SM} />
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={() => selectItem(option.value)} style={styles.item} key={index}>
        <Text style={styles.itemText}>{option.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Text style={styles.sectionText}>{caption}</Text>
      <View>
        <TouchableOpacity style={[styles.optionCell, displaySelect && styles.selectedCell]} onPress={onPressCell}>
          <Text style={styles.optionText}>{(options.find(item => item.value === selectedItem))?.label || ''}</Text>
          {displaySelect
            ? <FeatherButton name='chevron-up' onPress={onPressCell} />
            : <FeatherButton name='chevron-down' onPress={onPressCell} />}
        </TouchableOpacity>
        {displaySelect && <Shadow />}
      </View>
      <Modal visible={displaySelect} contentStyle={styles.modal}>
        <>
          <View style={styles.header}>
            <Text style={styles.title}>{title.toUpperCase()}</Text>
            <FeatherButton name="x" size={ICON.SM} color={COPPER_GREY[500]} onPress={() => setDisplaySelect(false)} />
          </View>
          <View>
            {options.map(renderItem)}
          </View>
        </>
      </Modal>
    </>
  );
};

export default Select;
