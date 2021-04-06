import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import Version from '../src/api/version';
import { ERP } from '../src/data/constants';

const App = () => {
  const [test, setTest] = useState(false);

  const shouldUpdate = async () => {
    const { mustUpdate } = await Version.shouldUpdate({ mobileVersion: Constants.manifest.version, appName: ERP });

    setTest(mustUpdate);
  };

  useEffect(() => {
    async function callShouldUpdate() { shouldUpdate(); }
    callShouldUpdate();
  }, []);

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
