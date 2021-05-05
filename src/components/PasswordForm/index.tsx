import React, { useEffect, useState, useRef } from 'react';
import { Text, ScrollView, View, Keyboard, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import FeatherButton from '../FeatherButton';
import NiInput from '../form/Input';
import ExitModal from '../modals/ExitModal';
import { GREY } from '../../styles/colors';
import { ICON, IS_LARGE_SCREEN, MARGIN } from '../../styles/metrics';
import styles from './styles';

interface PasswordFormProps {
  goBack: () => void,
}

type PasswordKeyType = 'newPassword' | 'confirmedPassword'

const PasswordForm = ({ goBack }: PasswordFormProps) => {
  const [behavior, setBehavior] = useState<'padding' | 'height'>('padding');
  const [exitConfirmationModal, setExitConfirmationModal] = useState<boolean>(false);
  const [password, setPassword] =
    useState<{ newPassword: string, confirmedPassword: string }>({ newPassword: '', confirmedPassword: '' });
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (Platform.OS === 'ios') setBehavior('padding');
    else setBehavior('height');
  }, []);

  useEffect(() => {
    const keyboardDidHide = () => Keyboard.dismiss();
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => { Keyboard.removeListener('keyboardDidHide', keyboardDidHide); };
  }, []);

  const hardwareBackPress = () => {
    setExitConfirmationModal(true);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  }, []);

  const toggleModal = () => setExitConfirmationModal(!exitConfirmationModal);

  const handlePressConfirmButton = () => {
    if (exitConfirmationModal) setExitConfirmationModal(false);
    goBack();
  };

  const setPasswordField = (key: PasswordKeyType) => (text: string) => { setPassword({ ...password, [key]: text }); };

  return (
    <KeyboardAvoidingView behavior={behavior} style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={IS_LARGE_SCREEN ? MARGIN.MD : MARGIN.XS} >
      <View style={styles.goBack}>
        <FeatherButton name='x-circle' onPress={toggleModal} size={ICON.MD} color={GREY[600]} />
        <ExitModal onPressConfirmButton={handlePressConfirmButton} visible={exitConfirmationModal}
          title={'Êtes-vous sûr de cela ?'} contentText={'Vos modifications ne seront pas enregistrées.'}
          onPressCancelButton={toggleModal}/>
      </View>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Modifier mon mot de passe</Text>
        <View style={styles.input}>
          <NiInput title="Nouveau mot de passe" value={password.newPassword} type="password"
            setValue={setPasswordField('newPassword')} />
        </View>
        <View style={styles.input}>
          <NiInput title="Confirmer mot de passe" value={password.confirmedPassword} type="password"
            setValue={setPasswordField('confirmedPassword')} />
        </View>
        {/* <View style={styles.footer}>
          <NiErrorMessage message={errorMessage} show={error} />
          <NiPrimaryButton caption="Valider" onPress={savePassword} loading={isLoading} />
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PasswordForm;
