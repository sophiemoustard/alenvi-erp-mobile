import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { formatTime } from '../../../core/helpers/dates';
import { CIVILITY_OPTIONS } from '../../../core/data/constants';
import NiRadioButtonList from '../../../components/RadioButtonList';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import FeatherButton from '../../../components/FeatherButton';
import NiErrorMessage from '../../../components/ErrorMessage';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import styles from './styles';
import Events from '../../../api/Events';

interface ManualTimeStampingProps {
  route: { params: { event: { _id: string, customer: { identity: any } }, eventStart: boolean, } },
}

const MANUAL_TIME_STAMPING = 'manual_time_stamping';
const QRCODE_MISSING = 'qrcode_missing';
const QRCODE_ERROR = 'qrcode_error';
const CAMERA_ERROR = 'camera_error';

const optionList = [
  { label: 'Je n\'ai pas accès au code barre', value: QRCODE_MISSING },
  { label: 'Le code barre ne fonctionne pas', value: QRCODE_ERROR },
  { label: 'Mon appareil photo ne fonctionne pas', value: CAMERA_ERROR },
];

const ManualTimeStamping = ({ route }: ManualTimeStampingProps) => {
  const [currentTime] = useState<Date>(new Date());
  const [civility, setCivility] = useState<string>(route.params.event?.customer?.identity?.title || '');
  const [lastname, setLastname] = useState<string>(
    route.params.event?.customer?.identity?.lastname.toUpperCase() || ''
  );
  const [title, setTitle] = useState<string>('');
  const [reason, setReason] = useState<string | null>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    setCivility(route.params.event?.customer?.identity?.title || '');
    setLastname(route.params.event?.customer?.identity?.lastname.toUpperCase() || '');
    setTitle(route.params.eventStart ? 'Début de l\'intervention' : 'Fin de l\'intervention');
  }, [route.params]);

  const goBack = () => navigation.navigate('Home');

  const timeStampEvent = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      if (!reason) {
        setErrorMessage('Merci de selectionner une raison pour l\'horodatage manuel.');
        return;
      }

      interface payloadType { action: string, reason: string, startDate?: Date, endDate?: Date }
      const payload: payloadType = { action: MANUAL_TIME_STAMPING, reason };
      if (route.params.eventStart) payload.startDate = new Date();
      else payload.endDate = new Date();

      await Events.timeStampEvent(route.params?.event?._id, payload);
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
      if ([409, 422].includes(e.response.status)) setErrorMessage(e.response.data.message);
      else setErrorMessage('Erreur, si le problème persiste, contactez le support technique.');
    } finally {
      setLoading(false);
    }
  };

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
        <View style={styles.reasons}>
          <Text style={styles.question}>Pourquoi horodatez-vous manuellement ?</Text>
          <NiRadioButtonList options={optionList} setOption={setReason} />
        </View>
        {!!errorMessage && <NiErrorMessage message={errorMessage} />}
      </View>
      <NiPrimaryButton title='Valider et horodater' style={styles.submitButton} onPress={timeStampEvent}
        loading={loading} />
    </View>
  );
};

export default ManualTimeStamping;
