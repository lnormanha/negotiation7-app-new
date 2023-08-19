import { call, put } from "redux-saga/effects";
import { Alert } from "react-native";
import NegotiationsActions from "../redux/negotiations/NegotiationsRedux";
import SignUpActions from "../redux/sign-up/SignUpRedux";
import UserActions from "../redux/user/UserRedux";
import { router } from "expo-router";

export function* signUp(api, action) {
  const { data } = action;

  try {
    const response = yield call(api.createUser, data);

    if (response.ok) {
      yield put(SignUpActions.signUpSuccess(response.data));
      yield put(NegotiationsActions.negotiationsTagsRequest(response.data.id));
      yield put(UserActions.userRequest(response.data.id));
      router.push("home");
    } else {
      yield put(Alert.alert(response.data.message));
      yield put(SignUpActions.signUpFailure());
    }
  } catch (err) {
    yield put(Alert.alert("Falha ao realizar o cadastro"));
    yield put(SignUpActions.signUpFailure());
  }
}
