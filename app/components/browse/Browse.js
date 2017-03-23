'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  WebView,
  Text,
  StatusBar,
  Alert,
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
      my_id:'',
      thumbnail: '',
      match_id: '',
      match_email: "",
      match_content: "",
      match_bio: "",
      match_age: "",
      match_genres: [],
      errors: "",
      button_text: "SKIP",
      button_destination: this.getRandomUser.bind(this)
    }
  }

  navigateBack(){
    this.props.navigator.pop();
  }

  async navigate(routeName) {
      this.props.navigator.push({
        name: routeName
      })
    }

  async getRandomUser(){
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN)
      this.setState({accessToken: token})
      let response = await fetch(`http://localhost:3000/getmatch/random/content`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      let res = await response.json()
      console.log(res)
      if (response.status >= 200 && response.status < 300){
          this.setState({
            errors: '',
            match_username: res.username,
            match_id: res.user_id,
            match_content: res.content,
            match_instrument: res.instrument,
            match_bio: res.bio,
            match_age: res.age,
            match_email: res.email,
            match_genres: res.genres,
          });

      } else {
        this.setState({
          match_username: '',
          match_bio: "no users found...get back to practice and try again later!",
          match_age: '',
          match_genres: [],
          match_id: null,
          match_instrument: '',
          match_content: 'https://yeupsac.files.wordpress.com/2015/08/denied-stamp.png?w=320',
          button_text: 'Back Home',
          button_destination: this.navigate.bind(this, 'splash')
        })
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
    console.log(this.state.match_id)
    let token = await AsyncStorage.getItem(ACCESS_TOKEN)
    this.setState({accessToken: token})
    try {
      fetch(`http://localhost:3000/getmatch/reject/${this.state.match_id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then((reject)=>{
        console.log("message from server: ", reject)
        console.log("user rejected: ", this.state.match_id)
        this.getRandomUser();
      })
    } catch (error){
      throw error
    }

  }

  async connectUser(){
    console.log(this.state.match_id)
    let token = await AsyncStorage.getItem(ACCESS_TOKEN)
    this.setState({accessToken: token})
    try {
      let response = await fetch(`http://localhost:3000/getmatch/accept/${this.state.match_id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then((accept)=>{
        console.log('comeback status code: ', accept.status, accept)
        if (accept.status == 202){
          console.log("User connected")
          this.mutualConnectionMade(this.state.match_email);
          this.getRandomUser();
        } else {
          this.getRandomUser();
        }

      });
    } catch (error){
      console.log(error)
      throw error;
    }
  }

  mutualConnectionMade(connectee){
    console.log("Mutual Connection Made")
    Alert.alert(
      'You\'ve made a connection!',
      'Drop them a line at ' + connectee,
      [
        {text: 'Right On', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  render(){
    return (
      <ViewContainer>

      <View style={styles.browse}>
        <StatusBarBackground />
          <TouchableHighlight onPress={this.navigate.bind(this, 'splash')}>
            <Image
              style={styles.backArrow}
              source={require('../../../assets/left_arrow.png')}
            />
          </TouchableHighlight>
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
          <TouchableHighlight style={styles.skipContainer} onPress={this.state.button_destination}>
            <Text style={styles.h3}>{this.state.button_text}</Text>
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
  skipContainer:{
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 200,
    justifyContent: "center",
    alignItems: "center"
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
  backArrow: {
    width:30,
    height:30,
    marginTop:0,
    resizeMode: 'contain'
  },
  h2: {
    fontSize: 26,
    color:'white'
  },
  h3:{
    fontSize: 20,
    color: 'white'
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
