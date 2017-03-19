'use strict'
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

class StatusBarBackground extends Component {

  render(){
    return (
      <View style = {styles.statusBarBackground}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: 20,
    backgroundColor: '#0067DD'
  }
})

module.exports = StatusBarBackground
