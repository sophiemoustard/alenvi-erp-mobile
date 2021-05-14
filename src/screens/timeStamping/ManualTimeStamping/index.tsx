import React, { useState } from 'react';
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
  route: { params: { event: { _id: string, customer: { identity: any } } } },
}

const ManualTimeStamping = ({ route }: ManualTimeStampingProps) => {
  const [currentTime] = useState<Date>(new Date());
  const navigation = useNavigation();

  const civility = CIVILITY_OPTIONS[route.params.event?.customer?.identity?.title] || '';
  const lastName = route.params.event?.customer?.identity?.lastname.toUpperCase() || '';

  const optionList = [
    { label: 'Je n\'ai pas accès au code barre', value: 0 },
    { label: 'Le code barre ne fonctionne pas', value: 1 },
    { label: 'Mon appareil photo ne fonctionne pas', value: 2 },
  ];

  const goBack = () => navigation.navigate('Home');

  return (
    <>
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={goBack} size={ICON.MD} color={GREY[600]} />
      </View>
      <View style={styles.screen}>
        <Text style={styles.title}>Début de l&apos;intervention</Text>
        <View>
          <View style={styles.container}>
            <View style={styles.interventionInfo}>
              <Text style={styles.subtitle}>Bénéficiaire</Text>
              <Text style={styles.info}>{civility} {lastName}</Text>
            </View>
            <View style={styles.sectionDelimiter} />
            <View style={styles.interventionInfo}>
              <Text style={styles.subtitle}>Heure horodatée</Text>
              <Text style={styles.info}>{formatTime(currentTime)}</Text>
            </View>
          </View>
          <View style={styles.reasonsView}>
            <Text style={styles.question}>Pourquoi horodatez-vous manuellement?</Text>
            <NiRadioButtonList options={optionList} />
          </View>
        </View>
        <View>
          <NiPrimaryButton title='Valider et horodater' />
        </View>
      </View>
    </>
  );
};

export default ManualTimeStamping;
