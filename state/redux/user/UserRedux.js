import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  userRequest: ['data'],
  userSuccess: ['payload'],
  userFailure: null,
  userEditRequest: ['data'],
  userEditSuccess: ['payload'],
  userEditFailure: null,
  userForgotPasswordRequest: ['data'],
  userForgotPasswordSuccess: ['payload'],
  userForgotPasswordFailure: null,
  userResetPasswordRequest: ['data'],
  userResetPasswordSuccess: ['payload'],
  userResetPasswordFailure: null,
  userSetToken: ['payload'],
  userLogout: null,
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  token: null,
});

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getUser: state => state.user,
  getToken: state => state.user.token,
  getId: state => state.user.payload.id,
  getIsLoading: state => state.user.fetching,
};
/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, {data}) =>
  state.merge({fetching: true, data, payload: null});

// successful api lookup
export const success = (state, action) => {
  const {payload} = action;
  return state.merge({fetching: false, error: null, payload});
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({fetching: false, error: true, payload: null});

export const editRequest = (state, {data}) =>
  state.merge({fetching: true, data, payload: null});

// successful api lookup
export const editSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({fetching: false, error: null, payload});
};

// Something went wrong somewhere.
export const editFailure = state =>
  state.merge({fetching: false, error: true, payload: null});

export const setToken = (state, action) => {
  const {payload} = action;
  return state.merge({token: payload});
};

export const logout = state => {
  return state.merge({payload: null});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure,
  [Types.USER_EDIT_REQUEST]: editRequest,
  [Types.USER_EDIT_SUCCESS]: editSuccess,
  [Types.USER_EDIT_FAILURE]: editFailure,
  [Types.USER_FORGOT_PASSWORD_REQUEST]: request,
  [Types.USER_FORGOT_PASSWORD_SUCCESS]: success,
  [Types.USER_FORGOT_PASSWORD_FAILURE]: failure,
  [Types.USER_RESET_PASSWORD_REQUEST]: request,
  [Types.USER_RESET_PASSWORD_SUCCESS]: success,
  [Types.USER_RESET_PASSWORD_FAILURE]: failure,
  [Types.USER_SET_TOKEN]: setToken,
  [Types.USER_LOGOUT]: logout,
});
