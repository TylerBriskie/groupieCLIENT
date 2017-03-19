'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Image,
  Alert,
  TouchableHighlight,
  View
} from 'react-native';

import ViewContainer from '../ViewContainer';


class Browse extends Component {

  constructor() {
    super();

    this.state = {
      content: "",
      bio: "",
      age: "",
      genre: "",
      errors: ""
    }
  }

  navigateBack(){
    this.props.navigator.pop();
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
          this.redirect('MyProfile', accessToken)
      } else {
        let error = res;
        throw error;
      }
    } catch(error) {
      console.log("Error: " + error)
      this.setState({errors: error});
    }
  }

  render(){
    return (
      <View style={styles.browse}>
        <Text>Just Browsing...</Text>
          <TouchableHighlight onPress={this.navigateBack.bind(this)} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  browse: {
    flex: 1,
    backgroundColor: '#0067DD',
    alignItems:'center',
    justifyContent: 'center'
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
    width:170,
    height: 170,
    resizeMode: 'contain'
  }
});

module.exports = BrowseNoLogin;
