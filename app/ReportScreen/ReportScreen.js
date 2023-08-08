import React, {Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {Header} from '../../components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import NegotiationsActions from '../../state/redux/negotiations//NegotiationsRedux';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from 'expo-sharing';

import {mapToHtml} from '../../services//CreatePDFReport';


import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

import {
  Container,
  ContainerList,
  TopMargin,
  InfoLabel,
  InfoAnswer,
  InfoMargin,
  TopicAnswersContainer,
  TopicHeader,
  TopicHeaderIcon,
  TopicHeaderInfo,
  TopicHeaderTitle,
  TopicHeaderQtyQuestion,
  TopicAnswersHeaders,
  TopicAnswerHeader,
  TopicAnswerTitle,
  TopicAnswerContainer,
  TopicAnswerText,
  TradeCoinTitleContainer,
  TradeCoinTitle,
  TradeCoinQuestionContainer,
  TradeCoinQuestionLabel,
  TradeCoinQuestionAnswer,
  RemoveCoinLabel,
  RemoveCoinButton,
} from './ReportScreenStyles';
import {Icons} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';

class ReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [
        Icons.header_neg,
        Icons.object,
        Icons.objective,
        Icons.interests,
        Icons.macna,
        Icons.trade_coin,
        Icons.neg_field,
        Icons.questions,
      ],
    };
  }

  async createPDF(showAlert) {
    const {negotiations, user, language} = this.props;
    const {current, report} = negotiations;
    let data = {
      report,
      name: user.payload.name,
      locale: language.selected,
    };
    let options = {
      height: 842,
      width: 595,
      html: mapToHtml(data),
      fileName: `NEGOTIATION7-Report-${current.title}`,
      directory: 'Documents',
    };
    // let file = await RNHTMLtoPDF.convert(options);
    this.setState({filePath: file.filePath});
    if (showAlert) {
      Alert.alert(`PDF Salvo com sucesso em: ${file.filePath}`);
    }
  }

  async sharePDF() {
    await this.createPDF();

    let filePath = `file://${this.state.filePath}`;
    let type = 'application/pdf';

    if (Platform.OS == 'ios') {
      await Sharing.shareAsync(filePath)
      Share.open({
        url: filePath,
        mimeType: type,
      })
        .then(resShare => {
          console.log({resShare});
        })
        .catch(err => {
          err && console.log({err});
        });
    } else {
      this.sharePDFWithAndroid(filePath, type);
    }
  }

  async sharePDFWithAndroid(pdfPath, type) {
    Sharing.shareAsync(pdfPath);
  }

  async requestStoragePermissionCreate() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissão para armazenamento externo',
          message:
            'Negociação 7.0 precisa acessar seu armazenameto ' +
            'para salvar o relatório.',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.createPDF(true);
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async requestStoragePermissionShare() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissão para armazenamento externo',
          message:
            'Negociação 7.0 precisa acessar seu armazenameto ' +
            'para salvar o relatório.',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.sharePDF();
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  goToQuestions(topic) {
    this.props.negotiationTopicQuestionsRequest({
      id: topic.id,
      language: this.props.language.selected,
    });
    this.props.setCurrentTopic(topic);
    this.props.navigation.navigate('TopicScreen');
  }

  removeCoin(coin) {
    const {negotiations, user} = this.props;
    const {current, report} = negotiations;
    const payload = {
      id: current.id,
      coin_id: coin.id,
    };

    this.props.negotiationCoinRemoveRequest(payload);
  }

  renderItem(item, index) {
    const {negotiations} = this.props;
    if (index < 7) {
      if (index != 5) {
        if (index != 0 && index != 1) {
          return this.renderReportTopic(item, index);
        }
      } else {
        return this.renderReportCoin(item, index);
      }
    } else {
      return this.renderReportBottom(item, index);
    }
  }

  renderReportHeader() {
    const {negotiations} = this.props;
    const {report} = negotiations;

    return (
      <FlatList
        data={report}
        renderItem={({item, index}) => this.renderReportHeaderItem(item, index)}
      />
    );
  }

  renderReportHeaderItem(item, index) {
    if (index < 2) {
      if (index == 0) {
        return (
          <View>
            <TopMargin />
            <InfoLabel>{i18n.t('clientLabel')}</InfoLabel>
            <InfoAnswer>
              {item.questions[0].answer?.answer || i18n.t('noResponse')}
            </InfoAnswer>
            <TopMargin />
            <InfoLabel>{i18n.t('negotiationPlace')}</InfoLabel>
            <InfoAnswer>
              {item.questions[1].answer?.answer || i18n.t('noResponse')}
            </InfoAnswer>
            <TopMargin />
            <InfoLabel>{i18n.t('negotiationDate')}</InfoLabel>
            <InfoAnswer>
              {item.questions[2].answer?.answer || i18n.t('noResponse')}
            </InfoAnswer>
            <TopMargin />
            <InfoLabel>{i18n.t('negotiationTime')}</InfoLabel>
            <InfoAnswer>
              {item.questions[3].answer?.answer || i18n.t('noResponse')}
            </InfoAnswer>
            <TopMargin />
          </View>
        );
      } else {
        return (
          <View>
            <InfoLabel>{i18n.t('objectNegotiationLabel')}</InfoLabel>
            <InfoAnswer>
              {item.questions[0].answer?.answer || i18n.t('noResponse')}
            </InfoAnswer>
            <TopMargin />
          </View>
        );
      }
    }
  }

  renderReportTopic(item, index) {
    const {negotiations} = this.props;
    return (
      <View>
        <TopicAnswersContainer>
          <TopicHeader onPress={() => this.goToQuestions(item)}>
            <TopicHeaderIcon icon={this.state.icons[index]} />
            <TopicHeaderInfo>
              <TopicHeaderTitle>{item.name}</TopicHeaderTitle>
              <TopicHeaderQtyQuestion>
                {negotiations.topics[index].qtd_answer}{' '}
                {i18n.t('negotiationTopicQuestionsOf')}{' '}
                {negotiations.topics[index].qtd_questions}{' '}
                {i18n.t('negotiationTopicQuestionsText')}
              </TopicHeaderQtyQuestion>
            </TopicHeaderInfo>
          </TopicHeader>
          <TopicAnswersHeaders>
            <TopicAnswerHeader leftPos>
              <TopicAnswerTitle>{i18n.t('oursLabel')}</TopicAnswerTitle>
            </TopicAnswerHeader>
            <TopicAnswerHeader rightPos>
              <TopicAnswerTitle>{i18n.t('theirsLabel')}</TopicAnswerTitle>
            </TopicAnswerHeader>
          </TopicAnswersHeaders>
          {item.questions.map((question, qindex) => {
            return (
              <TopicAnswerContainer
                leftPos={qindex == 0}
                rightPos={qindex == 1}>
                <TopicAnswerText>
                  {question?.answer?.answer || i18n.t('noResponse')}
                </TopicAnswerText>
              </TopicAnswerContainer>
            );
          })}
        </TopicAnswersContainer>
      </View>
    );
  }

  renderReportCoin(item, index) {
    const {negotiations, user} = this.props;
    return (
      <View>
        <TopicAnswersContainer>
          <TopicHeader onPress={() => this.goToQuestions(item)}>
            <TopicHeaderIcon icon={this.state.icons[index]} />
            <TopicHeaderInfo>
              <TopicHeaderTitle>{item.name}</TopicHeaderTitle>
              <TopicHeaderQtyQuestion>
                {negotiations.topics[index].qtd_answer}{' '}
                {i18n.t('negotiationTopicQuestionsOf')}{' '}
                {negotiations.topics[index].qtd_questions}{' '}
                {i18n.t('negotiationTopicQuestionsText')}
              </TopicHeaderQtyQuestion>
            </TopicHeaderInfo>
          </TopicHeader>
          {item.coins ? (
            item.coins.map((coin, qindex) => {
              return (
                <View style={{width: '100%'}}>
                  <TradeCoinTitleContainer>
                    <TradeCoinTitle>{coin.name}</TradeCoinTitle>

                    <RemoveCoinButton onPress={() => this.removeCoin(coin)}>
                      <RemoveCoinLabel>{i18n.t('delete')}</RemoveCoinLabel>
                    </RemoveCoinButton>
                  </TradeCoinTitleContainer>
                  <TradeCoinQuestionContainer>
                    <TradeCoinQuestionLabel>
                      {i18n.t('initialOffer')}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.initial_offer.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                  <TradeCoinQuestionContainer>
                    <TradeCoinQuestionLabel>
                      {i18n.t('desiredValue')}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.desired_value.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                  <TradeCoinQuestionContainer>
                    <TradeCoinQuestionLabel>
                      {i18n.t('departurePoint')}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.departure_point.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                  <TradeCoinQuestionContainer lastIndex>
                    <TradeCoinQuestionLabel>
                      {i18n.t('desiredValueTheirs')}
                    </TradeCoinQuestionLabel>
                    <TradeCoinQuestionAnswer>
                      {coin.desired_value_of_them.answer}
                    </TradeCoinQuestionAnswer>
                  </TradeCoinQuestionContainer>
                </View>
              );
            })
          ) : (
            <TradeCoinTitleContainer>
              <TradeCoinTitle>{i18n.t('noCoins')}</TradeCoinTitle>
            </TradeCoinTitleContainer>
          )}
        </TopicAnswersContainer>
      </View>
    );
  }

  renderReportBottom(item, index) {
    const {negotiations} = this.props;
    const {report} = negotiations;
    return (
      <View>
        <TopicAnswersContainer>
          <TopicHeader>
            <TopicHeaderIcon icon={this.state.icons[index]} />
            <TopicHeaderInfo>
              <TopicHeaderTitle>{item.name}</TopicHeaderTitle>
              <TopicHeaderQtyQuestion>
                {negotiations.topics[index].qtd_answer}{' '}
                {i18n.t('negotiationTopicQuestionsOf')}{' '}
                {negotiations.topics[index].qtd_questions}{' '}
                {i18n.t('negotiationTopicQuestionsText')}
              </TopicHeaderQtyQuestion>
            </TopicHeaderInfo>
          </TopicHeader>
          <InfoAnswer font>
            {item.questions[0].answer && item.questions[0].answer.answer
              ? item.questions[0].answer.answer
              : i18n.t('noResponse')}
          </InfoAnswer>
        </TopicAnswersContainer>
      </View>
    );
  }

  saveReport() {
    if (Platform.OS == 'ios') {
      this.sharePDF();
    } else {
      this.requestStoragePermissionShare();
    }
  }

  render() {
    const {negotiations, user} = this.props;
    const {report, fetching} = negotiations;
    const {payload} = user;

    return (
      <Container>
        <Header
          title={i18n.t('reportHeader')}
          showLeftButton
          onPressLeft={() => this.props.navigation.goBack()}
          showRightButton
          rightIcon={Icons.share}
          onPressRight={() => this.saveReport()}
        />
        {fetching ? (
          <View
            style={{
              flex: 0.9,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <ScrollView>
            {this.renderReportHeader()}
            <ContainerList>
              <FlatList
                data={report}
                renderItem={({item, index}) => this.renderItem(item, index)}
              />
            </ContainerList>
            <TopMargin />
          </ScrollView>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    negotiations: state.negotiations,
    language: state.language,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  const {
    negotiationTopicsRequest,
    negotiationTopicQuestionsRequest,
    setCurrentTopic,
    negotiationReportRequest,
    negotiationRemoveRequest,
    negotiationCoinRemoveRequest,
  } = NegotiationsActions;

  return bindActionCreators(
    {
      negotiationTopicsRequest,
      negotiationTopicQuestionsRequest,
      setCurrentTopic,
      negotiationReportRequest,
      negotiationRemoveRequest,
      negotiationCoinRemoveRequest,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportScreen);
