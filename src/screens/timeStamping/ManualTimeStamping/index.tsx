import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { displayMinutes } from '../../../core/helpers/dates';
import { CIVILITY_OPTIONS } from '../../../core/data/constants';
import NiRadioButtonList from '../../../components/RadioButtonList';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import styles from './styles';

interface ManualTimeStampingProps {
  route: { params: { name: string, civilities: string} },
}

const ManualTimeStamping = ({ route }: ManualTimeStampingProps) => {
  const [currentTime] = useState<Date>(new Date());
  const [selected] = useState<boolean>(false);

  const optionList = [
    { label: 'Je n\'ai pas accès au code barre',
      value: 0 },
    { label: 'Le code barre ne fonctionne pas',
      value: 1 },
    { label: 'Mon appareil photo ne fonctionne pas',
      value: 2 },
  ];

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Début de l&apos;intervention</Text>
      <View>
        <View style={styles.container}>
          <View style={styles.view}>
            <Text style={styles.subtitle}>Bénéficiaire</Text>
            <Text style={styles.info}>{CIVILITY_OPTIONS[route.params.civilities]} {route.params.name.toUpperCase()}
            </Text>
          </View>
          <View style={styles.sectionDelimiter} />
          <View style={styles.view}>
            <Text style={styles.subtitle}>Heure horodatée</Text>
            <Text style={styles.info}>{currentTime.getHours()}:{displayMinutes(currentTime)}</Text>
          </View>
        </View>
        <View style={styles.reasonsView}>
          <Text style={styles.question}>Pourquoi horodatez-vous manuellement?</Text>
          <NiRadioButtonList list={optionList} optionSelected={selected} />
        </View>
      </View>
      <View>
        <NiPrimaryButton title='Valider et horodater' />
      </View>
    </View>
  );
};

export default ManualTimeStamping;
