import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setLanguage: ["payload"]
});

export const LanguageTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  selected: null
});

/* ------------- Selectors ------------- */

export const LanguageSelectors = {

  getLanguage: state => state.language.selected

};

/* ------------- Reducers ------------- */

// request the data from an api
export const set = (state, action) => {
  const { payload } = action;
  return state.merge({ selected: payload });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LANGUAGE]: set
});
