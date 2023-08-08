import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoginScreen from './LoginScreen';

class LoginScreenClass extends Component {
  render() {
    const {navigation} = this.props;

    return <LoginScreen navigation={navigation} />;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, null)(LoginScreenClass);
