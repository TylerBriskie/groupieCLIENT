'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    Button,
    Image,
    WebView,
    Switch,
    Picker,
    AsyncStorage,
    ScrollView,
    TextInput,
    Alert,
    TouchableHighlight,
    View
} from 'react-native';

import CheckBox from 'react-native-check-box'

import ProfileForm from './ProfileForm';
import Splash from '../Splash'
const ACCESS_TOKEN = 'access_token';
const Item = Picker.Item;

class MyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            genres: [],
            bio: '',
            addGenre: "",
            error: [],
            instrument: '',
            content_url: '',
            filterInstruments: [],
            sortByGenre: null,
            sortByInstrument: null,
            filterDistance: 20
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
        this.navigate('splash');
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
    async clearFilters(){
      this.setState({
        filterInstruments: [],
        sortByInstrument: false
      })
      this.addFilters()
    }
    async addFilters(){
      try {
        let token = await AsyncStorage.getItem(ACCESS_TOKEN)
        let result = fetch('http://localhost:3000/myprofile/filterInstrument', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
              filterInstruments: this.state.filterInstruments
          })
        })
        // this.navigate('browse');
        Alert.alert(
          'Filtered Instruments Updated',
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
        this.getUserInfo()
        this.setState({
          addGenre: ""
        })
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

        Alert.alert(
          'Genres Removed',
          'Add some more or your content won\'t be visible to other users',
          [
            {text: 'Right On', onPress: () =>
              this.setState({genres: []})
            },
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

    async getUserInfo() {
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
          let inst_filters = []
          if (profile.filtered_instruments != null){
            for (var i = 0; i < profile.filtered_instruments.length; i++) {
                inst_filters.push(profile.filtered_instruments[i])
            }
          }

          if (inst_filters.length>0 && inst_filters[0] != null){
            this.setState({
              sortByInstrument: true,
              filterInstruments: inst_filters
            })
          }
          // if (profile.genre)
          this.setState({
            username: profile.username,
            bio: profile.bio,
            instrument: profile.instrument,
            content_url: profile.content_url,
            genres: profile.genres,
            filterInstruments: inst_filters,
            addGenre: '',
          })
          console.log("State of instrument filters: ", this.state.filterInstruments)
      } catch (error) {
          console.log("Error: " + error)
      }
    }

    componentDidMount() {
      this.getUserInfo()
    }

    onValueChange = (key: string, value: string) => {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
        this.updateInstrument()
      };

    remove(array, element) {
       return array.filter(function(el){return el !== element});
    }

    checkABox(data) {
      var myValues = Object.values(this.state.filterInstruments)
      console.log("My Values:", myValues);
      if (this.state.filterInstruments.includes(data)){
        var matchingKey = myValues.indexOf(data)
        console.log("Key:", matchingKey)
        this.state.filterInstruments.splice(matchingKey, 1)
      } else {
        this.state.filterInstruments.push(data)
      }
      console.log(this.state.filterInstruments)
    }

    render() {
        return (
          <View style={styles.container}>
            <ScrollView>
              <TouchableHighlight onPress={this.navigate.bind(this, 'splash')}>
                <Image
                  style={styles.backArrow}
                  source={require('../../../assets/left_arrow.png')}
                />
              </TouchableHighlight>

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

                <Image
                  style={styles.lineBreak}
                  source={require('../../../assets/white_line.png')}
                />

              <Text style={styles.h3}>Youtube or Soundcloud URL: </Text>
                <TextInput style={styles.smallInput}
                  onChangeText={(val)=> this.setState({content_url: val})}
                  multiline={true}
                  autoCapitalize= 'none'
                  numberOfLines={2}
                  value={this.state.content_url} />

              <TouchableHighlight onPress={this.updateContent.bind(this)} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Update Content URL</Text>
              </TouchableHighlight>

              <Image
                style={styles.lineBreak}
                source={require('../../../assets/white_line.png')}
              />
              <View style={styles.row}>
                <Text style={styles.h3}>Filter results by Genre?</Text>
                <Switch
                  onValueChange={(value) => this.setState({sortByGenre: value})}
                  style={{marginBottom: 10}}
                  value={this.state.sortByGenre} />
              </View>
              {this.state.sortByGenre ? <Text style={{fontSize: 12, marginBottom: 15, color: 'white'}}>Only displaying users that match at least one of your genre preferences</Text> : null}

                <View style={styles.row}>
                  <Text style={styles.h3}>My Genres: </Text>
                  {this.state.genres.length>0 ?
                    <Genres genres={this.state.genres} /> :
                    <Text style={styles.h3}>none...</Text>
                  }

                </View>

                <TextInput style={styles.smallInput}
                  onChangeText={(val)=> this.setState({addGenre: val})}
                  clearTextOnFocus = {true}
                  placeholder="Enter new genres, separated by commas"
                  value={this.state.addGenre} />

                <TouchableHighlight onPress={this.updateGenres.bind(this)} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Add Genre</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.removeGenre.bind(this)} style={styles.backButton}>
                    <Text style={styles.buttonText}>Clear My Genres</Text>
                </TouchableHighlight>

                <Image
                  style={styles.lineBreak}
                  source={require('../../../assets/white_line.png')}
                />

                <View style={styles.row}>
                  <Text style={styles.h3}>My Instrument: </Text>
                </View>

                <View style={styles.center}>
                  <Picker
                      style={styles.picker}
                      itemStyle = {{color:'white'}}
                      selectedValue={this.state.instrument}
                      onValueChange={this.onValueChange.bind(this, 'instrument')}>
                      <Item label="Guitar" value="Guitar" />
                      <Item label="Bass" value="Bass" />
                      <Item label="Drums" value="Drums" />
                      <Item label="Percussion" value="Percussion" />
                      <Item label="Keyboards" value="Keyboards" />
                      <Item label="Horn" value="Horn" />
                      <Item label="Banjo" value="Banjo" />
                      <Item label="Mandolin" value="Mandolin" />
                      <Item label="Violin" value="Violin" />
                      <Item label="Singer" value="Singer" />
                      <Item label="Rapper" value="Rapper" />
                      <Item label="Other" value="Other" />


                    </Picker>
                </View>

                <Image
                  style={styles.lineBreak}
                  source={require('../../../assets/white_line.png')}
                />

                <View style={styles.row}>
                  <Text style={styles.h3}>Filter results by Instrument?</Text>
                  <Switch
                    onValueChange={(value) => this.setState({sortByInstrument: value})}
                    style={{marginBottom: 10}}
                    value={this.state.sortByInstrument} />
                </View>
                {
                  this.state.sortByInstrument ?
                  <View style={{marginBottom: 30}}>
                    <View style={styles.row}>
                      <View style={styles.column}>
                      <Text style={{color:'white'}}>Guitar </Text>
                      <CheckBox
                          style={{padding: 5}}
                          onClick={()=>this.checkABox("Guitar")}
                          isChecked = {this.state.filterInstruments.includes("Guitar")}
                          checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                          unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                      />
                    </View>
                    <View style={styles.column}>
                    <Text style={{color:'white'}}>Bass </Text>
                      <CheckBox
                          style={{padding: 5}}
                          onClick={()=>this.checkABox("Bass")}
                          isChecked = {this.state.filterInstruments.includes("Bass")}
                          checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                          unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                      />
                    </View>
                    <View style={styles.column}>
                    <Text style={{color:'white'}}>Drums </Text>
                    <CheckBox
                        style={{padding: 5}}
                        isChecked = {this.state.filterInstruments.includes("Drums")}
                        onClick={()=>this.checkABox("Drums")}
                        checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                        unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                    />
                  </View>
                  <View style={styles.column}>
                  <Text style={{color:'white'}}>Percussion </Text>
                    <CheckBox
                        style={{padding: 5}}
                        isChecked = {this.state.filterInstruments.includes("Percussion")}
                        onClick={()=>this.checkABox("Percussion")}
                        checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                        unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                    />
                  </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.column}>
                      <Text style={{color:'white'}}>Keys </Text>
                      <CheckBox
                          style={{padding: 5}}
                          onClick={()=>this.checkABox("Keyboards")}
                          isChecked = {this.state.filterInstruments.includes("Keyboards")}
                          checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                          unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                      />
                    </View>
                    <View style={styles.column}>
                    <Text style={{color:'white'}}>Horn </Text>
                      <CheckBox
                          style={{padding: 5}}
                          onClick={()=>this.checkABox("Horn")}
                          isChecked = {this.state.filterInstruments.includes("Horn")}
                          checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                          unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                      />
                    </View>
                    <View style={styles.column}>
                    <Text style={{color:'white'}}>Banjo </Text>
                    <CheckBox
                        style={{padding: 5}}
                        onClick={()=>this.checkABox("Banjo")}
                        isChecked = {this.state.filterInstruments.includes("Banjo")}
                        checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                        unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                    />
                  </View>
                  <View style={styles.column}>
                  <Text style={{color:'white'}}>Mandolin </Text>
                    <CheckBox
                        style={{padding: 5}}
                        isChecked = {this.state.filterInstruments.includes("Mandolin")}
                        onClick={()=>this.checkABox("Mandolin")}
                        checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                        unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                    />
                  </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.column}>
                      <Text style={{color:'white'}}>Violin </Text>
                      <CheckBox
                          style={{padding: 5}}
                          onClick={()=>this.checkABox("Violin")}
                          isChecked = {this.state.filterInstruments.includes("Violin")}
                          checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                          unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                      />
                    </View>
                    <View style={styles.column}>
                    <Text style={{color:'white'}}>Singer </Text>
                      <CheckBox
                          style={{padding: 5}}
                          onClick={()=>this.checkABox("Singer")}
                          isChecked = {this.state.filterInstruments.includes("Singer")}
                          checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                          unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                      />
                    </View>
                    <View style={styles.column}>
                    <Text style={{color:'white'}}>Rapper </Text>
                    <CheckBox
                        style={{padding: 5}}
                        onClick={()=>this.checkABox("Rapper")}
                        isChecked = {this.state.filterInstruments.includes("Rapper")}
                        checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                        unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                    />
                  </View>
                  <View style={styles.column}>
                  <Text style={{color:'white'}}>Other </Text>
                    <CheckBox
                        style={{padding: 5}}
                        onClick={()=>this.checkABox("Other")}
                        isChecked = {this.state.filterInstruments.includes("Other")}
                        checkedImage={<Image source={require('../../../assets/check_box_checked.png')}/>}
                        unCheckedImage={<Image source={require('../../../assets/check_box_outline.png')}/>}

                    />
                  </View>
                    </View>
                    <TouchableHighlight onPress={this.addFilters.bind(this)} style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>Save Instrument Filters</Text>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={this.clearFilters.bind(this)} style={styles.backButton}>
                            <Text style={styles.buttonText}>Clear Instrument Filters</Text>
                        </TouchableHighlight>
            </View>
                : null
              }
                  <Image
                    style={styles.lineBreak}
                    source={require('../../../assets/white_line.png')}
                  />

              <TouchableHighlight onPress={this.navigate.bind(this, 'browse')} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Back to Browsing</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.removeToken.bind(this)} style={styles.backButton}>
                    <Text style={styles.buttonText}>Log Out</Text>
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
    center: {
      alignItems: 'center'
    },
    picker: {
      width:150
    },
    column: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    h1: {
      fontSize: 24,
      color:"white",
      marginBottom: 25

    },
    lineBreak: {
      height:40,
      width:400
    },
    h3: {
      fontSize: 20,
      color:'white'
    },
    input: {
      height: 70,
      backgroundColor: 'rgba(255,255,255,0.3)',
      marginBottom: 10,
      fontSize: 16,
      color: '#FFF',
      paddingHorizontal: 10
    },
    backArrow: {
      width:30,
      height:30,
      marginTop:0,
      resizeMode: 'contain'
    },
    smallInput:{
      height: 40,
      fontSize: 14,
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 10,
      color: '#FFF',
      paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: 'rgba(0,155,85,1)',
        paddingVertical: 10,
        marginTop: 15,
        marginBottom: 25,
        height: 40
    },
    backButton:{
      backgroundColor: 'rgba(255,155,0,1)',
      paddingTop: 10,
      marginVertical: 20,
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
