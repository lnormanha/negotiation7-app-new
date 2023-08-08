import { createStore, applyMiddleware, compose } from "redux";
// import Rehydration from "../../services/Rehydration";
// import ReduxPersist from "./redux-persist-config";

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  // const middleware = [];
  // const enhancers = [];

  /* ------------- Navigation Middleware ------------ */
  // middleware.push(appNavigatorMiddleware);

  /* ------------- Analytics Middleware ------------- */
  // middleware.push(ScreenTracking);

  /* ------------- Saga Middleware ------------- */

  //#TODO: Add Sagas Later

  //const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  // middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */
  //#TODO: Add Sagas Later

  //   const middleware = applyMiddleware(
  //     sagaMiddleware,
  //   );

  // enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  // const createAppropriateStore = Config.useReactotron ? console.createStore : createStore
  const store = createStore(
    rootReducer
    // compose(middleware)
  );

  // configure persistStore and check reducer version number


//   if (ReduxPersist.active) {
//       Rehydration.updateReducers(store);
//   }

  // kick off root saga
  //#TODO: Add Sagas Later
  //let sagasManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    //#TODO: Add Sagas Later

    // sagasManager,
    // sagaMiddleware
  };
};
