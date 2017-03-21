'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  WebView,
  Text,
  StatusBar,
  Dimensions,
  Button,
  AsyncStorage,
  Image,
  TouchableHighlight,
  View
} from 'react-native';

import YouTube from 'react-native-youtube'

import ViewContainer from '../ViewContainer';
import StatusBarBackground from '../StatusBarBackground';

const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';

class Browse extends Component {

  constructor(props) {
    super(props);

    this.state = {
      match_username:"",
      accessToken:"",
      thumbnail: '',
      match_content: "",
      match_bio: "",
      match_age: "",
      match_genres: [],
      errors: ""
    }
  }

  navigateBack(){
    this.props.navigator.pop();
  }

  async navigate(routeName) {
      this.props.navigator.push({
        name: routeName,
        passProps: {
            projectId: projectId
        }
      })
  }


  randomUser(){
    let x = Math.floor(Math.random()+4)
    console.log(x);
    return x
  }

  async getRandomUser(){
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN)
      console.log("Token Is: ", token);
      this.setState({accessToken: token})
      let response = await fetch(`http://localhost:3000/getmatch/random/content`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      let res = await response.json();
      console.log(res)
      console.log("type of res.genres: ", typeof res.genres)

      if (response.status >= 200 && response.status < 300){
          this.setState({
            errors: '',
            match_username: res.username,
            match_content: res.content,
            match_instrument: res.instrument,
            match_bio: res.bio,
            match_age: res.age,
            match_genres: res.genres,
          });

      } else {
        let error = res;
        throw error;
      }
    } catch(error) {
      console.log("Error: " + error)
      this.setState({errors: error});
    }
  }

  componentDidMount(){
    this.getRandomUser()

  }

  async rejectUser(){
    console.log("Rejected!!!");
    this.getRandomUser();
  }

  async connectUser(){
    console.log("Sweet Licks!")
    this.getRandomUser();
  }

  render(){
    return (
      <ViewContainer>

      <View style={styles.browse}>
        <StatusBarBackground />
          <View style={{height:230}}>
            <WebView
              source={{uri: `${this.state.match_content}`}}
              style={{height: 100}}
              allowsInlineMediaPlayback= {true}
            />
          </View>

        <View style={styles.row}>
          <Text style={styles.h2}>{this.state.match_username}</Text>
          <Text style={styles.h2}>{this.state.match_instrument}</Text>
        </View>
          <Genres genres={this.state.match_genres} />

          <Text style={styles.p}>{this.state.match_bio}</Text>

        </View>
        <View style={styles.bottom}>
          <TouchableHighlight onPress={this.rejectUser.bind(this)}>
            <Image
              style={styles.image}
              source={require('../../../assets/thumbsdown.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.connectUser.bind(this)}>
            <Image
              style={styles.image}
              source={require('../../../assets/thumbsup.png')}
            />
          </TouchableHighlight>
        </View>
      </ViewContainer>
    )

  }
}

const Genres = (props) => {
  return (
    <View>
      {props.genres.map((genre, i) => <Text key={i} style = {styles.h2}>{genre}</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({
  browse: {
    flex: 1,
    alignItems:'stretch',
    justifyContent: 'flex-start',
    marginHorizontal: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 15
  },
  bottom:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
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
  image: {
    width: 65,
    height: 65,
    marginTop: 0,
    resizeMode: 'contain'
  },
  h2: {
    fontSize: 26,
    color:'white'
  },
  p: {
    marginVertical: 20,
    fontSize: 20,
    color:'white'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
});

module.exports = Browse;
