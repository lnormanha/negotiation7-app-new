import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import configureStore from './create-store';
//#TODO: Add Sagas Later
//import rootSaga from '../Sagas/';
import ReduxPersist from './redux-persist-config';
import { Platform } from 'react-native';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  negotiations: require('./negotiations/NegotiationsRedux').reducer,
  login: require('./login/LoginRedux').reducer,
  signup: require('./sign-up/SignUpRedux').reducer,
//   facebook_auth: require('./FacebookAuthRedux').reducer,
//   google_auth: require('./GoogleAuthRedux').reducer,
//   apple_auth: require('./AppleAuthRedux').reducer,
  user: require('./user/UserRedux').reducer,
//   language: require('./LanguageRedux').reducer,
  verify_email: require('./verify-email/VerifyEmailRedux').reducer,
  subscription: require('./subscription/SubscriptionRedux').reducer,
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
//   if (ReduxPersist.active) {
//     const persistConfig = ReduxPersist.storeConfig;
//     finalReducers = persistReducer(persistConfig, reducers);
//   }

  let {store, sagasManager, sagaMiddleware} = configureStore(
    finalReducers,
    //#TODO: Add Sagas Later
    // rootSaga,
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

    //#TODO: Add Sagas Later

    //   const newYieldedSagas = require('../Sagas').default;
    //   sagasManager.cancel();
    //   sagasManager.done.then(() => {
    //     sagasManager = sagaMiddleware(newYieldedSagas);
    //   });

    });
  }

  return store;
};
