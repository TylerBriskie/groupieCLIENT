import React, { Component } from 'react';
import { StyleSheet, View, Navigator,
  TextInput, Text, StatusBar, Picker,
  KeyboardAvoidingView, TouchableHighlight} from 'react-native';

const Item = Picker.Item;

class SignupForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      instrument: "",
      password: "",
      password_confirm: "",
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
          this.props.navigate('myprofile')
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

  render(){
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle= "light-content"
        />
        <TextInput
          placeholder="E-mail"
          onChangeText={(val) => this.setState({email: val})}
          returnKeyType="next"
          keyboardType = 'email-address'
          autoCapitalize= 'none'
          autoCorrect={false}
          // onSubmitEditing={()=> this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="UserName"
          onChangeText={(val) => this.setState({username: val})}
          returnKeyType="next"
          autoCapitalize= 'none'
          autoCorrect={false}
          // onSubmitEditing={()=> this.passwordInput.focus()}
          style={styles.input}
        />
          <TextInput
            placeholder="Password"
            onChangeText={(val)=> this.setState({password: val})}
            secureTextEntry
            returnKeyType="next"
            // onSubmitEditing={()=> this.passwordInput.focus()}
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm Password"
            onChangeText={(val)=> this.setState({password_confirm: val})}
            secureTextEntry
            returnKeyType="next"
            // onSubmitEditing={()=> this.passwordInput.focus()}
            style={styles.input}
          />
          <TextInput
            placeholder="Your Instrument"
            onChangeText={(val)=> this.setState({instrument: val})}
            secureTextEntry
            returnKeyType="next"
            // onSubmitEditing={()=> this.passwordInput.focus()}
            style={styles.input}
          />

        <TouchableHighlight style={styles.buttonContainer} onPress={this.onRegisterPressed.bind(this)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableHighlight>
          <Errors errors={this.state.errors} />

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
    paddingVertical: 15,
    width: 150
  },
  picker: {
    width: 150,
    height:75
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
});

module.exports = SignupForm
