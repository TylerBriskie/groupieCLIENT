'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const MyProfile = require('./profile/MyProfile');

class ViewContainer extends Component {
  render() {
    return (
      <View style={styles.viewContainer}>
      {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: "#0067DD"
  }
})

module.exports = ViewContainer;
