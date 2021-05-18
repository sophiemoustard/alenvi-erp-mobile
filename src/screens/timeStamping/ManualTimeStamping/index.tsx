import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { formatTime } from '../../../core/helpers/dates';
import { CIVILITY_OPTIONS } from '../../../core/data/constants';
import NiRadioButtonList from '../../../components/RadioButtonList';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import FeatherButton from '../../../components/FeatherButton';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import styles from './styles';

interface ManualTimeStampingProps {
  route: { params: { event: { _id: string, customer: { identity: any } }, eventStart: boolean, } },
}

const optionList = [
  { label: 'Je n\'ai pas accès au code barre', value: 0 },
  { label: 'Le code barre ne fonctionne pas', value: 1 },
  { label: 'Mon appareil photo ne fonctionne pas', value: 2 },
];

const ManualTimeStamping = ({ route }: ManualTimeStampingProps) => {
  const [currentTime] = useState<Date>(new Date());
  const [civility, setCivility] = useState<string>(route.params.event?.customer?.identity?.title || '');
  const [lastname, setLastname] = useState<string>(
    route.params.event?.customer?.identity?.lastname.toUpperCase() || ''
  );
  const navigation = useNavigation();

  const title = route.params.eventStart ? 'Début de l\'intervention' : 'Fin de l\'intervention';

  useEffect(() => {
    setCivility(route.params.event?.customer?.identity?.title || '');
    setLastname(route.params.event?.customer?.identity?.lastname.toUpperCase() || '');
  }, [route.params.event]);

  const goBack = () => navigation.navigate('Home');

  return (
    <View style={styles.screen}>
      <FeatherButton name='x-circle' onPress={goBack} size={ICON.MD} color={GREY[600]} />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.cell}>
          <View style={styles.customerInfo}>
            <Text style={styles.subtitle}>Bénéficiaire</Text>
            <Text style={styles.info}>{CIVILITY_OPTIONS[civility]} {lastname}</Text>
          </View>
          <View style={styles.sectionDelimiter} />
          <View>
            <Text style={styles.subtitle}>Heure horodatée</Text>
            <Text style={styles.info}>{formatTime(currentTime)}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.question}>Pourquoi horodatez-vous manuellement?</Text>
          <NiRadioButtonList options={optionList} />
        </View>
      </View>
      <NiPrimaryButton title='Valider et horodater' style={styles.submitButton} />
    </View>
  );
};

export default ManualTimeStamping;
