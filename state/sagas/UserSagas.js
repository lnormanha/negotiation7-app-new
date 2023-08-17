import { call, put } from "redux-saga/effects";
import UserActions from "../redux/user/UserRedux";
import NegotiationsActions from "../redux/negotiations/NegotiationsRedux";
import VerifyEmailActions from "../redux/verify-email/VerifyEmailRedux";
import { router } from "expo-router";
import { Alert } from "react-native";

// import { UserSelectors } from '../Redux/UserRedux'

export function* getUserInfo(api, action) {
  const { data } = action;
  try {
    const response = yield call(api.getUserInfo, data);
    if (response.ok) {
      yield put(UserActions.userSuccess(response.data));
      yield put(NegotiationsActions.negotiationsTagsRequest(response.data.id));
    } else {
      yield put(UserActions.userFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao pegar os dados do usuário");
    yield put(UserActions.userFailure());
  }
}

export function* editUser(api, action) {
  const { data } = action;
  try {
    const response = yield call(api.editUser, data);
    if (response.ok) {
      yield put(UserActions.userEditSuccess(response.data));
      yield put(UserActions.userRequest(data.id));
      yield put(VerifyEmailActions.verifyEmailFailure());

      yield put(router.push("home"));
      // yield put(
      //   NavigationActions.navigate({
      //     routeName: "HomeScreen",
      //     key: "LoginVerify",
      //   })
      // );
    } else {
      Alert.alert(response.data.message);
      yield put(UserActions.userEditFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao editar o usuário");
    yield put(UserActions.userEditFailure());
  }
}

export function* forgotPasswordRequest(api, action) {
  const { data } = action;
  try {
    const response = yield call(api.forgotPassword, data);
    if (response.ok) {
      yield put(
        StackActions.push({
          routeName: "EmailAuthScreen",
          params: { resetPassword: true },
        })
      );
      yield put(UserActions.userForgotPasswordSuccess());
    } else {
      Alert.alert(response.data.message);
      yield put(UserActions.userForgotPasswordFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao recuperar a senha!");
    yield put(UserActions.userForgotPasswordFailure());
  }
}

export function* resetPasswordRequest(api, action) {
  const { data } = action;
  try {
    const response = yield call(api.resetPassword, data);
    if (response.ok) {
      Alert.alert("Senha recuperada com sucesso!");
      yield put(router.push("login"));

      // yield put(
      //   StackActions.pop({
      //     n: 3,
      //   })
      // );
      yield put(UserActions.userResetPasswordSuccess());
    } else {
      Alert.alert(response.data.message);
      yield put(UserActions.userResetPasswordFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao alterar a senha!");
    yield put(UserActions.userResetPasswordFailure());
  }
}
