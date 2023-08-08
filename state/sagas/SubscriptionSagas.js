import { call, put } from "redux-saga/effects";
import SubscriptionActions from "../redux/subscription/SubscriptionRedux";

import { router } from "expo-router";
import UserActions from "../redux/user/UserRedux";
import { Alert } from "react-native";

// import { UserSelectors } from '../Redux/UserRedux'

export function* purchaseSubscription(api, action) {
  const { data } = action;
  try {
    const response = yield call(api.createSubscription, data);
    if (response.ok) {
      yield put(SubscriptionActions.subscriptionSuccess({ ...response.data }));
      const id = data.body.user_id;
      yield put(UserActions.userRequest(id));
      yield put(SubscriptionActions.subscriptionDataRequest(id));

      // yield put(StackActions.pop({ n: 2 }));
    } else {
      Alert.alert(response.data.message);
      yield put(SubscriptionActions.subscriptionFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao realizar a assinatura!");
    yield put(SubscriptionActions.subscriptionFailure());
  }
}

export function* requestSubscription(api, action) {
  const { data } = action;
  try {
    const response = yield call(api.getSubscription, data);
    if (response.ok) {
      yield put(SubscriptionActions.subscriptionDataSuccess(response.data));
    } else {
      //Alert.alert(response.data.message);

      yield put(SubscriptionActions.subscriptionDataFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao carregar a assinatura!");
    yield put(SubscriptionActions.subscriptionDataFailure());
  }
}
