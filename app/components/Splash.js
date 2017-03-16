'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Image,
  Alert,
  View
} from 'react-native';

import ViewContainer from './ViewContainer'

const loginPress = () => {
Alert.alert('Login Functionality Not Yet Implemented!');
};

const signupPress = () => {
  Alert.alert("Signup functionality not yet implemented");
}

class Splash extends Component {
  render() {
    return (
      <ViewContainer>
        <StatusBar
          barStyle = "light-content"
          />

          <Image style={styles.image}
            source={require("../../assets/GroupieLogo.png")}
          />
        <View style={{backgroundColor: 'aliceblue', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
          <Button
            color='#000000'
            style={styles.button}
            onPress={loginPress}
            title="Log In"
          />
        </View>
        <View style={{backgroundColor: 'aliceblue', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
          <Button
            color='#000'
            style={styles.button}
            onPress={signupPress}
            title="Sign Up"
          />
        </View>
        <View style={{backgroundColor: 'aliceblue', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
          <Button
            color='#000'
            style={styles.button}
            onPress={signupPress}
            title="Just Browsing..."
          />
        </View>

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
    color:"#FFFFFF",
    backgroundColor:"#000"
  }
})

module.exports = Splash;
