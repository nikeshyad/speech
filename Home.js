import React from 'react';
import { Dimensions, ImageBackground, Image, StyleSheet, View } from 'react-native';
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
          style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>

          <Button style = {styles.buttonContainer_PG} onPress = {() => navigate('PlayGround')} block rounded>
              <Text> Play Ground </Text>
          </Button>


          <Button style = {styles.buttonContainer_RFM} onPress = {() => navigate('RapidFire')} block rounded>
              <Text> Rapid Fire Mode </Text>
          </Button>

          <Image source={require('./mathSymbols.png')}
            style={{width: Dimensions.get('window').width/1.2, height: Dimensions.get('window').height/2.5, margin: 30, justifyContent: 'center'}} />

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

  buttonContainer_PG: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
    marginLeft: 25,
    marginRight: 25,
  },

  buttonContainer_RFM: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 25,
    marginRight: 25,
  }

});