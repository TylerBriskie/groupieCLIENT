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
    ScrollView,
    TextInput,
    Alert,
    TouchableHighlight,
    View
} from 'react-native';

import ProfileForm from './ProfileForm';
import Splash from '../Splash'
const ACCESS_TOKEN = 'access_token';

class MyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            genres: [],
            bio: '',
            addGenre: "",
            avatar_url: "",
            error: [],
            instruments: '',
            accessToken: '',
            content_url: '',
            secret: '',
        }
    }

    navigate(routeName) {
        this.props.navigator.push({
          name: routeName
        })
    }

    async removeToken(){
      try {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        this.getToken();
      } catch(error) {
        console.log("Something went wrong...")
      }
    }

    async updateBio(){
      try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
        let result = fetch('http://localhost:3000/myprofile/updateBio', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              bio: this.state.bio
          })
        })
        // this.navigate('browse');
        Alert.alert(
          'User Bio Updated',
          '',
          [
            {text: 'Right On', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )

      }catch (error){
        console.log("Error:", error)
      }
    }

    async updateGenres(){
      try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
        let result = fetch('http://localhost:3000/myprofile/addGenre', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              genre: this.state.addGenre
          })
        })
        // this.navigate('browse');
        Alert.alert(
          'Genre Added!',
          '' ,
          [
            {text: 'Right On', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
        this.navigate('MyProfile')
      }catch (error){
        console.log("Error:", error)
      }
    }

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
        // this.navigate('browse');
        Alert.alert(
          'Instrument Changed!',
          '' ,
          [
            {text: 'Right On', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      }catch (error){
        console.log("Error:", error)
      }
    }

    async removeGenre(){
      try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
        let result = fetch('http://localhost:3000/myprofile/removeGenre', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        // this.navigate('browse');
        Alert.alert(
          'Genres Removed',
          'Add some more or your content won\'t be visible to other users',
          [
            {text: 'Right On', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )

      }catch (error){
        console.log("Error:", error)
      }
    }

    async updateContent(){
      try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
        let result = fetch('http://localhost:3000/myprofile/updateContent', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              content_url: this.state.content_url
          })
        })
        // this.navigate('browse');
        Alert.alert(
          'Content URL updated',
          '',
          [
            {text: 'Right On', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )

      }catch (error){
        console.log("Error:", error)
      }
    }

    async deleteProfile(){
      Alert.alert(
        'Deleting Account!!!',
        'This can\'t be undone!! are you sure???' ,
        [
          {text: 'Nevermind'},
          {text: 'Yes I\'m sure', onPress: () => this.deleteProfileSure()},
        ],
        { cancelable: true }
      )
    }

    async deleteProfileSure(){
      try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
        let result = fetch('http://localhost:3000/myprofile/deleteProfile', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              instrument: this.state.instrument
          })
        })
        this.navigate('splash');
      }catch (error){
        console.log("Error:", error)
      }
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
            console.log(profile)
            this.setState({
              username: profile.username,
              bio: profile.bio,
              instrument: profile.instrument,
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
            <ScrollView>

                <Text style={styles.h1}>{this.state.username}</Text>
                <Text style={styles.h3}>Edit Bio:</Text>
                <TextInput style={styles.input}
                  onChangeText={(val)=> this.setState({bio: val})}
                  multiline={true}
                  numberOfLines={4}
                  value={this.state.bio} />
                <TouchableHighlight onPress={this.updateBio.bind(this)} style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>Update Bio</Text>
                  </TouchableHighlight>

              <Text style={styles.h3}>Youtube or Soundcloud URL: </Text>
                <TextInput style={styles.smallInput}
                  onChangeText={(val)=> this.setState({content_url: val})}
                  multiline={true}
                  numberOfLines={2}
                  value={this.state.content_url} />

              <TouchableHighlight onPress={this.updateContent.bind(this)} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Update Content URL</Text>
              </TouchableHighlight>

                <View style={styles.row}>
                  <Text style={styles.h3}>My Genres: </Text>
                  <Genres genres={this.state.genres} />
                </View>

                <TextInput style={styles.smallInput}
                  onChangeText={(val)=> this.setState({addGenre: val})}
                  multiline={true}
                  numberOfLines={2}
                  placeholder="Enter a new genre" />

                <TouchableHighlight onPress={this.updateGenres.bind(this)} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Add Genre</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.removeGenre.bind(this)} style={styles.backButton}>
                    <Text style={styles.buttonText}>Clear My Genres</Text>
                </TouchableHighlight>

                <View style={styles.row}>
                  <Text style={styles.h3}>My Instrument: </Text>
                </View>

                <TextInput style={styles.smallInput}
                  onChangeText={(val)=> this.setState({instrument: val})}
                  value={this.state.instrument} />

                <TouchableHighlight onPress={this.updateInstrument.bind(this)} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Change Instrument</Text>
                </TouchableHighlight>


                <TouchableHighlight onPress={this.navigate.bind(this, 'browse')} style={styles.backButton}>
                    <Text style={styles.buttonText}>Back to Browsing</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.deleteProfile.bind(this)} style={styles.redButton}>
                    <Text style={styles.buttonText}>DELETE PROFILE</Text>
                </TouchableHighlight>
            </ScrollView>
            </View>
        )
    }
}

const Genres = (props) => {
  return (
    <View>
      {props.genres.map((genre, i) => <Text key={i} style = {styles.h3}>{genre}</Text>)}
    </View>
  )
}

Genres.defaultProps ={
  genres: []
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#0067DD',
        alignItems: 'stretch'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between'
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
    smallInput:{
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 10,
      color: '#FFF',
      paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'rgba(0,155,85,1)',
        paddingVertical: 10,
        marginTop: 5,
        marginBottom: 15,
        height: 40
    },
    backButton:{
      backgroundColor: 'rgba(255,155,0,1)',
      paddingTop: 10,
      marginVertical: 5,
      height: 40
    },
    redButton:{
      backgroundColor: 'rgba(255,25,0,1)',
      paddingTop: 5,
      marginVertical: 30,
      height: 40
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }

});

module.exports = MyProfile;
