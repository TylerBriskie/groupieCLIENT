'use strict';
import React, { Component } from 'react';
import { AppRegistry, StatusBar, TouchableElement, Button, Alert, StyleSheet, Text, View, Image } from 'react-native';

const ViewContainer = require('./app/components/ViewContainer')
const StatusBarBackground = require('./app/components/StatusBarBackground')
const Login = require ('./app/components/login/Login')


const loginPress = () => {
Alert.alert('Login Functionality Not Yet Implemented!');
};

const signupPress = () => {
  Alert.alert("Signup functionality not yet implemented");
}

export default class groupieCLIENT extends Component {

  render() {
    return (
      <Login />
      // <ViewContainer>
      //   <StatusBar
      //     barStyle = "light-content"
      //     />
      //
      //     <Image style={styles.image}
      //       source={require("./assets/GroupieLogo.png")}
      //     />
      //   <View style={{backgroundColor: 'aliceblue', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
      //     <Button
      //       color='#000000'
      //       style={styles.button}
      //       onPress={loginPress}
      //       title="Log In"
      //     />
      //   </View>
      //   <View style={{backgroundColor: 'aliceblue', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
      //     <Button
      //       color='#000'
      //       style={styles.button}
      //       onPress={signupPress}
      //       title="Sign Up"
      //     />
      //   </View>
      //   <View style={{backgroundColor: 'aliceblue', marginBottom: 5, marginLeft: 20, marginRight: 20}}>
      //     <Button
      //       color='#000'
      //       style={styles.button}
      //       onPress={signupPress}
      //       title="Just Browsing..."
      //     />
      //   </View>
      //
      // </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2367FD',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    color:"#FFFFFF",
    backgroundColor:"#000"
  },
  instructions: {
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
}
});

AppRegistry.registerComponent('groupieCLIENT', () => groupieCLIENT);
