import React, { Component } from 'react';
import { StyleSheet, View, Navigator,
  TextInput, Text, StatusBar,
  AsyncStorage, Picker,
  KeyboardAvoidingView, TouchableHighlight} from 'react-native';

const ACCESS_TOKEN = 'access_token';
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

  onValueChange = (key: string, value: string) => {
      const newState = {};
      newState[key] = value;
      this.setState(newState);
      this.updateInstrument()
    };

    async updateInstrument(){
      try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
        let result = fetch('http://localhost:3000/myprofile/updateInstrument', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              instrument: this.state.instrument
          })
        })
      }catch (error){
        console.log("Error:", error)
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
      // this.removeToken()
      let res = await response.text();
      if (response.status >= 200 && response.status < 300){
          this.setState({error: ''});
          let accessToken = res;
          this.storeToken(accessToken)
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

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

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
          onSubmitEditing={()=> this.focusNextField('username')}
          style={styles.input}
        />
        <TextInput
          ref="username"
          placeholder="UserName"
          onChangeText={(val) => this.setState({username: val})}
          returnKeyType="next"
          autoCapitalize= 'none'
          autoCorrect={false}
          onSubmitEditing={()=> this.focusNextField('pw1')}
          style={styles.input}
        />
          <TextInput
            ref="pw1"
            placeholder="Password"
            onChangeText={(val)=> this.setState({password: val})}
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={()=> this.focusNextField('pw2')}
            style={styles.input}
          />
          <TextInput
            ref="pw2"
            placeholder="Confirm Password"
            onChangeText={(val)=> this.setState({password_confirm: val})}
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={()=> this.focusNextField('instrument')}
            style={styles.input}
          />
          <View style={styles.center}>
            <Picker
                style={styles.picker}
                itemStyle = {{color:'white'}}
                selectedValue={this.state.instrument}
                onValueChange={this.onValueChange.bind(this, 'instrument')}>
                <Item label="Guitar" value="Guitar" />
                <Item label="Bass" value="Bass" />
                <Item label="Drums" value="Drums" />
                <Item label="Percussion" value="Percussion" />
                <Item label="Keyboards" value="Keyboards" />
                <Item label="Horn" value="Horn" />
                <Item label="Banjo" value="Banjo" />
                <Item label="Mandolin" value="Mandolin" />
                <Item label="Violin" value="Violin" />
                <Item label="Singer" value="Singer" />
                <Item label="Rapper" value="Rapper" />
                <Item label="Other" value="Other" />


              </Picker>
          </View>

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
    marginBottom: 5,
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
  center: {
    alignItems: 'center'
  },
  picker: {
    width: 150,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
});

module.exports = SignupForm
