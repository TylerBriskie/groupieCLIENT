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

import ProfileForm from './ProfileForm';

class MyProfile extends Component {

  constructor() {
    super();

    this.state = {
      username: "",
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
        <ProfileForm />
          <TouchableHighlight onPress={this.navigateBack.bind(this)} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1,
    backgroundColor: '#0067DD',
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



module.exports = MyProfile;
