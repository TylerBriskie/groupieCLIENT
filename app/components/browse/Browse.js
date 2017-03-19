'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  WebView,
  Text,
  StatusBar,
  Dimensions,
  Button,
  Image,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

import YouTube from 'react-native-youtube'

import ViewContainer from '../ViewContainer';
import StatusBarBackground from '../StatusBarBackground';

class Browse extends Component {

  constructor() {
    super();

    this.state = {
      match_username:"",
      thumbnail: '',
      match_content: "",
      match_bio: "",
      match_age: "",
      match_genres: ["Funk", "Jazz"],
      errors: ""
    }
  }

  navigateBack(){
    this.props.navigator.pop();
  }

  randomUser(){
    let x = Math.floor(Math.random()+4)
    console.log(x);
    return x
  }

  async getUser(){

    try {
      let response = await fetch(`http://localhost:3000/getmatch/random/content`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let res = await response.json();
      console.log(res)
      console.log("type of res.genres: ", typeof res.genres)

      if (response.status >= 200 && response.status < 300){
          this.setState({
            errors: '',
            thumbnail: "../../../assets/EVH.jpg",
            match_username: res.username,
            match_content: res.content,
            match_bio: "",
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

  render(){
    return (
      <ViewContainer>
      <View style={styles.browse}>
        <StatusBarBackground />
          <YouTube
          videoId="DjpudvU-ZRA"
          play={true}
          hidden={false}
          playsInline={true}
          onError={(e) => { alert(e.error) }}
          style={{
            alignSelf: 'stretch',
            height: 200,
            backgroundColor: 'black',
            marginVertical: 10
          }}
        />
        <Text style={styles.h2}>{this.state.match_username}</Text>
        <Text style={styles.h2}>{this.state.match_genres}</Text>

      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.getUser.bind(this)}>
            <Text style={styles.buttonText}>Get User</Text>
          </TouchableOpacity>
      </View>
      </ViewContainer>
    )

  }
}

// const Genres = (props) => {
//   return (
//     <View>
//       {props.match_genres.map((genre, i) => <Text key={i} style = {styles.h2}>{genre}</Text>)}
//     </View>
//   )
// }

const styles = StyleSheet.create({
  browse: {
    flex: 1,
    alignItems:'flex-start',
    justifyContent: 'flex-start'
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  bottom:{
    marginBottom: 10,
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
    width: 100,
    height: 100,
    marginTop: 0,
    resizeMode: 'contain'
  },
  h2: {
    fontSize: 22,
    color:'yellow'
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

module.exports = Browse;
