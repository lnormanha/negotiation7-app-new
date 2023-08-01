import ReduxPersist from '../state/redux/redux-persist-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore} from 'redux-persist';
import StartupActions from '../state/redux/startup/StartupRedux';

const updateReducers = (store: Object) => {
  const reducerVersion = ReduxPersist.reducerVersion;
  const startup = () => store.dispatch(StartupActions.startup());

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion')
    .then(localVersion => {
      if (localVersion !== reducerVersion) {
     
        // Purge store
        persistStore(store, null, startup).purge();
        AsyncStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, null, startup);
      }
    })
    .catch(() => {
      persistStore(store, null, startup);
      AsyncStorage.setItem('reducerVersion', reducerVersion);
    });
};

export default {updateReducers};
