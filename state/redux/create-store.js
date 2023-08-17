import { createStore, applyMiddleware, compose } from "redux";
// import Rehydration from "../../services/Rehydration";
// import ReduxPersist from "./redux-persist-config";
import createSagaMiddleware from "redux-saga";

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware();
  // middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  const middleware = applyMiddleware(sagaMiddleware);

  // enhancers.push(applyMiddleware(...middleware));

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  // const createAppropriateStore = Config.useReactotron ? console.createStore : createStore
  const store = createStore(rootReducer, compose(middleware));

  // configure persistStore and check reducer version number

  //   if (ReduxPersist.active) {
  //       Rehydration.updateReducers(store);
  //   }

  // kick off root saga
  //#TODO: Add Sagas Later
  let sagasManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    sagasManager,
    sagaMiddleware,
  };
};
