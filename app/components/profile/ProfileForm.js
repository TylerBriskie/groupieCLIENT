'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Image,
  TextInput,
  Alert,
  TouchableHighlight,
  View
} from 'react-native';


class ProfileForm extends Component {

  constructor() {
    super();

    this.state = {
      username: "",
      user_id: "",
      password: "",
      genres: [],
      avatar_url: "",
      error: []
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

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.h3}>Hello from ProfileForm.js</Text>
          <Text style={styles.h3}>My Username: {this.state.username}</Text>
          <Text style={styles.h3}>My Genres: {this.state.genres}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1,
  },
  h3: {
    fontSize: 20,
    color:'white'
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
  }


});



module.exports = ProfileForm;
