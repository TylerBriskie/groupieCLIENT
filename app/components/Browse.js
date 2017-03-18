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

import ViewContainer from './ViewContainer';


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

  async onLoginPressed(){
    try {
      let response = await fetch('http://localhost:3000/users/random', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      });

      if (response.status >= 200 && response.status < 300){

        console.log(response)
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
    <ViewContainer>

    </ViewContainer>
  }
}


module.exports = Browse;
