import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  subscriptionRequest: ['data'],
  subscriptionSuccess: ['payload'],
  subscriptionFailure: null,
  subscriptionDataRequest: ['data'],
  subscriptionDataSuccess: ['payload'],
  subscriptionDataFailure: null,
});

export const SubscriptionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  subscription_data: null,
  error: null,
});

/* ------------- Selectors ------------- */

export const SubscriptionSelectors = {
  getSubscription: state => state.subscription.subscription_data,
};

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {data}) => {
  return state.merge({fetching: true, data, payload: null});
};

// successful api lookup
export const success = (state, action) => {
  const {payload} = action;
  return state.merge({fetching: false, error: null, payload});
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({fetching: false, error: true, payload: null});

export const dataRequest = (state, {data}) => {
  return state.merge({fetching: true, data, subscription_data: null});
};

// successful api lookup
export const dataSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    fetching: false,
    error: null,
    subscription_data: payload,
  });
};

// Something went wrong somewhere.
export const dataFailure = state =>
  state.merge({fetching: false, error: true, subscription_data: null});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SUBSCRIPTION_REQUEST]: request,
  [Types.SUBSCRIPTION_SUCCESS]: success,
  [Types.SUBSCRIPTION_FAILURE]: failure,
  [Types.SUBSCRIPTION_DATA_REQUEST]: dataRequest,
  [Types.SUBSCRIPTION_DATA_SUCCESS]: dataSuccess,
  [Types.SUBSCRIPTION_DATA_FAILURE]: dataFailure,
});
