import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { formatTime } from '../../../core/helpers/dates';
import { CIVILITY_OPTIONS } from '../../../core/data/constants';
import NiRadioButtonList from '../../../components/RadioButtonList';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import FeatherButton from '../../../components/FeatherButton';
import ExitModal from '../../../components/modals/ExitModal';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import styles from './styles';

interface ManualTimeStampingProps {
  route: { params: { event: { _id: string, customer: { identity: any } } } },
}

const ManualTimeStamping = ({ route }: ManualTimeStampingProps) => {
  const [currentTime] = useState<Date>(new Date());
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const navigation = useNavigation();

  const optionList = [
    { label: 'Je n\'ai pas accès au code barre', value: 0 },
    { label: 'Le code barre ne fonctionne pas', value: 1 },
    { label: 'Mon appareil photo ne fonctionne pas', value: 2 },
  ];

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Home');
  };

  return (
    <>
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={() => setExitConfirmationModal(true)} size={ICON.MD}
          color={GREY[600]} />
        <ExitModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
          onPressCancelButton={() => setExitConfirmationModal(false)}
          title={'Êtes-vous sûr de cela ?'} contentText={'Vous reviendrez à la page précédente.'} />
      </View>
      <View style={styles.screen}>
        <Text style={styles.title}>Début de l&apos;intervention</Text>
        <View>
          <View style={styles.container}>
            <View style={styles.view}>
              <Text style={styles.subtitle}>Bénéficiaire</Text>
              <Text style={styles.info}>
                {CIVILITY_OPTIONS[route.params.event.customer.identity.title]} {}
                {route.params.event.customer.identity.lastname.toUpperCase()}
              </Text>
            </View>
            <View style={styles.sectionDelimiter} />
            <View style={styles.view}>
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
