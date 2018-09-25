import React from 'react';
import { Picker, ScrollView, KeyboardAvoidingView, StyleSheet, View, Vibration, TextInput } from 'react-native';
import { Container, Header, Content, Button, Text, Item, Input, Icon, Badge, InputGroup } from 'native-base';
import { CheckBox, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import { Dropdown } from 'react-native-material-dropdown';

//fix speech when timer runs down 
//see if timer can be turned off

export default class RapidFire extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      alpha: '',
      beta: '',
      result: '',
      rand: '',
      checked: '',
      lang: '',
      ops: ['+', '-', '*'],
      formInputText: '',
      timer: '',
      interval: '',
    };
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


  checkMyAnsButtonPress = () => {

  	var onCorrectArray = ['Yay!', 'Good Job!', 'Niceeeeee!', 'Woohooo!', 'Congratulations!'];
    var onWrongArray = ['Not Quite!', 'Try Again!', 'Good Try!', 'Good Effort!', 'Almost Got It!']

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

	      	case 'Good Job!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Good Job!.m4a'),
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

	      	case 'Not Quite!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Not Quite!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Try Again!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Try Again!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Good Try!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Good Try!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Good Effort!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Good Effort!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	case 'Almost Got It!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Almost Got It!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

	      	}


	      }


    }


  handleNextButtonPress = () => {

  	this.setState({result: ''})

    var randomAlpha = Math.floor(Math.random() * 13);
    var randomBeta = Math.floor(Math.random() * 13);
    var randNum = Math.floor(Math.random() * 3)


    if (this.state.checked) {

      var operation;

      if (this.state.ops[randNum] == '+') {
        operation = 'plus'
      } else if (this.state.ops[randNum] == '-') {
        operation = 'minus'
      } else if (this.state.ops[randNum] == '*') {
        operation = 'times'
      }

      var langSym;

      if (this.state.lang == 'English') {
        langSym = ''
      } else if (this.state.lang == 'Spanish') {
        langSym = 'es'
      } else if (this.state.lang == 'French') {
        langSym = 'fr'
      } else if (this.state.lang == 'Chinese') {
        langSym = 'zh'
      } else if (this.state.lang == 'Japanese') {
        langSym = 'ja'
      }

      Expo.Speech.speak(String(randomAlpha) + operation + String(randomBeta), {
        language: langSym,
        pitch: 1,
        rate: 0.75,

      })

    }

    this.setState({alpha: randomAlpha, beta: randomBeta})
    this.setState({rand: randNum})

    
  }


  render() {

    let data = [{
        value: 'English',
      }, {
        value: 'Spanish',
      }, {
        value: 'French',
      }, {
        value: 'Chinese',
      }, {
        value: 'Japanese',
      },
    ];

    return(
      <View style = {styles.container}>

        <Text style = {styles.timerBox}>
          {this.state.timer}
        </Text>

        <Dropdown
          fontSize={20}
          itemColor={'grey'}
          selectedItemColor={'green'}
          rippleOpacity={0.54}
          label='Language'
          data={data}
          value={this.state.lang}
          onChangeText={(value) => this.setState({lang: value})}
        />

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
          inputStyle={{width: 275, fontSize: 40, color: 'black', backgroundColor: '#eeeeee'}}
          onChangeText= {(text) => this.setState({formInputText: text})}/>

        <Button onPress = {() => this.checkMyAnsButtonPress()} block success>
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

        <Button onPress = {() => this.handleNextButtonPress()} block success>
            <Text> Next </Text>
        </Button>

      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce5f9',
    alignContent: 'space-around',
    justifyContent: 'center',
    padding: 50
  },

  box: {
    width: 300,
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