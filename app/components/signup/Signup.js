import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import SignupForm from './SignupForm';

class Signup extends Component {
  render() {
    return (
      <View style={styles.signup}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require("../../../assets/GroupieLogo.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <SignupForm />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    backgroundColor: '#0067DD'
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo:{
    width:170,
    height: 170,
    resizeMode: 'contain'
  },
  formContainer: {

  }
});

module.exports = Signup;
