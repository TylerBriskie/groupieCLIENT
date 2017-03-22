import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Picker, TextInput,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';

import MyProfile from '../profile/MyProfile'
import SignupForm from './SignupForm';

const Item = Picker.Item;

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password_confirm: "",
      instrument: "",
      errors: [],
    }
  }

  navigate(routeName) {
      this.props.navigator.push({
        name: routeName
      })
  }

  navigateBack(){
    this.props.navigator.pop();
  }

  async onRegisterPressed(){
    console.log("pressed register")
    try {
      let response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            instrument: this.state.instrument

        })
      });
      let res = await response.text();
      console.log(response)
      if (response.status >= 200 && response.status < 300){
          console.log("res is: ", res)
          this.props.navigate('myprofile');
      } else {
        let errors = res;
        throw errors;
      }
    } catch(errors) {
      console.log("Catch Errors: ", JSON.parse(errors))

      let formErrors = JSON.parse(errors)


      this.setState({errors: formErrors});
    }
  }

  render() {
    return (
      <View style={styles.signup}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
            source={require("../../../assets/GroupieLogo.png")}
          />
        </View>
        <SignupForm navigate={this.navigate.bind(this)} />
        <TouchableHighlight onPress={this.navigateBack.bind(this)} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style = {styles.error}>{error}</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    alignItems: "center"
  },
  row: {
    flexDirection: 'row'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  signup: {
    flex: 1,
    backgroundColor: '#0067DD'
  },
  logoContainer: {
    alignItems: 'center'
  },
  picker: {
    width: 150,
    height:75,
  },
  error: {
    paddingVertical:10,
    color: "#FFF",
    textAlign: 'center'
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
