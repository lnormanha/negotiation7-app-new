import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  negotiationCreateRequest: ["data"],
  negotiationCreateSuccess: ["payload"],
  negotiationCreateFailure: null,
  negotiationsListRequest: ["data"],
  negotiationsListSuccess: ["payload"],
  negotiationsListFailure: null,
  negotiationsTagsRequest: ["data"],
  negotiationsTagsSuccess: ["payload"],
  negotiationsTagsFailure: null,
  negotiationRequest: ["data"],
  negotiationSuccess: ["payload"],
  negotiationFailure: null,
  negotiationInfoRequest: ["data"],
  negotiationInfoSuccess: ["payload"],
  negotiationInfoFailure: null,
  negotiationRemoveRequest: ["data"],
  negotiationRemoveSuccess: ["payload"],
  negotiationRemoveFailure: null,
  negotiationTopicsRequest: ["data"],
  negotiationTopicsSuccess: ["payload"],
  negotiationTopicsFailure: null,
  negotiationTopicQuestionsRequest: ["data"],
  negotiationTopicQuestionsSuccess: ["payload"],
  negotiationTopicQuestionsFailure: null,
  negotiationSendAnswersRequest: ["data"],
  negotiationSendAnswersSuccess: ["payload"],
  negotiationSendAnswersFailure: null,
  negotiationEditAnswersRequest: ["data"],
  negotiationEditAnswersSuccess: ["payload"],
  negotiationEditAnswersFailure: null,
  negotiationReportRequest: ["data"],
  negotiationReportSuccess: ["payload"],
  negotiationReportFailure: null,
  negotiationCoinRemoveRequest: ["data"],
  negotiationCoinRemoveSuccess: ["payload"],
  negotiationCoinRemoveFailure: null,
  setCurrent: ["payload"],
  setAnswers: ["payload"],
  setCurrentTopic: ["payload"],
  setTutorial: ["payload"],
  negotiationsReset: null
});

export const NegotiationsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  list: [],
  topics: [],
  questions: [],
  answers: [],
  editAnswer: false,
  current: null,
  current_topic: null,
  report: [],
  tags: [],
  showTutorial: true
});

/* ------------- Selectors ------------- */

export const NegotiationsSelectors = {
  getNegotiations: state => state.negotiations,
  getData: state => state.negotiations.data,
  getCurrentTopic: state => state.negotiations.current_topic,
  getTopics: state => state.negotiations.topics,
  getCurrent: state => state.negotiations.current
};

/* ------------- Reducers ------------- */

// Create Negotiation Handlers
export const createRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const createSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, current: payload });
};

export const createFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

// Get User Negotiations Handlers

export const listRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const listSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, list: payload });
};

export const listFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

// Get Negotiation Handlers

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const success = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, current: payload });
};
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const infoRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const infoSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, current: payload });
};
export const infoFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const removeRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const removeSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, current: null });
};
export const removeFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

// Get Negotiation Topics Handlers

export const topicsRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const topicsSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, topics: payload });
};
export const topicsFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

// Get Negotiation Topic Questions Handlers

export const questionsRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const questionsSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, questions: payload });
};
export const questionsFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

// Send Negotiation Answers Handlers

export const sendAnswersRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const sendAnswersSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null });
};
export const sendAnswersFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const editAnswersRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const editAnswersSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null });
};
export const editAnswersFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const reportRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const reportSuccess = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, report: payload });
};
export const reportFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const setCurrent = (state, action) => {
  const { payload } = action;
  return state.merge({ current: payload });
};
export const setAnswers = (state, action) => {
  const { payload } = action;
  const { answers, editAnswer } = payload;
  return state.merge({ answers, editAnswer });
};

export const setCurrentTopic = (state, action) => {
  const { payload } = action;
  return state.merge({ current_topic: payload });
};

export const setTutorial = (state, action) => {
  const { payload } = action;
  return state.merge({ showTutorial: payload });
};
export const tagsRequest = (state, { data }) => {
  return state.merge({ fetching: true, data, payload: null });
};

export const tagsSuccess = (state, action) => {
  const { payload } = action;
  const sortedTags = payload.sort(
    (a, b) => b.negotiations_qty - a.negotiations_qty
  );
  console.log({ sortedTags });
  return state.merge({
    tags: sortedTags,
    fetching: false
  });
};
export const tagsFailure = state =>
  state.merge({ fetching: false, error: true, payload: null });

export const coinRemoveRequest = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null });

export const coinRemoveSuccess = state => {
  return state.merge({ fetching: false, error: null });
};
export const coinRemoveFailure = state =>
  state.merge({ fetching: false, error: true });

export const reset = state => {
  return INITIAL_STATE;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEGOTIATION_CREATE_REQUEST]: createRequest,
  [Types.NEGOTIATION_CREATE_SUCCESS]: createSuccess,
  [Types.NEGOTIATION_CREATE_FAILURE]: createFailure,
  [Types.NEGOTIATIONS_LIST_REQUEST]: listRequest,
  [Types.NEGOTIATIONS_LIST_SUCCESS]: listSuccess,
  [Types.NEGOTIATIONS_LIST_FAILURE]: listFailure,
  [Types.NEGOTIATION_REQUEST]: request,
  [Types.NEGOTIATION_SUCCESS]: success,
  [Types.NEGOTIATION_FAILURE]: failure,
  [Types.NEGOTIATION_INFO_REQUEST]: infoRequest,
  [Types.NEGOTIATION_INFO_SUCCESS]: infoSuccess,
  [Types.NEGOTIATION_INFO_FAILURE]: infoFailure,
  [Types.NEGOTIATION_REMOVE_REQUEST]: removeRequest,
  [Types.NEGOTIATION_REMOVE_SUCCESS]: removeSuccess,
  [Types.NEGOTIATION_REMOVE_FAILURE]: removeFailure,
  [Types.NEGOTIATION_TOPICS_REQUEST]: topicsRequest,
  [Types.NEGOTIATION_TOPICS_SUCCESS]: topicsSuccess,
  [Types.NEGOTIATION_TOPICS_FAILURE]: topicsFailure,
  [Types.NEGOTIATION_TOPIC_QUESTIONS_REQUEST]: questionsRequest,
  [Types.NEGOTIATION_TOPIC_QUESTIONS_SUCCESS]: questionsSuccess,
  [Types.NEGOTIATION_TOPIC_QUESTIONS_FAILURE]: questionsFailure,
  [Types.NEGOTIATION_SEND_ANSWERS_REQUEST]: sendAnswersRequest,
  [Types.NEGOTIATION_SEND_ANSWERS_SUCCESS]: sendAnswersSuccess,
  [Types.NEGOTIATION_SEND_ANSWERS_FAILURE]: sendAnswersFailure,
  [Types.NEGOTIATION_EDIT_ANSWERS_REQUEST]: editAnswersRequest,
  [Types.NEGOTIATION_EDIT_ANSWERS_SUCCESS]: editAnswersSuccess,
  [Types.NEGOTIATION_EDIT_ANSWERS_FAILURE]: editAnswersFailure,
  [Types.NEGOTIATION_REPORT_REQUEST]: reportRequest,
  [Types.NEGOTIATION_REPORT_SUCCESS]: reportSuccess,
  [Types.NEGOTIATION_REPORT_FAILURE]: reportFailure,
  [Types.NEGOTIATION_COIN_REMOVE_REQUEST]: coinRemoveRequest,
  [Types.NEGOTIATION_COIN_REMOVE_SUCCESS]: coinRemoveSuccess,
  [Types.NEGOTIATION_COIN_REMOVE_FAILURE]: coinRemoveFailure,
  [Types.SET_ANSWERS]: setAnswers,
  [Types.SET_CURRENT]: setCurrent,
  [Types.SET_CURRENT_TOPIC]: setCurrentTopic,
  [Types.SET_TUTORIAL]: setTutorial,
  [Types.NEGOTIATIONS_TAGS_REQUEST]: tagsRequest,
  [Types.NEGOTIATIONS_TAGS_SUCCESS]: tagsSuccess,
  [Types.NEGOTIATIONS_TAGS_FAILURE]: tagsFailure,
  [Types.NEGOTIATIONS_RESET]: reset
});
