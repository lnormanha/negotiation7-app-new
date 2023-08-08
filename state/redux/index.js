import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import configureStore from "./create-store";
//#TODO: Add Sagas Later
import rootSaga from "../sagas";
import ReduxPersist from "./redux-persist-config";
import { Platform } from "react-native";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  negotiations: require("./negotiations/NegotiationsRedux").reducer,
  login: require("./login/LoginRedux").reducer,
  signup: require("./sign-up/SignUpRedux").reducer,
  user: require("./user/UserRedux").reducer,
  language: require("./languages/LanguageRedux").reducer,
  verify_email: require("./verify-email/VerifyEmailRedux").reducer,
  subscription: require("./subscription/SubscriptionRedux").reducer,
});

export default () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  //   if (ReduxPersist.active) {
  //     const persistConfig = ReduxPersist.storeConfig;
  //     finalReducers = persistReducer(persistConfig, reducers);
  //   }

  let { store, sagasManager, sagaMiddleware } = configureStore(
    finalReducers,
    rootSaga
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./").reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require("../sagas").default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return store;
};
