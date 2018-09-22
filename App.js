import React from 'react';
import { Picker, ScrollView, KeyboardAvoidingView, Alert, StyleSheet, View, Vibration, TextInput } from 'react-native';
import { Container, Header, Content, Button, Text, Item, Input, Icon, Badge, InputGroup } from 'native-base';
import { CheckBox, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import { Dropdown } from 'react-native-material-dropdown';


export default class MathApp extends React.Component {
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
    };
  }

    
  componentWillMount() {

    this.setState({
      alpha: Math.floor(Math.random() * 13), 
      beta: Math.floor(Math.random() * 13), 
      lang: 'English',
      checked: true,
      rand: Math.floor(Math.random() * 3),

    })

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
      language: 'en',
      pitch: 1,
      rate: 0.75,
    })

  }


  handleTextChange = (text) => {

    var onCorrect;
    var onWrong;

    switch(this.state.lang) {
      case 'English':
        onCorrect = 'Yay!';
        onWrong = 'Not Quite!';
        break;

      case 'Spanish':
        onCorrect = 'Correcto!';
        onWrong = 'Incorrecto';
        break;

      case 'French':
        onCorrect = 'Correct!';
        onWrong = 'Incorrect!';
        break;

      case 'Chinese':
        onCorrect = '正确';
        onWrong = '不正确';
        break;

      case 'Japanese':
        onCorrect = '正しい';
        onWrong = '間違った';
        break;
    }
    
    if (this.state.rand == 0 && this.state.alpha + this.state.beta == text) {this.setState({result: onCorrect})}
    else if (this.state.rand == 1 && this.state.alpha - this.state.beta == text) {this.setState({result: onCorrect})}
    else if (this.state.rand == 2 && this.state.alpha * this.state.beta == text) {this.setState({result: onCorrect})}
    else {
      this.setState({result: onWrong})
    }
    console.log(this.state.result)
  }


  handleButtonPress = () => {

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
        langSym = 'en'
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
          inputStyle={{width: 235, fontSize: 40, color: 'black', backgroundColor: '#eeeeee'}}
          onChangeText= {(text) => this.handleTextChange(text)}/>

        <Text style={{padding: 10, fontSize: 40}}>
          {this.state.result}
        </Text>

        <CheckBox
          center
          title='Sound'
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
        />

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


        <Button onPress = {() => this.handleButtonPress()} block>
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
    width: 240,
    height: 70,
    borderRadius: 100/2,
    backgroundColor: '#eeeeee',
    padding: 10,
    fontSize: 50,

}
});