import React from 'react';
import { ImageBackground, Image, Picker, ScrollView, KeyboardAvoidingView, StyleSheet, View, Vibration, TextInput } from 'react-native';
import { Container, Header, Content, Button, Text, Item, Input, Icon, Badge, InputGroup } from 'native-base';
import { CheckBox, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import { Dropdown } from 'react-native-material-dropdown';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    navigationOptions = {
      title: 'Home'
    }

  }
    
  render() {
    const {navigate} = this.props.navigation;
    return(

      <View style = {styles.container}>
        <ImageBackground source={require('./backGround.jpg')}
            style={{width: 375, height: 720}}>

          <Button style = {styles.buttonContainer} onPress = {() => navigate('PlayGround')} block rounded>
              <Text> Play Ground </Text>
          </Button>


          <Button style = {styles.buttonContainer} onPress = {() => navigate('RapidFire')} block rounded>
              <Text> Rapid Fire Mode </Text>
          </Button>

          <Image source={require('./mathSymbols.png')}
       style={{width: 300, height: 300, margin: 30, justifyContent: 'center'}} />

        </ImageBackground>

      </View>
    
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
  }

});