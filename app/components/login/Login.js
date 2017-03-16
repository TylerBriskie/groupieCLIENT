import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import LoginForm from './LoginForm';

class Login extends Component {
  render() {
    return (
      <View style={styles.login}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require("../../../assets/GroupieLogo.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#0067DD'
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo:{
    width:200,
    height: 200,
    resizeMode: 'contain'
  },
  formContainer: {

  }
});

module.exports = Login;
