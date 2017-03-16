import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

class LoginForm extends Component {
  render(){
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle = "light-content"
          />
        <TextInput
          placeholder="username or email"
          returnKeyType="next"
          keyboardType = 'email-address'
          autoCapitalize= 'none'
          autoCorrect={false}
          onSubmitEditing={()=> this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          secureTextEntry
          returnKeyType="go"
          ref={(input)=> this.passwordInput = input}
          style={styles.input}
        />
      <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
});

module.exports = LoginForm
