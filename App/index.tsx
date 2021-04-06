import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, AppState } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Version from '../src/api/version';
import { ACTIVE_STATE } from '../src/data/constants';

const App = () => {
  const [test, setTest] = useState(false);

  const shouldUpdate = async (nextState: string) => {
    try {
      if (nextState === ACTIVE_STATE) {
        const { mustUpdate } = await Version.shouldUpdate();
        setTest(mustUpdate);
      }
    } catch (e) {
      setTest(false);
      console.error(e);
    }
  };

  useEffect(() => {
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
  }, []); // TODO: Pourquoi est-ce que eslint ne casse pas ?

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app! {`${test}`}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
