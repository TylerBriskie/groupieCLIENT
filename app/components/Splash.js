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
const ACCESS_TOKEN = 'access_token';

class Splash extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: this.props.loggedIn,
      loggin_button_text: "Login"
    }
  }

  async getToken(){
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("Token Is: ", token);
      if (token) {
        return true
      } else {
        return false
      }
    } catch(error) {
      console.log("Error: " + error)
    }
  }

  navigate(routeName) {
      this.props.navigator.push({
        name: routeName
      })
  }

  loginButton(props){

  }

  async componentWillMount(){
    let loggedIn = await this.getToken()
    console.log("logged in?", loggedIn)
    if (loggedIn) {
      console.log("yes")
      this.props.loginFunction(true)
    }
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
        {this.props.loggedIn? <View>
          <TouchableHighlight onPress={this.navigate.bind(this, 'browse')} style={styles.button}>
            <Text>Browse Profiles</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.navigate.bind(this, 'myprofile')} style={styles.button}>
            <Text>My Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.navigate.bind(this, 'myconnections')} style={styles.button}>
            <Text>My Connections</Text>
          </TouchableHighlight>
        </View> : <View>
          <TouchableHighlight onPress={this.navigate.bind(this, 'login')} style={styles.button}>
          <Text>{this.state.loggin_button_text}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.navigate.bind(this, 'signup')} style={styles.button}>
          <Text>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.navigate.bind(this, 'browse')} style={styles.button}>
          <Text>Just Browsing...</Text>
        </TouchableHighlight>
          </View>}



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
