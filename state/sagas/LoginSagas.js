import { call, put } from "redux-saga/effects";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginActions from "../redux/login/LoginRedux";
import NegotiationsActions from "../redux/negotiations/NegotiationsRedux";
import UserActions from "../redux/user/UserRedux";
import VerifyEmailActions from "../redux/verify-email/VerifyEmailRedux";
import { router } from "expo-router";

// import { LoginSelectors } from '../Redux/LoginRedux'

export function* login(api, action) {
  const { data } = action;

  try {
    const response = yield call(api.login, data);

    if (response.ok) {
      yield put(LoginActions.loginSuccess(response.data));
      yield put(UserActions.userSuccess(response.data));
      yield put(NegotiationsActions.negotiationsListRequest(response.data.id));
      yield put(NegotiationsActions.negotiationsTagsRequest(response.data.id));
      yield put(VerifyEmailActions.verifyEmailFailure());

      yield put(UserActions.userSuccess(response.data));
      AsyncStorage.setItem("user_id", response.data.id.toString());
      router.push("home");
      // yield put(
      //   NavigationActions.navigate({
      //     routeName: "HomeScreen",
      //     key: "LoginVerify",
      //   })
      // );
    } else {
      Alert.alert(response.data.message);
      yield put(LoginActions.loginFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao realizar o Login!");
    yield put(LoginActions.loginFailure());
  }
}
