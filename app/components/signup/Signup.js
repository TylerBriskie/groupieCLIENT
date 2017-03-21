import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';

import SignupForm from './SignupForm';

class Signup extends Component {

  navigate(routeName) {
      this.props.navigator.push({
        name: routeName
      })
  }

  navigateBack(){
    this.props.navigator.pop();
  }

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
        <TouchableHighlight onPress={this.navigateBack.bind(this)} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
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
  },
  logo:{
    width:125,
    height: 125,
    resizeMode: 'contain'
  }
});

module.exports = Signup;
