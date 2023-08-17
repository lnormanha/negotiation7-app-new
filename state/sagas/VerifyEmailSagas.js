/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.ts
 *  - This template uses the api declared in sagas/index.ts, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put } from "redux-saga/effects";
import VerifyEmailActions from "../redux/verify-email/VerifyEmailRedux";
import { router } from "expo-router";
// import { VerifyEmailSelectors } from '../Redux/VerifyEmailRedux'
import { Alert } from "react-native";

export function* verifyEmail(api, action) {
  const { data } = action;
  // get current data from Store
  // const currentData = yield select(VerifyEmailSelectors.getData)
  // make the call to the api
  try {
    const response = yield call(api.verifyEmail, data);

    // success?
    if (response.ok) {
      const { data } = response;
      // You might need to change the response here - do this with a 'transform',
      // located in ../Transforms/. Otherwise, just pass the data back from the api.
      yield put(VerifyEmailActions.verifyEmailSuccess(response.data));

      if (data.have_password) {
        console.warn("HAVE PASSWORD");
        router.push("email-auth?login=true");
      } else {
        yield put(router.push("email-auth?password=true"));
      }
    } else {
      yield put(
        router.push(`email-auth?account=true&email=${action.data.email}`)
      );

      yield put(VerifyEmailActions.verifyEmailFailure());
    }
  } catch (err) {
    console.warn({ err });
    Alert.alert("Falha ao verificar o e-mail!");
    yield put(VerifyEmailActions.verifyEmailFailure());
  }
}
