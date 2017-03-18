'use strict';
import React, { Component } from 'react';
import { AppRegistry, StatusBar, Navigator, TouchableElement, Button, Alert, StyleSheet, Text, View, Image } from 'react-native';

const ViewContainer = require('./app/components/ViewContainer')
const StatusBarBackground = require('./app/components/StatusBarBackground')
const Login = require ('./app/components/login/Login')
import Splash from './app/components/Splash'
import Signup from './app/components/signup/Signup'
import MyProfile from './app/components/profile/MyProfile'
import ProfileForm from './app/components/profile/ProfileForm'

export default class groupieCLIENT extends Component {


  renderScene(route, navigator) {
    if (route.name == 'splash'){
      console.log(route.name)
      return <Splash navigator={navigator} />
    }
    if (route.name == 'signup'){
      return <Signup navigator={navigator} />
    }
    if (route.name == 'login'){
      return <Login navigator={navigator} />
    }
    if (route.name == 'browse'){
      return <Browse navigator={navigator} />
    }
    if (route.name == 'myProfile'){
      console.log(route.name, 'loggin my profile')
      return <MyProfile navigator={navigator} />
    }
  }


  render() {
    return (
    <ViewContainer>
      <Navigator
        initialRoute={{name: 'splash'}}
        renderScene={this.renderScene.bind(this)}
        />
    </ViewContainer>
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
  instructions: {
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
  },

});

AppRegistry.registerComponent('groupieCLIENT', () => groupieCLIENT);
