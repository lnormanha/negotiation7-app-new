import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeScreen from './HomeScreen';

class HomeScreenClass extends Component {
  render() {
    const {navigation} = this.props;
    return <HomeScreen navigation={navigation} />;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, null)(HomeScreenClass);
