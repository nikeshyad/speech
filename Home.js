import React from 'react';
import { ImageBackground, Image, StyleSheet, View } from 'react-native';
import { Button, Text, Item, Input } from 'native-base';
import { CheckBox, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


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