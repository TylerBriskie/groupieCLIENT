'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    Button,
    Image,
    WebView,
    AsyncStorage,
    TextInput,
    Alert,
    TouchableHighlight,
    View
} from 'react-native';

import ProfileForm from './ProfileForm';

const ACCESS_TOKEN = 'access_token';

class MyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            genres: [],
            bio: '',
            avatar_url: "",
            error: [],
            accessToken: '',
            content_url: '',
        }
    }
    async updateInfo(){
      try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
        let result = fetch('http://localhost:3000/myprofile/update', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({

              bio: this.state.bio,
              content_url: this.state.content_url

          })
        })
        this.navigate('browse');

      }catch (error){
        console.log("Error:", error)
      }
    }

    navigate(routeName) {
        this.props.navigator.push({
          name: routeName
        })
    }

    navigateBack() {
        this.props.navigator.pop();
    }

    async componentWillMount() {
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN)
            console.log("Token Is: ", token);
            this.setState({accessToken: token})
            let result = await fetch('http://localhost:3000/myprofile', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            let profile = await result.json()
            this.setState({
              username: profile.username,
              bio: profile.bio,
              content_url: profile.content,
              genres: profile.genres
            })
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>{this.state.username}</Text>
                <Text style={styles.h3}>Edit Bio:</Text>
                <TextInput style={styles.input}
                  onChangeText={(val)=> this.setState({bio: val})}
                  multiline={true}
                  numberOfLines={4}
                  value={this.state.bio} />

              <Text style={styles.h3}>Youtube or Soundcloud URL: </Text>
                <TextInput style={styles.input}
                  onChangeText={(val)=> this.setState({content_url: val})}
                  multiline={true}
                  numberOfLines={2}
                  value={this.state.content_url} />
                <Text style={styles.h3}>My Genres: </Text>
                <TextInput style={styles.input}
                  onChangeText={(val)=> this.setState({genres: val})}
                  multiline={true}
                  numberOfLines={2}
                  value={this.state.genres} />

                <TouchableHighlight onPress={this.updateInfo.bind(this)} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Update Info</Text>
                </TouchableHighlight>
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
        flex: 1,
        backgroundColor: '#0067DD',
        alignItems: 'stretch'
    },
    row: {
      flexDirection: 'row'
    },
    h1: {
      fontSize: 24,
      color:"white",
      marginBottom: 25

    },
    h3: {
      fontSize: 20,
      color:'white'
    },
    input: {
      height: 60,
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 10,
      color: '#FFF',
      paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 15,
        marginVertical: 10,
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
