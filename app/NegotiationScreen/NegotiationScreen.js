import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Header, Modal} from '../../components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from 'expo-sharing';

import NegotiationsActions from '../../state/redux/negotiations/NegotiationsRedux';
import {mapToHtml} from '../../services/CreatePDFReport';

import {
  Container,
  Content,
  NegotiationProgress,
  ContainerList,
  TopMargin,
  TopicContainer,
  TopicInfoContent,
  TopicTitle,
  TopicQtyQuestion,
  InfoIconsArea,
  InfoIconsRow,
  InfoIcon,
  InfoIconsText,
  InfoTitleArea,
  InfoTitle,
  Arrow,
  OptionArea,
  OptionButton,
  Icon,
  PremiumContainer,
  PremiumImage,
  PremiumTitle,
  PremiumText,
  PremiumArrowIcon,
  TitlePremiumContainer,
  ImagePremiumContainer,
  TopicIcon,
  TutorialButtonContainer,
  TutorialButton,
  TutorialLabel,
} from './NegotiationScreenStyles';
import {Icons, Colors} from '../../constants';

import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

class NegotiationScreen extends Component {
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
      filePath: null,
      isModalVisible: false,
    };
  }

  componentDidUpdate() {
    this.getNegotiationProgress();
  }

  convertDate = date => {
    let day = date.substring(8, 10);
    let month = date.substring(5, 7);
    let year = date.substring(0, 4);
    return ` ${day}/${month}/${year}`;
  };
  

  goToQuestions(topic) {
    this.props.negotiationTopicQuestionsRequest({
      id: topic.id,
      language: this.props.language.selected,
    });
    this.props.setCurrentTopic(topic);
    this.props.navigation.navigate('TopicScreen');
  }

  goToReport() {
    const {negotiations, user, language} = this.props;
    const {current, report} = negotiations;
    this.props.negotiationReportRequest({
      id: current.id,
      language: language.selected,
    });
    this.props.navigation.navigate('ReportScreen');
  }

  async createPDF() {
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
    console.log('PDF Salvo com sucesso em: ', file.filePath);
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

  async requestStoragePermission() {
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

  getNegotiationProgress() {
    const {negotiations} = this.props;

    let totalSum = negotiations.topics?.reduce((accum, current) => {
      return accum + current.qtd_questions;
    }, 0);

    let sum = negotiations.topics?.reduce((accum, current) => {
      return accum + current.qtd_answer;
    }, 0);

    const percentage = ((sum / totalSum) * 100) / 100;
    return percentage;
  }
  renderItem(item, index) {
    const {negotiations} = this.props;
    const {report} = negotiations;
    return (
      <TopicContainer
        onPress={() => this.goToQuestions(item)}
        border={index != 7}>
        <TopicIcon icon={this.state.icons[index]} />
        <TopicInfoContent>
          <TopicTitle maxFontSizeMultiplier={1}>
            {item.name}
            {''}{' '}
            {index == 5 && report[index]?.coins
              ? `(${report[index].coins.length})`
              : ''}
          </TopicTitle>
          <TopicQtyQuestion>
            {item.qtd_answer} {i18n.t('negotiationTopicQuestionsOf')}{' '}
            {item.qtd_questions} {i18n.t('negotiationTopicQuestionsText')}
          </TopicQtyQuestion>
        </TopicInfoContent>
        <Arrow />
      </TopicContainer>
    );
  }

  openModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  removeNegotiation() {
    const {negotiations, navigation, user} = this.props;
    const {current} = negotiations;
    const {payload} = user;

    const api_payload = {
      id: current.id,
      user_id: payload.id,
    };

    this.props.negotiationRemoveRequest(api_payload);
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  getTime(date) {
    if (this.props.language.selected == 'en') {
      return new Date(date).toLocaleTimeString('en-US');
    } else {
      return new Date(date).toLocaleTimeString('pt-BR');
    }
  }

  render() {
    const {negotiations, navigation, user, subscription} = this.props;
    const {payload} = user;
    const {subscription_data} = subscription;
    const {current, fetching} = negotiations;
    return (
      <Container>
        <Header
          title={i18n.t('negotiationHeader')}
          isNegotiation
          onPressLeft={() => this.props.navigation.goBack('Home')}
          onPressReport={() => this.goToReport()}
        />
        {fetching ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.white,
              width: '100%',
            }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <Content>
              <InfoTitleArea>
                <View style={{width: 100}} />
                <InfoTitle>{current?.title}</InfoTitle>
                <TutorialButton
                  onPress={() =>
                    this.props.navigation.navigate('TutorialScreen', {
                      isNegotiation: true,
                    })
                  }>
                  <TutorialLabel>Tutorial</TutorialLabel>
                </TutorialButton>
              </InfoTitleArea>
              <InfoIconsArea>
                <InfoIconsRow>
                  <InfoIcon image={Icons.response} />
                  <InfoIconsText>
                    {current?.qtd_answers || '0'}{' '}
                    {i18n.t('negotiationResponsesLabel')}
                  </InfoIconsText>
                </InfoIconsRow>
                <InfoIconsRow>
                  <InfoIcon image={Icons.calendar} />
                  <InfoIconsText>
                    {current &&
                      this.convertDate(
                        current?.created_at || current?.createdAt,
                      )}{' '}
                    {current &&
                      this.getTime(current?.created_at || current?.createdAt)}
                  </InfoIconsText>
                </InfoIconsRow>
              </InfoIconsArea>
              <NegotiationProgress
                progress={this.getNegotiationProgress() || 0}
              />
              <TopMargin />
              <ContainerList>
                <FlatList
                  data={negotiations.topics}
                  renderItem={({item, index}) => this.renderItem(item, index)}
                  showsVerticalScrollIndicator={false}
                  extraData={negotiations.report}
                />
              </ContainerList>
              <TopMargin />
              <OptionArea>
                <OptionButton onPress={() => this.goToReport()}>
                  <Icon icon={Icons.preview} />
                </OptionButton>
                {!subscription_data?.hasExpired && (
                  <OptionButton
                    onPress={() =>
                      Platform.OS == 'ios'
                        ? this.sharePDF()
                        : this.requestStoragePermission()
                    }>
                    <Icon icon={Icons.share} />
                  </OptionButton>
                )}

                {!subscription_data?.hasExpired && (
                  <OptionButton
                    red
                    onPress={() => this.setState({isModalVisible: true})}>
                    <Icon icon={Icons.remove} />
                  </OptionButton>
                )}
              </OptionArea>
            </Content>
            {!subscription_data ||
              (subscription_data?.type === 'TRIAL' && (
                <PremiumContainer
                  onPress={() =>
                    this.props.navigation.navigate('SubscriptionScreen')
                  }>
                  <PremiumImage />
                  <TitlePremiumContainer>
                    <PremiumTitle>
                      {i18n.t('negotiationPremiumTitle')}
                    </PremiumTitle>
                    <PremiumText>
                      {i18n.t('negotiationPremiumText')}
                    </PremiumText>
                  </TitlePremiumContainer>
                  <PremiumArrowIcon />
                </PremiumContainer>
              ))}
          </ScrollView>
        )}
        <Modal
          title={i18n.t('deleteNegotiationTitle')}
          message={i18n.t('deleteNegotiationMessage')}
          onCancel={() => this.openModal()}
          onConfirm={() => this.removeNegotiation()}
          isVisible={this.state.isModalVisible}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    negotiations: state.negotiations,
    user: state.user,
    language: state.language,
    subscription: state.subscription,
  };
};

const mapDispatchToProps = dispatch => {
  const {
    negotiationTopicsRequest,
    negotiationTopicQuestionsRequest,
    setCurrentTopic,
    negotiationReportRequest,
    negotiationRemoveRequest,
  } = NegotiationsActions;

  return bindActionCreators(
    {
      negotiationTopicsRequest,
      negotiationTopicQuestionsRequest,
      setCurrentTopic,
      negotiationReportRequest,
      negotiationRemoveRequest,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NegotiationScreen);
