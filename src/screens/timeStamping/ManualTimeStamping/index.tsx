import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ERROR, MANUAL_TIME_STAMPING, WARNING } from '../../../core/data/constants';
import NiRadioButtonList from '../../../components/RadioButtonList';
import NiPrimaryButton from '../../../components/form/PrimaryButton';
import FeatherButton from '../../../components/FeatherButton';
import NiErrorMessage from '../../../components/ErrorMessage';
import { hitSlop, ICON } from '../../../styles/metrics';
import { errorType } from '../../../types/ErrorType';
import styles from './styles';
import Events, { timeStampEventPayloadType } from '../../../api/Events';
import EventInfoCell from '../../../components/EventInfoCell';

interface ManualTimeStampingProps {
  route: {
    params: {
      event: { _id: string, customer: { _id: string, identity: { title: string, lastname: string } } },
      eventStart: boolean,
    }
  },
}

const QRCODE_MISSING = 'qrcode_missing';
const QRCODE_ERROR = 'qrcode_error';
const CAMERA_ERROR = 'camera_error';

const optionList = [
  { label: 'Je n\'ai pas accès au code barre', value: QRCODE_MISSING },
  { label: 'Le code barre ne fonctionne pas', value: QRCODE_ERROR },
  { label: 'Mon appareil photo ne fonctionne pas', value: CAMERA_ERROR },
];

const ManualTimeStamping = ({ route }: ManualTimeStampingProps) => {
  const [identity, setIdentity] = useState({ title: '', lastname: '' });
  const [title, setTitle] = useState<string>('');
  const [reason, setReason] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<errorType>(ERROR);

  const navigation = useNavigation();

  useEffect(() => {
    setIdentity(route.params.event?.customer?.identity);
    setTitle(route.params.eventStart ? 'Début de l\'intervention' : 'Fin de l\'intervention');
  }, [route.params]);

  const goBack = () => navigation.navigate('Home');

  const goToQRCodeScanner = () => navigation.navigate('QRCodeScanner', route.params);

  const timeStampEvent = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      if (!reason) {
        setType(WARNING);
        setErrorMessage('Merci de selectionner une raison pour l\'horodatage manuel.');
        return;
      }
      setType(ERROR);
      const payload: timeStampEventPayloadType = { action: MANUAL_TIME_STAMPING, reason };
      if (route.params.eventStart) payload.startDate = new Date();
      else payload.endDate = new Date();

      await Events.timeStampEvent(route.params?.event?._id, payload);
      goBack();
    } catch (e) {
      console.error(e);
      if ([409, 422].includes(e.response.status)) setErrorMessage(e.response.data.message);
      else if ([404, 403].includes(e.response.status)) setErrorMessage('Vous ne pouvez pas horodater cet évènement.');
      else setErrorMessage('Erreur, si le problème persiste, contactez le support technique.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <FeatherButton name='x-circle' onPress={goBack} size={ICON.MD} />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <EventInfoCell identity={identity} />
        <View style={styles.reasons}>
          <Text style={styles.question}>Pourquoi horodatez-vous manuellement ?</Text>
          <NiRadioButtonList options={optionList} setOption={setReason} />
        </View>
        {!!errorMessage && <NiErrorMessage message={errorMessage} type={type} />}
      </ScrollView>
      <NiPrimaryButton title='Valider et horodater' onPress={timeStampEvent} loading={loading} />
      <TouchableOpacity onPress={goToQRCodeScanner} hitSlop={hitSlop} >
        <Text style={styles.QRCodeTimeStampingButton}>Scanner le QR code avec l&apos;appareil photo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManualTimeStamping;
