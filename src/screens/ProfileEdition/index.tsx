import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useContext, useEffect, useReducer, useState } from 'react';
import { ScrollView, View, Text, Keyboard, KeyboardAvoidingView, BackHandler } from 'react-native';
import FeatherButton from '../../components/FeatherButton';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import NiInput from '../../components/form/Input';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import NiErrorMessage from '../../components/ErrorMessage';
import { ICON, IS_LARGE_SCREEN, KEYBOARD_AVOIDING_VIEW_BEHAVIOR, MARGIN } from '../../styles/metrics';
import { Context as AuthContext } from '../../context/AuthContext';
import Users from '../../api/Users';
import { EMAIL_REGEX, PHONE_REGEX } from '../../core/data/constants';
import { formatEmail, formatPhoneForPayload } from '../../core/helpers/utils';
import { errorReducer, initialErrorState, RESET_ERROR, SET_ERROR } from '../../reducers/error';
import styles from './styles';

type editedUserValidType = { lastName: boolean, phone: boolean, email: boolean, emptyEmail: boolean };

const ProfileEdition = () => {
  const { loggedUser, refreshLoggedUser } = useContext(AuthContext);
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);
  const [editedUser, setEditedUser] = useState<any>({
    identity: { firstname: loggedUser?.identity?.firstname, lastname: loggedUser?.identity?.lastname },
    contact: { phone: loggedUser?.contact?.phone },
    local: { email: loggedUser?.local?.email },
  });
  const [invalid, setInvalid] = useState<editedUserValidType>({
    lastName: false,
    phone: false,
    email: false,
    emptyEmail: false,
  });
  const [isValidationAttempted, setIsValidationAttempted] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const keyboardDidHide = () => Keyboard.dismiss();

  useEffect(() => {
    const hideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      hideListener.remove();
    };
  });

  const goBack = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    navigation.navigate('Home', { screen: 'Profile' });
  };

  const saveData = async () => {
    try {
      setIsValidationAttempted(true);
      if (isValid && loggedUser?._id) {
        dispatchError({ type: RESET_ERROR });
        setIsLoading(true);

        await Users.updateById(
          loggedUser._id,
          {
            ...editedUser,
            contact: { phone: formatPhoneForPayload(editedUser.contact.phone) },
            local: { email: editedUser.local.email },
          }
        );

        await refreshLoggedUser();

        goBack();
      }
    } catch (e) {
      console.error(e);
      dispatchError({ type: SET_ERROR, payload: 'Erreur, si le problème persiste, contactez le support technique.' });
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeIdentity = (key: string) => (text: string) => (
    setEditedUser({ ...editedUser, identity: { ...editedUser.identity, [key]: text } })
  );

  const onChangePhone = (text: string) => setEditedUser({ ...editedUser, contact: { phone: text } });

  const onChangeEmail = (text: string) => setEditedUser({ ...editedUser, local: { email: formatEmail(text) } });

  const onPressExitModal = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressExitModal);

    return () => { BackHandler.removeEventListener('hardwareBackPress', onPressExitModal); };
  });

  useEffect(() => {
    setInvalid({
      lastName: editedUser.identity.lastname === '',
      phone: editedUser.contact.phone &&
        (!editedUser.contact.phone.match(PHONE_REGEX) && editedUser.contact.phone.length > 0),
      email: !editedUser.local.email.match(EMAIL_REGEX) && editedUser.local.email.length > 0,
      emptyEmail: editedUser.local.email === '',
    });
  }, [editedUser]);

  useEffect(() => {
    const { lastName, phone, email, emptyEmail } = invalid;
    if (lastName || phone || email || emptyEmail) setIsValid(false);
    else setIsValid(true);
  }, [invalid]);

  const emailValidation = () => {
    if (invalid.email && isValidationAttempted) return 'Votre e-mail n\'est pas valide';
    if (invalid.emptyEmail && isValidationAttempted) return 'Ce champ est obligatoire';

    return '';
  };

  const phoneValidation = () => (invalid.phone && isValidationAttempted
    ? 'Votre numéro de téléphone n\'est pas valide'
    : ''
  );

  const lastnameValidation = () => (invalid.lastName && isValidationAttempted ? 'Ce champ est obligatoire' : '');

  return (
    <KeyboardAvoidingView behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOR} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS}>
      <ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.header}>
          <FeatherButton name='x-circle' onPress={onPressExitModal} size={ICON.MD} />
          <ConfirmationModal onPressConfirmButton={goBack} visible={exitConfirmationModal}
            onPressCancelButton={() => setExitConfirmationModal(false)}
            title="Êtes-vous sûr(e) de cela ?" contentText="Vos modifications ne seront pas enregistrées." />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Modifier mes informations</Text>
          <NiInput caption='Nom' value={editedUser.identity.lastname} type='lastname'
            onChangeText={onChangeIdentity('lastname')} validationMessage={lastnameValidation()} />
          <NiInput caption='Prénom' type='firstname' value={editedUser.identity.firstname}
            onChangeText={onChangeIdentity('firstname')} />
          <NiInput caption='Téléphone' type='phone' value={editedUser.contact.phone} onChangeText={onChangePhone}
            validationMessage={phoneValidation()} />
          <NiInput caption='E-mail' type='email' value={editedUser.local.email} onChangeText={onChangeEmail}
            validationMessage={emailValidation()}/>
        </View>
        <NiPrimaryButton title='Valider' onPress={saveData} loading={isLoading} />
        {error.value && <NiErrorMessage message={error.message} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileEdition;
