'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Image,
  Alert,
  TouchableHighlight,
  View
} from 'react-native';

import ViewContainer from './ViewContainer';


class Browse extends Component {

  constructor() {
    super();

    this.state = {
      content: "",
      bio: "",
      age: "",
      genre: "",
      errors: ""
    }
  }

  navigateBack(){
    this.props.navigator.pop();
  }

  render(){
    <View>
      <Text>Just Browsing...</Text>
    </View>
  }
}


module.exports = Browse;
