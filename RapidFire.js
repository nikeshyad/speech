import React from 'react';
import { Picker, ScrollView, KeyboardAvoidingView, StyleSheet, View, Vibration, TextInput } from 'react-native';
import { Container, Header, Content, Button, Text, Item, Input, Icon, Badge, InputGroup } from 'native-base';
import { CheckBox, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class RapidFire extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alpha: '',
      beta: '',
      result: '',
      rand: '',
      checked: '',
      ops: ['+', '-', '*'],
      formInputText: '',
      timer: '',
    };

    navigationOptions = {
      title: 'Rapid Fire'
    }
  }

    
  componentWillMount() {

    this.setState({
      alpha: Math.floor(Math.random() * 13), 
      beta: Math.floor(Math.random() * 13), 
      lang: 'English',
      checked: true,
      rand: Math.floor(Math.random() * 3),
      timer: 10,
    });


    this.interval = setInterval(
      () => this.setState({timer: --this.state.timer}),
      1000
      );

  }

  componentDidMount() {

    var operation;

    if (this.state.ops[this.state.rand] == '+') {
      operation = 'plus'
    } else if (this.state.ops[this.state.rand] == '-') {
      operation = 'minus'
    } else if (this.state.ops[this.state.rand] == '*') {
      operation = 'times'
    }

    Expo.Speech.speak(String(this.state.alpha) + operation + String(this.state.beta), {
      language: this.state.langSym,
      pitch: 1.0,
      rate: 0.75,
    })

  }

  componentDidUpdate() {

    if (this.state.timer == 10) {

      var operation;

      if (this.state.ops[this.state.rand] == '+') {
        operation = 'plus'
      } else if (this.state.ops[this.state.rand] == '-') {
        operation = 'minus'
      } else if (this.state.ops[this.state.rand] == '*') {
        operation = 'times'
      }

      Expo.Speech.speak(String(this.state.alpha) + operation + String(this.state.beta), {
        pitch: 1.0,
        rate: 0.75,
      })
    }


    if(this.state.timer === 0) {
      clearInterval(this.interval); 
      this.componentWillMount(); 
    }

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  checkMyAnsButtonPress = () => {

  	var onCorrectArray = ['Yay!', 'Niceeeeee!', 'Woohooo!', 'Congratulations!'];
    var onWrongArray = ['Not_Quite!', 'Try_Again!', 'Good_Effort!', 'Almost!']

    var onCorrect = onCorrectArray[Math.floor(Math.random() * onCorrectArray.length)];
    var onWrong = onWrongArray[Math.floor(Math.random() * onWrongArray.length)];

    var soundFile;

    if (this.state.rand == 0 && this.state.alpha + this.state.beta == this.state.formInputText) {
    	this.setState({result: onCorrect}); 
    	soundFile = onCorrect;

    } else if (this.state.rand == 1 && this.state.alpha - this.state.beta == this.state.formInputText) {
    	this.setState({result: onCorrect}); 
    	soundFile = onCorrect;

    } else if (this.state.rand == 2 && this.state.alpha * this.state.beta == this.state.formInputText) {
    	this.setState({result: onCorrect}); 
    	soundFile = onCorrect;

    } else {
      	this.setState({result: onWrong});
      	soundFile = onWrong
    }

    //console.log(soundFile)

    // require() can't handle dynamic file parameter so had to handle case by case for each sound file
    // for example cannot say require(soundFile)
    // has to be a string literal as an argument for ex. require('./soundFile')

    if (this.state.checked) {

	    switch(soundFile) {
	    	case 'Yay!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Yay!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Niceeeeee!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Niceeeeee!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Woohooo!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Woohooo!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Congratulations!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Congratulations!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Not_Quite!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Not_Quite!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Try_Again!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Try_Again!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Good_Effort!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Good_Effort!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Almost!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Almost!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	}


	      }


    }


  render() {

    return(
      <View style = {styles.container}>

        <Text style = {styles.timerBox}>
          {this.state.timer}
        </Text>

        <Text style = {styles.box}>
          {this.state.alpha}
        </Text>

        <Text style = {{padding: 10, fontSize: 40}}>
          {this.state.ops[this.state.rand]}
        </Text>

        <Text style = {styles.box}>
          {this.state.beta}
        </Text>

        <Text style = {{padding: 10, fontSize: 40}}>
          =
        </Text>
        
        <FormLabel>Result</FormLabel>
        <FormInput 
          ref={input => this.formInput = input}
          inputStyle={{width: 300, fontSize: 40, color: 'black', backgroundColor: '#eeeeee'}}
          onChangeText= {(text) => this.setState({formInputText: text})}/>

        <Button onPress = {() => this.checkMyAnsButtonPress()} block success rounded>
            <Text> Check My Answer! </Text>
        </Button>

        <Text style={{padding: 10, fontSize: 40}}>
          {this.state.result}
        </Text>

        <CheckBox
          center
          title='Sound'
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
        />

      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce5f9',
    alignContent: 'space-around',
    padding: 25,
    marginTop: 10,
  },

  box: {
    width: 325,
    height: 70,
    borderRadius: 100/2,
    backgroundColor: '#eeeeee',
    padding: 10,
    fontSize: 50,
  },

  timerBox: {
    backgroundColor: '#fd5f5f',
    padding: 5,
    fontSize: 30,
    textAlign: 'center',

  },

});