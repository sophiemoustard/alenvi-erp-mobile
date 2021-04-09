import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import Version from '../src/api/versions';
import { ACTIVE_STATE } from '../src/data/constants';
import UpdateAppModal from '../src/components/modals/UpdateAppModal';

const App = () => {
  const [updateAppVisible, setUpdateAppVisible] = useState<boolean>(false);

  const shouldUpdate = async (nextState: string) => {
    try {
      if (nextState === ACTIVE_STATE) {
        const { mustUpdate } = await Version.shouldUpdate();
        setUpdateAppVisible(mustUpdate);
      }
    } catch (e) {
      setUpdateAppVisible(false);
      console.error(e);
    }
  };

  useEffect(() => {
    shouldUpdate(ACTIVE_STATE);
    AppState.addEventListener('change', shouldUpdate);

    return () => { AppState.removeEventListener('change', shouldUpdate); };
  }, []);

  return (
    <UpdateAppModal visible={updateAppVisible} />
  );
};

export default App;
