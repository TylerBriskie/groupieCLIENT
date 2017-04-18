import React, { Component } from 'react';
import { StyleSheet, View, Navigator,
  TextInput, Text, StatusBar, Image,
  AsyncStorage, Picker,
  KeyboardAvoidingView, TouchableHighlight} from 'react-native';


const ACCESS_TOKEN = 'access_token';


class Connections extends Component {

  constructor() {
    super();

    this.state = {

    }
  }

  navigateBack() {
      this.props.navigator.popToTop();
  }

  async getConnections(){
    try {
      let token = await AsyncStorage.getItem(ACCESS_TOKEN)
      let result = fetch('http://localhost:3000/myprofile/myconnections', {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + token
        }

      })
      let connections = await result.json()
      console.log("connections:", connections)
    }catch (error){
      console.log("Error:", error)
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle = "light-content"
          />
            <TouchableHighlight onPress={this.navigateBack.bind(this)}>
              <Image
                style={styles.backArrow}
                source={require('../../../assets/left_arrow.png')}
              />
            </TouchableHighlight>
        <Text style={styles.h2}>My Connections</Text>




      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  h2:{
    color: '#FFF',
    fontSize: 26
  },
  backArrow: {
    width:30,
    height:30,
    marginTop:0,
    resizeMode: 'contain'
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700'
  }
});


module.exports = Connections
