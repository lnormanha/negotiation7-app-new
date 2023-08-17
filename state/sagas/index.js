import { takeLatest, all } from "redux-saga/effects";
import API from "../../services/Api";

/* ------------- Types ------------- */

import { StartupTypes } from "../redux/startup/StartupRedux";
import { NegotiationsTypes } from "../redux/negotiations/NegotiationsRedux";
import { LoginTypes } from "../redux/login/LoginRedux";
import { SignUpTypes } from "../redux/sign-up/SignUpRedux";
import { UserTypes } from "../redux/user/UserRedux";
import { VerifyEmailTypes } from "../redux/verify-email/VerifyEmailRedux";
import { SubscriptionTypes } from "../redux/subscription/SubscriptionRedux";

/* ------------- Sagas ------------- */

import { startup } from "./StartupSagas";
import { login } from "./LoginSagas";
import {
  getUserNegotiations,
  getNegotiationTopics,
  getTopicQuestions,
  getReport,
  createNegotiation,
  getNegotiation,
  sendAnswers,
  editAnswers,
  getUserTags,
  removeNegotiation,
  removeCoin,
} from "./NegotiationsSagas";
import { signUp } from "./SignUpSagas";
import {
  getUserInfo,
  editUser,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "./UserSagas";
import { verifyEmail } from "./VerifyEmailSagas";
import { purchaseSubscription, requestSubscription } from "./SubscriptionSagas";
import { from } from "seamless-immutable";

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(
      NegotiationsTypes.NEGOTIATIONS_LIST_REQUEST,
      getUserNegotiations,
      api
    ),
    takeLatest(NegotiationsTypes.NEGOTIATIONS_TAGS_REQUEST, getUserTags, api),
    takeLatest(
      NegotiationsTypes.NEGOTIATION_TOPICS_REQUEST,
      getNegotiationTopics,
      api
    ),
    takeLatest(
      NegotiationsTypes.NEGOTIATION_TOPIC_QUESTIONS_REQUEST,
      getTopicQuestions,
      api
    ),
    takeLatest(NegotiationsTypes.NEGOTIATION_REPORT_REQUEST, getReport, api),
    takeLatest(
      NegotiationsTypes.NEGOTIATION_CREATE_REQUEST,
      createNegotiation,
      api
    ),
    takeLatest(NegotiationsTypes.NEGOTIATION_INFO_REQUEST, getNegotiation, api),
    takeLatest(
      NegotiationsTypes.NEGOTIATION_REMOVE_REQUEST,
      removeNegotiation,
      api
    ),
    takeLatest(
      NegotiationsTypes.NEGOTIATION_SEND_ANSWERS_REQUEST,
      sendAnswers,
      api
    ),
    takeLatest(
      NegotiationsTypes.NEGOTIATION_EDIT_ANSWERS_REQUEST,
      editAnswers,
      api
    ),
    takeLatest(
      NegotiationsTypes.NEGOTIATION_COIN_REMOVE_REQUEST,
      removeCoin,
      api
    ),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(SignUpTypes.SIGN_UP_REQUEST, signUp, api),
    takeLatest(UserTypes.USER_REQUEST, getUserInfo, api),
    takeLatest(UserTypes.USER_EDIT_REQUEST, editUser, api),
    takeLatest(
      SubscriptionTypes.SUBSCRIPTION_REQUEST,
      purchaseSubscription,
      api
    ),
    takeLatest(VerifyEmailTypes.VERIFY_EMAIL_REQUEST, verifyEmail, api),
    takeLatest(
      SubscriptionTypes.SUBSCRIPTION_DATA_REQUEST,
      requestSubscription,
      api
    ),
    takeLatest(
      UserTypes.USER_FORGOT_PASSWORD_REQUEST,
      forgotPasswordRequest,
      api
    ),
    takeLatest(
      UserTypes.USER_RESET_PASSWORD_REQUEST,
      resetPasswordRequest,
      api
    ),
  ]);
}
