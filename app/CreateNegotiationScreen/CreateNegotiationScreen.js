import React, {Component} from 'react';
import {
  Container,
  FolderImage,
  InputMargin,
  ChooseTagLabel,
  TagContainer,
  Tag,
  TagLabel,
  AlignToBottom,
} from './CreateNegotiationScreenStyles';

import {ScrollView, View} from 'react-native';

import {Header, Input, Button} from '../../components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ScrollIntoView, wrapScrollView} from 'react-native-scroll-into-view';

import NegotiationsActions from '../../state/redux/negotiations/NegotiationsRedux';
import {FlatList} from 'react-native-gesture-handler';


import { I18n } from "i18n-js";

import en from "../../translations/en.json";
import pt from "../../translations/pt.json";

const translations = {
  en,
  pt,
};

const i18n = new I18n(translations);

const CustomScrollView = wrapScrollView(ScrollView);
const options = {
  align: 'top',
  animated: true,
  immediate: false,
  insets: {
    top: 150,
    bottom: 0,
  },
};

class CreateNegotiationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      tag: '',
      selectedTag: null,
    };
  }

  getTag() {
    if (this.state.selectedTag) {
      return this.state.selectedTag;
    } else {
      return {name: this.state.tag};
    }
  }

  createNegotiation() {
    const {user} = this.props;
    let payload;

    if (this.state.tag || this.state.selectedTag) {
      payload = {
        body: {
          id_user: user.payload.id,
          title: this.state.name,
          tags: [
            {
              ...this.getTag(),
            },
          ],
        },
      };
    } else {
      payload = {
        body: {
          id_user: user.payload.id,
          title: this.state.name,
        },
      };
    }

    this.props.negotiationCreateRequest(payload);
  }

  renderTagOptions() {
    const {negotiations} = this.props;
    return (
      <TagContainer>
        {negotiations.tags.length > 0 && (
          <View>
            <ChooseTagLabel>{i18n.t('chooseTag')}</ChooseTagLabel>
            <FlatList
              data={negotiations.tags}
              renderItem={({item}) => {
                return (
                  <Tag
                    onPress={() =>
                      this.setState({
                        selectedTag: this.state.selectedTag ? null : item,
                        tag: '',
                      })
                    }
                    selected={this.state.selectedTag?.id == item.id}>
                    <TagLabel selected={this.state.selectedTag?.id == item.id}>
                      {item.name}
                    </TagLabel>
                  </Tag>
                );
              }}
              horizontal
              contentContainerStyle={{paddingHorizontal: 30}}
              showsHorizontalScrollIndicator={false}
            />
            <ChooseTagLabel>{i18n.t('orTag')}</ChooseTagLabel>
          </View>
        )}
        <ScrollIntoView ref={x => (this.tagInput = x)}>
          <Input
            placeholder={i18n.t('foldersPlaceholder')}
            onChangeText={tag => this.setState({tag, selectedTag: null})}
            value={this.state.tag}
            name={i18n.t('foldersLabel')}
            underlineColorAndroid="transparent"
            onFocus={() => this.tagInput.scrollIntoView(options)}
          />
        </ScrollIntoView>
      </TagContainer>
    );
  }

  disableButton() {
    const {tag, name} = this.state;

    if (name != '') {
      return false;
    } else return true;
  }

  render() {
    const {negotiations} = this.props;
    return (
      <Container>
        <Header
          title={i18n.t('createNegotiationHeader')}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <CustomScrollView>
          <FolderImage />
          <ScrollIntoView ref={x => (this.nameInput = x)}>
            <Input
              placeholder={i18n.t('negotiationNamePlaceholder')}
              name={i18n.t('negotiationNameLabel')}
              onChangeText={name => this.setState({name})}
              value={this.state.name}
              onSubmitEditing={() => this.tagInput.scrollIntoView(options)}
              onFocus={() => this.nameInput.scrollIntoView(options)}
              underlineColorAndroid="transparent"
            />
          </ScrollIntoView>

          <InputMargin />
          {this.renderTagOptions()}
          <AlignToBottom />
          {/* <KeyboardSpacer /> */}
        </CustomScrollView>

        <Button
          title={i18n.t('createNegotiationButton')}
          onPress={() => this.createNegotiation()}
          bottomMargin
          loading={negotiations.fetching}
          disabled={this.disableButton() || negotiations.fetching}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    language: state.language,
    negotiations: state.negotiations,
  };
};

const mapDispatchToProps = dispatch => {
  const {negotiationCreateRequest} = NegotiationsActions;
  return bindActionCreators(
    {
      negotiationCreateRequest,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNegotiationScreen);
