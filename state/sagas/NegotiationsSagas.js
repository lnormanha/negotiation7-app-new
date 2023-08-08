import { call, put, select } from "redux-saga/effects";
import NegotiationsActions, {
  NegotiationsSelectors,
} from "../redux/negotiations/NegotiationsRedux";
import { router } from "expo-router";
import { UserSelectors } from "../redux/user/UserRedux";
import { LanguageSelectors } from "../redux/languages/LanguageRedux";
import { mapAnswersArray } from "../../services/GetAnswersArray";
import { Alert } from "react-native";

export const selectNegotiations = NegotiationsSelectors.getNegotiations;
export const selectCurrentTopic = NegotiationsSelectors.getCurrentTopic;
export const selectTopics = NegotiationsSelectors.getTopics;
export const selectCurrent = NegotiationsSelectors.getCurrent;
export const selectLanguage = LanguageSelectors.getLanguage;
export const getUserId = UserSelectors.getId;

export function* getUserNegotiations(api, action) {
  const { data } = action;

  try {
    const response = yield call(api.getUserNegotiations, data);

    if (response.ok) {
      yield put(NegotiationsActions.negotiationsListSuccess(response.data));
    } else {
      yield put(NegotiationsActions.negotiationsListFailure());
    }
  } catch (err) {
    yield put(NegotiationsActions.negotiationsListFailure());
  }
}

export function* getUserTags(api, action) {
  const { data } = action;

  try {
    const response = yield call(api.getTags, data);

    if (response.ok) {
      yield put(NegotiationsActions.negotiationsTagsSuccess(response.data));
    } else {
      yield put(NegotiationsActions.negotiationsTagsFailure());
    }
  } catch (err) {
    yield put(NegotiationsActions.negotiationsTagsFailure());
  }
}

export function* getNegotiationTopics(api, action) {
  const { data } = action;

  try {
    const response = yield call(api.getNegotiationTopics, data);

    if (response.ok) {
      yield put(NegotiationsActions.negotiationTopicsSuccess(response.data));
    } else {
      yield put(NegotiationsActions.negotiationTopicsFailure());
    }
  } catch (err) {
    yield put(NegotiationsActions.negotiationTopicsFailure());
  }
}

export function* getTopicQuestions(api, action) {
  const current = yield select(selectCurrent);
  const language = yield select(selectLanguage);

  const { data } = action;
  try {
    const response = yield call(api.getTopicQuestions, data);
    if (response.ok) {
      yield put(
        NegotiationsActions.negotiationReportRequest({
          id: current.id,
          language: language,
        })
      );
      const negotiations = yield select(selectNegotiations);
      const payload = mapAnswersArray(negotiations, response.data);
      yield put(
        NegotiationsActions.negotiationTopicQuestionsSuccess(response.data)
      );
      yield put(NegotiationsActions.setAnswers(payload));
    } else {
      yield put(NegotiationsActions.negotiationTopicQuestionsFailure());
    }
  } catch (err) {
    yield put(NegotiationsActions.negotiationTopicQuestionsFailure());
  }
}

export function* getReport(api, action) {
  const { data } = action;
  //yield put(NegotiationsActions.negotiationReportSuccess([]));
  try {
    const response = yield call(api.getNegotiationReport, data);

    if (response.ok) {
      yield put(NegotiationsActions.negotiationReportSuccess(response.data));
    } else {
      yield put(NegotiationsActions.negotiationReportFailure());
    }
  } catch (err) {
    yield put(NegotiationsActions.negotiationReportFailure());
  }
}

export function* createNegotiation(api, action) {
  const { data } = action;
  const language = yield select(selectLanguage);

  try {
    const response = yield call(api.createNegotiation, data);

    if (response.ok) {
      yield put(NegotiationsActions.negotiationCreateSuccess(response.data));
      yield put(NegotiationsActions.negotiationsListRequest(data.body.id_user));
      yield put(NegotiationsActions.negotiationsTagsRequest(data.body.id_user));
      yield put(NegotiationsActions.setCurrent(response.data));
      yield put(
        NegotiationsActions.negotiationTopicsRequest({
          id: response.data.id,
          language,
        })
      );
      console.log({ negoRes: response.data });

      yield put(router.push("negotiation"));
      // yield put(
      //   NavigationActions.navigate({
      //     routeName: "NegotiationScreen",
      //     key: "CreateNegotiation",
      //   })
      // );
    } else {
      Alert.alert(response.data.message);
      yield put(NegotiationsActions.negotiationCreateFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao criar a negociação!");
    yield put(NegotiationsActions.negotiationCreateFailure());
  }
}

export function* getNegotiation(api, action) {
  const { data } = action;
  const response = yield call(api.getNegotiation, data);

  try {
    if (response.ok) {
      yield put(NegotiationsActions.negotiationInfoSuccess(response.data));
    } else {
      yield put(NegotiationsActions.negotiationInfoFailure());
    }
  } catch (err) {
    yield put(NegotiationsActions.negotiationInfoFailure());
  }
}

export function* removeNegotiation(api, action) {
  const { data } = action;

  try {
    const response = yield call(api.removeNegotiation, data);
    if (response.ok) {
      yield put(NegotiationsActions.negotiationRemoveSuccess(response.data));
      yield put(NegotiationsActions.negotiationsListRequest(data.user_id));
      yield put(NegotiationsActions.negotiationsTagsRequest(data.user_id));
      yield put(NavigationActions.back({ key: "Home" }));
    } else {
      Alert.alert(response.data.message);
      yield put(NegotiationsActions.negotiationRemoveFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao remover a negociação!");
    yield put(NegotiationsActions.negotiationRemoveFailure());
  }
}

export function* sendAnswers(api, action) {
  const { data } = action;

  // get current data from Store
  const current_topic = yield select(selectCurrentTopic);
  const topics = yield select(selectTopics);
  const current = yield select(selectCurrent);

  const nextTopic = topics[current_topic.id];
  const language = yield select(selectLanguage);
  const userId = yield select(getUserId);

  try {
    const response = yield call(api.sendAnswers, data);

    if (response.ok) {
      yield put(
        NegotiationsActions.negotiationSendAnswersSuccess(response.data)
      );
      if (current_topic.id == 8) {
        yield put(NavigationActions.back());
        yield put(
          NegotiationsActions.negotiationTopicsRequest({
            id: current.id,
            language,
          })
        );
        yield put(
          NegotiationsActions.negotiationReportRequest({
            id: current.id,
            language,
          })
        );
        yield put(NegotiationsActions.negotiationsListRequest(userId));
        yield put(NegotiationsActions.negotiationInfoRequest(current.id));
      } else {
        if (data.addCoin) {
          yield put(
            NegotiationsActions.negotiationTopicsRequest({
              id: current.id,
              language,
            })
          );
          yield put(
            NegotiationsActions.negotiationTopicQuestionsRequest({
              id: nextTopic.id - 1,
              language,
            })
          );
          yield put(NegotiationsActions.setCurrentTopic(current_topic));
          yield put(NegotiationsActions.negotiationInfoRequest(current.id));
        } else {
          yield put(
            NegotiationsActions.negotiationTopicsRequest({
              id: current.id,
              language,
            })
          );
          yield put(
            NegotiationsActions.negotiationTopicQuestionsRequest({
              id: nextTopic.id,
              language,
            })
          );
          yield put(NegotiationsActions.setCurrentTopic(nextTopic));
          yield put(NegotiationsActions.negotiationInfoRequest(current.id));
        }
      }
    } else {
      Alert.alert(response.data.message);
      yield put(NegotiationsActions.negotiationSendAnswersFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao enviar a resposta!");
    yield put(NegotiationsActions.negotiationSendAnswersFailure());
  }
}

export function* editAnswers(api, action) {
  const { data } = action;

  // get current data from Store
  const current_topic = yield select(selectCurrentTopic);
  const topics = yield select(selectTopics);
  const current = yield select(selectCurrent);

  const nextTopic = topics[current_topic.id];
  const language = yield select(selectLanguage);

  try {
    const response = yield call(api.editAnswers, data);

    if (response.ok) {
      yield put(
        NegotiationsActions.negotiationEditAnswersSuccess(response.data)
      );
      if (current_topic.id == 8) {
        yield put(NavigationActions.back());
        yield put(
          NegotiationsActions.negotiationTopicsRequest({
            id: current.id,
            language,
          })
        );
        yield put(
          NegotiationsActions.negotiationReportRequest({
            id: current.id,
            language,
          })
        );
        yield put(NegotiationsActions.negotiationsListRequest(current.id));
      } else {
        if (data.addCoin) {
          yield put(
            NegotiationsActions.negotiationTopicsRequest({
              id: current.id,
              language,
            })
          );
          yield put(
            NegotiationsActions.negotiationTopicQuestionsRequest({
              id: nextTopic.id - 1,
              language,
            })
          );
          yield put(NegotiationsActions.setCurrentTopic(current_topic));
        } else {
          yield put(
            NegotiationsActions.negotiationTopicsRequest({
              id: current.id,
              language,
            })
          );
          console.log({ nextTopic });
          yield put(
            NegotiationsActions.negotiationTopicQuestionsRequest({
              id: nextTopic.id,
              language,
            })
          );
          yield put(NegotiationsActions.setCurrentTopic(nextTopic));
        }
      }
    } else {
      Alert.alert(response.data.message);
      yield put(NegotiationsActions.negotiationSendAnswersFailure());
    }
  } catch (err) {
    Alert.alert("Falha ao editar a resposta!");
    yield put(NegotiationsActions.negotiationSendAnswersFailure());
  }
}

export function* removeCoin(api, action) {
  const { data } = action;
  const current = yield select(selectCurrent);
  const language = yield select(selectLanguage);

  try {
    const response = yield call(api.removeCoin, data);
    if (response.ok) {
      yield put(NegotiationsActions.negotiationCoinRemoveSuccess());
      yield put(
        NegotiationsActions.negotiationReportRequest({
          id: current.id,
          language,
        })
      );
    } else {
      yield put(NegotiationsActions.negotiationCoinRemoveFailure());
    }
  } catch (err) {
    Alert.alert("Erro ao remover a moeda de troca!");
    yield put(NegotiationsActions.negotiationCoinRemoveFailure());
  }
}
