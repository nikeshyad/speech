import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text, Item, Input } from 'native-base';
import { CheckBox, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

export default class PlayGround extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alpha: '',
      beta: '',
      result: '',
      rand: '',
      checked: '',
      lang: '',
      ops: ['+', '-', 'x'],
      formInputText: '',
    };

    navigationOptions = {
      title: 'Play Ground'
    }
  }

    
  componentWillMount() {

    this.setState({
      alpha: Math.floor(Math.random() * 13), 
      beta: Math.floor(Math.random() * 13), 
      lang: 'English',
      checked: true,
      rand: Math.floor(Math.random() * 3),
    });

  }

  componentDidMount() {

    var operation;

    if (this.state.ops[this.state.rand] == '+') {
      operation = 'plus'
    } else if (this.state.ops[this.state.rand] == '-') {
      operation = 'minus'
    } else if (this.state.ops[this.state.rand] == 'x') {
      operation = 'times'
    }

    Expo.Speech.speak(String(this.state.alpha) + operation + String(this.state.beta), {
      language: this.state.langSym,
      pitch: 1.0,
      rate: 0.75,
    })

  }


  checkMyAnsButtonPress = () => {

  	var onCorrectArray = ['Yay!', 'Niceeeeee!', 'Woohooo!', 'Congratulations!'];
    var onWrongArray = ['You_Suck!', 'Not_Quite!', 'Try_Again!', 'Good_Effort!', 'Almost_Got_It!']

    var onCorrect = onCorrectArray[Math.floor(Math.random() * onCorrectArray.length)];
    var onWrong = onWrongArray[Math.floor(Math.random() * onWrongArray.length)];

    //getting rid of underscores
    var splt = onWrong.split("_");
    onWrongNew = splt.join(' ');
    //

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
      	this.setState({result: onWrongNew});
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

	      	case 'Almost_Got_It!':
	    		var { sound: soundObject, status } = Expo.Audio.Sound.create(
	        		require('./Sound/Almost_Got_It!.m4a'),
	        		{ shouldPlay: true }
	      		);
	      		break;

          case 'You_Suck!':
          var { sound: soundObject, status } = Expo.Audio.Sound.create(
              require('./Sound/You_Suck!.m4a'),
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
      } else if (this.state.ops[randNum] == 'x') {
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

        <Text style = {styles.intBox}>
          {this.state.alpha}
        </Text>

        <Text style = {{textAlign: 'center', fontSize: 40, paddingRight: 15}}>
          {this.state.ops[this.state.rand]}
        </Text>

        <Text style = {styles.intBox}>
          {this.state.beta}
        </Text>

        <Text style = {{textAlign: 'center', fontSize: 40, paddingRight: 10}}>
          =
        </Text>
        
        <FormLabel>Result</FormLabel>
        <FormInput 
          ref={input => this.formInput = input}
          inputStyle={{textAlign: 'center', paddingRight: 15, width: Dimensions.get('window').width/1.32, fontSize: 30, color: 'black', backgroundColor: '#eeeeee'}}
          onChangeText= {(text) => this.setState({formInputText: text})}/>

        <Button style = {styles.buttonContainer} onPress = {() => this.checkMyAnsButtonPress()} block success rounded>
            <Text> Check My Answer! </Text>
        </Button>

        <Text style={{textAlign: 'center', fontSize: 30, padding: 15}}>
          {this.state.result}
        </Text>

        <CheckBox
          center
          title='Sound'
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
        />

        <Button style = {styles.buttonContainer} onPress = {() => this.handleNextButtonPress()} block success rounded>
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
    padding: 25,
  },

  buttonContainer: {
    marginTop: 10,
  },

  intBox: {
    width: Dimensions.get('window').width/1.2,
    height: Dimensions.get('window').height/15,
    backgroundColor: '#eeeeee',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },

});