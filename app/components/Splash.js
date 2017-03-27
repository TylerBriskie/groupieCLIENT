'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  AsyncStorage,
  StatusBar,
  Image,
  TouchableHighlight,
  View
} from 'react-native';

import ViewContainer from './ViewContainer'

class Splash extends Component {

  constructor(props) {
    super(props);

    this.state = {
      logged_in: false,
      loggin_button_text: "Login"
    }
  }

  navigate(routeName) {
      this.props.navigator.push({
        name: routeName
      })
  }

  loginButton(props){

  }

  render() {
    return (
      <ViewContainer>
        <StatusBar
          barStyle = "light-content"
          />

          <Image style={styles.image}
            source={require("../../assets/GroupieLogo.png")}
          />
        <TouchableHighlight onPress={this.navigate.bind(this, 'login')} style={styles.button}>
          <Text>{this.state.loggin_button_text}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.navigate.bind(this, 'signup')} style={styles.button}>
          <Text>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.navigate.bind(this, 'browse')} style={styles.button}>
          <Text>Just Browsing...</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.navigate.bind(this, 'myprofile')} style={styles.button}>
          <Text>My Profile</Text>
        </TouchableHighlight>

      </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  button: {
  height: 50,
  backgroundColor: 'aliceblue',
  alignItems: 'center',
  marginLeft: 40,
  marginRight: 40,
  marginBottom: 10,
  justifyContent: 'center'
  }
})

module.exports = Splash;
