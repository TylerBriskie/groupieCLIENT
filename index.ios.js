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
import Browse from './app/components/browse/Browse'
import GeolocationExample from './app/components/Location'
// import BrowseNoLogin from './app/components/browse/BrowseNoLogin'



export default class groupieCLIENT extends Component {

  constructor(props) {
      super(props);

      this.state = {
          username: "",
          genres: [],
          bio: '',
          addGenre: "",
          error: [],
          instrument: '',
          content_url: '',
          filterInstruments: [],
          sortByGenre: false,
          sortByInstrument: false,
          filterDistance: 50
      }
  }


  renderScene(route, navigator) {
    if (route.name == 'splash'){
      return <Splash {...route.passProps} route={route} navigator={navigator} />
    }
    if (route.name == 'signup'){
      return <Signup {...route.passProps} route={route} navigator={navigator} />
    }
    if (route.name == 'login'){
      return <Login {...route.passProps} route={route} navigator={navigator} />
    }
    if (route.name == 'browse'){
      return <Browse {...route.passProps} route={route} navigator={navigator} />
    }
    if (route.name == 'myprofile'){
      return <MyProfile {...route.passProps} route={route} navigator={navigator} />
    }
    if (route.name == 'loginform'){
      return <LoginForm {...route.passProps} route={route} navigator={navigator} />
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
