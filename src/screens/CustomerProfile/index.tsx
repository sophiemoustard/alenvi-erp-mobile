import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, ActivityIndicator, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEqual, pick } from 'lodash';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Customers from '../../api/Customers';
import { CustomerType, UserType, FormattedUserType } from '../../types/UserType';
import { formatIdentity, formatPhone } from '../../core/helpers/utils';
import { formatAuxiliary } from '../../core/helpers/auxiliaries';
import NiHeader from '../../components/Header';
import NiInput from '../../components/form/Input';
import NiPersonSelect from '../../components/PersonSelect';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import ErrorMessage from '../../components/ErrorMessage';
import { ICON, KEYBOARD_PADDING_TOP } from '../../styles/metrics';
import styles from './style';
import { COPPER, COPPER_GREY } from '../../styles/colors';
import CompaniDate from '../../core/helpers/dates/companiDates';
import Users from '../../api/Users';
import { AUXILIARY, PLANNING_REFERENT } from '../../core/data/constants';
import Helpers from '../../api/Helpers';
import { HelperType } from '../../types/HelperType';

type CustomerProfileProp = {
  route: { params: { customerId: string } },
};

const OBJECTIVES_PLACEHOLDER = 'Précisez les objectifs de l\'accompagnement : lever, toilette, préparation des repas,'
  + ' courses, déplacement véhiculé...';

const ENVIRONMENT_PLACEHOLDER = 'Précisez l\'environnement de l\'accompagnement : entourage de la personne, famille,'
  + ' voisinage, histoire de vie, contexte actuel...';

const CustomerProfile = ({ route }: CustomerProfileProp) => {
  const navigation = useNavigation();
  const { customerId } = route.params;
  const customer = {
    _id: '',
    identity: { firstname: '', lastname: '', birthDate: '' },
    contact: { phone: '', primaryAddress: { fullAddress: '', street: '', zipCode: '', city: '' }, accessCodes: '' },
    followUp: { environment: '', objectives: '', misc: '' },
    company: '',
    referentAuxiliary: {
      _id: '',
      identity: { firstname: '', lastname: '' },
      local: { email: '' },
      contact: { phone: '' },
      company: { name: '' },
    },
    referentHelper: {
      _id: '',
      identity: { firstname: '', lastname: '' },
      local: { email: '' },
      contact: { phone: '' },
      company: { name: '' },
    },
  };
  const [initialCustomer, setInitialCustomer] = useState<CustomerType>(customer);
  const [editedCustomer, setEditedCustomer] = useState<CustomerType>(customer);
  const [helpersOptions, setHelpersOptions] = useState<FormattedUserType[]>([]);
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [customerBirth, setCustomerBirth] = useState<string>('');
  const [activeAuxiliaries, setActiveAuxiliaries] = useState<FormattedUserType[]>([]);

  const formatHelpers = (helpers: HelperType[]) => helpers.map(helper => ({
    ...helper.user,
    formattedIdentity: formatIdentity(helper.user.identity, 'FL'),
  }));

  const getCustomer = useCallback(async () => {
    try {
      setLoading(true);
      const currentCustomer = await Customers.getById(customerId);

      const helpers = await Helpers.list({ customer: currentCustomer._id });
      const formattedHelpers = formatHelpers(helpers);
      setHelpersOptions(formattedHelpers);

      const referentHelper = helpers.find(helper => helper.referent);
      const formatedCurrentCustomer = {
        ...currentCustomer,
        referentAuxiliary: currentCustomer.referent ? formatAuxiliary(currentCustomer.referent) : {},
        referentHelper: referentHelper?.user || '',
      };
      setInitialCustomer(formatedCurrentCustomer);
      setEditedCustomer(formatedCurrentCustomer);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => { getCustomer(); }, [getCustomer]);

  useEffect(() => {
    const birthDate = initialCustomer?.identity?.birthDate
      ? `${CompaniDate(initialCustomer?.identity?.birthDate).format('dd LLLL yyyy')}`
        + ` (${CompaniDate().diff(initialCustomer?.identity?.birthDate, 'years').years} ans)`
      : 'non renseigné';
    setCustomerBirth(birthDate);
  }, [initialCustomer?.identity?.birthDate]);

  const getActiveAuxiliaries = useCallback(async () => {
    try {
      if (initialCustomer.company) {
        const activeAux = await Users.getActive({
          role: [AUXILIARY, PLANNING_REFERENT],
          company: initialCustomer.company,
        });
        const formattedAux = activeAux.map((aux: UserType) => (formatAuxiliary(aux)));
        setActiveAuxiliaries(formattedAux);
      }
    } catch (e) {
      console.error(e);
      setActiveAuxiliaries([]);
    }
  }, [initialCustomer.company]);

  useEffect(() => { getActiveAuxiliaries(); }, [getActiveAuxiliaries]);

  const onLeave = () => {
    const pickedFields = [
      'followUp.environment',
      'followUp.objectives',
      'followUp.misc',
      'contact.accessCodes',
      'referentAuxiliary._id',
      'referentHelper._id',
    ];

    if (isEqual(pick(editedCustomer, pickedFields), pick(initialCustomer, pickedFields))) {
      navigation.goBack();
    } else setExitModal(true);
  };

  const onConfirmExit = () => {
    setExitModal(false);
    navigation.goBack();
  };

  const onSave = async () => {
    try {
      setLoading(true);
      const payload = {
        followUp: editedCustomer.followUp,
        contact: { accessCodes: editedCustomer.contact.accessCodes || '' },
        referent: editedCustomer?.referentAuxiliary?._id || '',
      };

      await Customers.updateById(customerId, payload);
      setInitialCustomer(editedCustomer);
    } catch (e) {
      console.error(e);
      setApiErrorMessage('Une erreur s\'est produite, si le problème persiste, contactez le support technique.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setApiErrorMessage(''), [setApiErrorMessage, editedCustomer]);

  const onChangeFollowUpText = (key: string) => (text: string) => {
    setEditedCustomer({ ...editedCustomer, followUp: { ...editedCustomer.followUp, [key]: text } });
  };

  const onChangeContactText = (text: string) => {
    setEditedCustomer({ ...editedCustomer, contact: { ...editedCustomer.contact, accessCodes: text } });
  };

  const onSelectAuxiliary = (aux: UserType) => {
    setEditedCustomer({ ...editedCustomer, referentAuxiliary: formatAuxiliary(aux) });
  };

  const onSelectHelper = (helper: UserType) => {
    setEditedCustomer({ ...editedCustomer, referentHelper: formatAuxiliary(helper) });
  };

  return (
    <>
      <NiHeader onPressIcon={onLeave} onPressButton={onSave} loading={loading}
        title={formatIdentity(initialCustomer?.identity, 'FL')} />
      <KeyboardAwareScrollView extraScrollHeight={KEYBOARD_PADDING_TOP} enableOnAndroid>
        {loading && <ActivityIndicator style={styles.loader} size="small" color={COPPER[500]} />}
        {!loading &&
          <ScrollView>
            <View style={styles.screen}>
              <Text style={styles.identity}>{formatIdentity(initialCustomer?.identity, 'FL')}</Text>
            </View>
            <View style={styles.infosContainer}>
              <Text style={styles.sectionText}>Infos pratiques</Text>
              <View style={styles.infoItem}>
                <Feather name="map-pin" size={ICON.SM} color={COPPER_GREY[400]} />
                <Text style={styles.infoText}>{initialCustomer?.contact?.primaryAddress?.fullAddress}</Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="phone" size={ICON.SM} color={COPPER_GREY[400]} />
                <Text style={styles.infoText}>
                  {initialCustomer?.contact?.phone ? formatPhone(initialCustomer?.contact?.phone) : 'non renseigné'}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <MaterialIcons name="cake" size={ICON.SM} color={COPPER_GREY[400]} />
                <Text style={styles.infoText}>{customerBirth}</Text>
              </View>
              <NiInput style={styles.input} caption="Accès" value={editedCustomer?.contact?.accessCodes || ''}
                multiline onChangeText={onChangeContactText} />
            </View>
            <View style={styles.separator} />
            <View style={styles.infosContainer}>
              <Text style={styles.sectionText}>Référents</Text>
              <NiPersonSelect title={'Auxiliaire référent(e)'} placeHolder={'Pas d\'auxiliaire référent(e)'}
                person={formatAuxiliary(editedCustomer.referentAuxiliary || customer.referentAuxiliary)}
                personOptions={activeAuxiliaries} style={styles.referentAuxiliary} onSelectPerson={onSelectAuxiliary} />
              {!!editedCustomer?.referentAuxiliary?.contact?.phone &&
                <View style={styles.infoItem}>
                  <MaterialIcons name="phone" size={ICON.SM} color={COPPER[500]} />
                  <Text style={styles.phoneReferent}>
                    {formatPhone(editedCustomer?.referentAuxiliary?.contact?.phone)}
                  </Text>
                </View>}
              <NiPersonSelect title={'Aidant(e) référent(e)'} placeHolder={'Pas d\'aidant(e) référent(e)'}
                person={editedCustomer.referentHelper || customer.referentHelper}
                personOptions={helpersOptions} style={styles.referentAuxiliary} onSelectPerson={onSelectHelper} />
              {!!editedCustomer?.referentHelper?.contact?.phone &&
                <View style={styles.infoItem}>
                  <MaterialIcons name="phone" size={ICON.SM} color={COPPER[500]} />
                  <Text style={styles.phoneReferent}>
                    {formatPhone(editedCustomer?.referentHelper?.contact?.phone)}
                  </Text>
                </View>}
            </View>
            <View style={styles.separator} />
            <View style={styles.infosContainer}>
              <Text style={styles.sectionText}>Accompagnement</Text>
              <NiInput caption="Environnement" value={editedCustomer?.followUp?.environment}
                multiline onChangeText={onChangeFollowUpText('environment')} placeholder={ENVIRONMENT_PLACEHOLDER} />
              <NiInput style={styles.input} caption="Objectifs" value={editedCustomer?.followUp?.objectives}
                multiline onChangeText={onChangeFollowUpText('objectives')} placeholder={OBJECTIVES_PLACEHOLDER} />
              <NiInput style={styles.input} caption="Autres" value={editedCustomer?.followUp?.misc}
                multiline onChangeText={onChangeFollowUpText('misc')} />
            </View>
            <ConfirmationModal onPressConfirmButton={onConfirmExit} onPressCancelButton={() => setExitModal(false)}
              visible={exitModal} contentText="Voulez-vous supprimer les modifications apportées ?"
              cancelText="Poursuivre les modifications" confirmText="Supprimer" />
            <ErrorMessage message={apiErrorMessage || ''} />
          </ScrollView>}
      </KeyboardAwareScrollView>
    </>
  );
};

export default CustomerProfile;
