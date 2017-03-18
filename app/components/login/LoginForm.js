import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, TextInput, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

const ACCESS_TOKEN = 'access_token';


class LoginForm extends Component {

  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: ""
    }
  }

  async storeToken(accessToken){
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    } catch(error) {
      console.log("Error: " + error)
    }
  }

  async getToken(){
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("Token Is: ", token);
    } catch(error) {
      console.log("Error: " + error)
    }
  }

  async removeToken(){
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    } catch(error) {
      console.log("Something went wrong...")
    }
  }

  async onLoginPressed(){
    try {
      let response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session:{
            email: this.state.email,
            password: this.state.password,
          }

        })
      });

      let res = await response.text();
        console.log(res);
      if (response.status >= 200 && response.status < 300){

          this.setState({error: ''});
          let accessToken = res;
          this.storeToken(accessToken)
      } else {
        let error = res;
        throw error;
      }
    } catch(error) {
      console.log("Error: " + error)
      this.setState({errors: error});
    }
  }

  logToken(){
    console.log(AsyncStorage)
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle = "light-content"
          />
        <TextInput
          placeholder="Email address"
          returnKeyType="next"
          keyboardType = 'email-address'
          autoCapitalize= 'none'
          autoCorrect={false}
          onChangeText={(val)=> this.setState({email: val})}
          onSubmitEditing={()=> this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          secureTextEntry
          returnKeyType="go"
          onChangeText={(val)=> this.setState({password: val})}
          ref={(input)=> this.passwordInput = input}
          style={styles.input}
        />
      <TouchableOpacity style={styles.buttonContainer} onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.getToken.bind(this)}>
            <Text style={styles.buttonText}>Access Token?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.removeToken.bind(this)}>
              <Text style={styles.buttonText}>Remove Token</Text>
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
  error: {
    paddingVertical:10,
    color: "#FFF",
    textAlign: 'center'
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
