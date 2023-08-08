// a library to wrap and simplify api calls
import apisauce from "apisauce";

const devUrl = "https://dev-negotiation-api.herokuapp.com/";
const prodUrl = "https://prod-negotiation-api.herokuapp.com/";

// our "constructor"
const create = (baseURL = prodUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      "Cache-Control": "no-cache",
    },
    // 60 second timeout...
    timeout: 60000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const getUserInfo = (id) => api.get(`v2/users/${id}`);
  const getUserNegotiations = (id) => api.get(`users/${id}/negotiations`);
  const getNegotiation = (id) => api.get(`negotiations/${id}`);
  const getNegotiationTopics = ({ id, language }) =>
    api.get(`negotiations/${id}/topics/${language}`);
  const getTopicQuestions = ({ id, language }) =>
    api.get(`topics/${id}/questions/${language}`);
  const getNegotiationReport = ({ id, language }) =>
    api.get(`negotiations/${id}/report/${language}`);
  const login = ({ body }) => api.post("v2/login", body);
  const getLoginFacebook = (token) =>
    api.get(`auth/facebook/token?`, { access_token: token });

  const getTags = (id) => api.get(`users/${id}/tags`);

  const verifyEmail = (body) => api.post("user", body);

  const createUser = ({ body }) => api.post("users", body);
  const createNegotiation = ({ body }) => api.post("negotiations", body);
  const sendAnswers = ({ id, body }) =>
    api.post(`negotiations/${id}/answers`, body);
  const googleLogin = ({ body }) => api.post("v2/auth/google", body);
  const appleLogin = ({ body }) => api.post("v2/auth/apple", body);
  const editAnswers = ({ id, body }) =>
    api.put(`negotiations/${id}/answers`, body);
  const editUser = ({ id, body }) => api.put(`users/${id}`, body);

  const removeNegotiation = ({ id }) => api.delete(`negotiations/${id}`);

  const removeCoin = ({ id, coin_id }) =>
    api.delete(`negotiations/${id}/coins/${coin_id}`);
  const createSubscription = ({ body }) => api.post("subscriptions", body);
  const getSubscription = (id) => api.get(`user/${id}/subscription`);
  const forgotPassword = ({ body }) => api.post("/forgotPassword", body);
  const resetPassword = ({ body }) => api.post("/resetPassword", body);

  // ------
  // STEP 3
  // ------
  //x
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    getUserInfo,
    getUserNegotiations,
    getNegotiation,
    getNegotiationTopics,
    getTopicQuestions,
    getNegotiationReport,
    getLoginFacebook,
    createUser,
    createNegotiation,
    sendAnswers,
    editAnswers,
    editUser,
    verifyEmail,
    login,
    googleLogin,
    appleLogin,
    getTags,
    removeNegotiation,
    removeCoin,
    createSubscription,
    getSubscription,
    forgotPassword,
    resetPassword,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
