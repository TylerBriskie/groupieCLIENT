import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import LoginForm from './LoginForm';

class Login extends Component {

  navigate(routeName) {
      this.props.navigator.push({
        name: routeName
      })
  }

  navigateBack(){
    this.props.navigator.pop();
  }

  printToken(){
    console.log(ACCESS_TOKEN)
  }

  render() {
    return (
      <View style={styles.login}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require("../../../assets/GroupieLogo.png")}
          />
        </View>
        <View>
          <LoginForm navigate={this.navigate.bind(this)}
            loginFunction = {this.props.loginFunction.bind(this)}
            />
        </View>

        <TouchableHighlight onPress={this.navigateBack.bind(this)} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#0067DD',
    padding:20
  },

  logoContainer: {
    alignItems: 'center'
  },
  logo:{
    width:200,
    height: 200,
    resizeMode: 'contain'
  },
  buttonContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    marginVertical: 30,
    marginHorizontal: 20,
    height: 40
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }

});

module.exports = Login;
