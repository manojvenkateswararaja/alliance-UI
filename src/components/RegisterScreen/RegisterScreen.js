import React, { Component } from 'react';
import { Text,
         View,
         StyleSheet, 
         ActivityIndicator, 
         Image, 
         KeyboardAvoidingView ,
         TouchableOpacity,
         ScrollView
        } from 'react-native';
import { NavigationActions } from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import colors from '../../utils/colors';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import { Dropdown } from 'react-native-material-dropdown';


const { 
        loginscreenLogoContainer,
        loginscreenLogo,
        loginTitle ,
        container1
      } = customstyles;
const { login_welcome } = customtext;
const { username_label,
        password_label,
        login_label,
        create_account_text,
        create_account_link,
        value_true
      } = customtext;
const { loginscreenInputContainer,
        loginscreenContainer,
        loginscreenCreateAccountWrapper,
        loginscreenCreateAccountText,
        loginscreenCreateAccountLinkText,
        loginscreenLoginContainer
      } = customstyles;
const { white,
        turquoise,
        red
      } = colors;

export default class RegisterScreen extends Component {
  constructor() {
    super();
    
    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    
    this.usertypeRef = this.updateRef.bind(this, 'usertype');
    this.fnameRef = this.updateRef.bind(this, 'fname');
    this.lnameRef = this.updateRef.bind(this, 'lname');
    this.phoneRef = this.updateRef.bind(this, 'phone');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.onChangeText = this.onChangeText.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
    
    
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.state = {
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
        usertype:'',
        secureTextEntry: true,
        value_true: false
  };
  this.state = {
    // usertype: "Select Usertype",
    name: 'Cyan',
    code: 'A700',
  };
}
validateEmail(value) {
  let regex = /\w[-._\w]*@[-._\w]*\w\.\w{2,5}/;
  if (regex.test(value) === true) {
      return true;
  } else {
      return false;
  }
}
onAccessoryPress() {
  this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
}
onSubmitFirstName(){
  this.fname.focus();
}
onSubmitLastName(){
  this.lname.focus();
}
onSubmitPhone(){
  this.phone.focus();
}

onSubmitEmail() {
  this.email.focus();
}

onSubmitPassword() {
  this.password.focus();
}

onBlur() {
  let errors = {};
  
  ['fname','lname','phone','email', 'password']
  .forEach((name) => {
      let value = this[name].value();
      
      if (!value) {
          errors[name] = 'Should not be empty';
                  } 
      else {
            if (name === 'fname' && value.length < 2) {
              errors[name] = 'Invalid fname';
            }
            if (name === 'lname' && value.length < 2) {
              errors[name] = 'Invalid lname';  
            }
            if (name === 'phone' && value.length < 10) {
              errors[name] = 'Incorrect Phone Number';
            }
            if (name === 'email' && !this.validateEmail(value)) {
              errors[name] = 'Invalid Email ID';
            }
            if (name === 'password' && value.length < 6) {
              errors[name] = 'Too short';
            }
          }
  });
  
  this.setState({ errors });
}
onFocus() {
  let { errors = {} } = this.state;
  for (let name in errors) {
      let ref = this[name];
      if (ref && ref.isFocused()) {
          delete errors[name];
      }
  }
  this.setState({ errors });
}

onChangeText(text) {
  ['fname','lname','phone', 'email','password']
  .map((name) => ({ name, ref: this[name] }))
  .forEach(({ name, ref }) => {
      if (ref.isFocused()) {
          this.setState({ [name]: text });
      }
  });
}

onDropdownChange(text) {
  console.log("Dropdown: " + text);
  if (text === "CNF Agents") {
  this.setState({ value_true: true });
  } else {
    this.setState({ value_true: false });
  }
}

onSubmitRegister() {
  
  let errors = new Object;
  let i =0;
  ['fname', 'lname','phone', 'email','password']
  .forEach((name) => {
      let a = i++;
      let value = this[name].value();
      console.log(name + " " + vavalue_truelue);
      if (!value) {
          errors[name] = 'Should not be empty';
      } else {
              if (name === 'fname' && value.length < 2) {
               errors[name] = 'Invalid fname';
              }
              if (name === 'lname' && value.length < 2) {
               errors[name] = 'Invalid lname';  
              }
              if (name === 'phone' && value.length < 10) {
               errors[name] = 'Incorrect Phone Number';
              }
              if (name === 'email' && !this.validateEmail(value)) {
               errors[name] = 'Invalid Email ID';
              }
              if (name === 'password' && value.length < 6 ) {
               errors[name] = 'Too short';
              } 
              if(a=4){
                console.log("value of a "+a);
                this.props.navigation.navigate('LoginPage');
                
              }     
            } 
            
  });
 
  if (errors === null || errors === 'null' || errors === 'undefined'
      || !errors ) {
    console.log("Success");
    this.props.navigation.navigate('LoginPage');
  } else {
    console.log("Failure");
  }
  this.setState({ errors });
  
}
updateRef(name, ref) {
  this[name] = ref;
}
renderPasswordAccessory() {
  let { secureTextEntry } = this.state;
  let name = secureTextEntry?
      'visibility':
      'visibility-off';
  return (
      <MaterialIcon
          size={24}
          name={name}
          color={TextField.defaultProps.baseColor}
          onPress={this.onAccessoryPress}
          suppressHighlighting
      />
  );
}
static navigationOptions = {
  header: null,
}
  render() {
    let { errors = {}, secureTextEntry, ...data } = this.state;
    let { fname = 'fname' } = data;
    let { lname = 'lname' } = data;
    let { phone = 'phone' } = data;
    let { email = 'email' } = data;
    let { password = 'password' } = data;
    let { usertype = 'usertype'  } = this.state;
    
    
    return (
      <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
          <ScrollView>            
                <View style={loginscreenInputContainer}>
                    <TextField
                        ref={this.fnameRef}
                        value={data.fname}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitFirstName}
                        returnKeyType='next'
                        label="FirstName"
                        error={errors.fname}
                        tintColor={white}
                        textColor={white}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.lnameRef}
                        value={data.lname}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitLastName}
                        returnKeyType='next'
                        label="LastName"
                        error={errors.lname}
                        tintColor={white}
                        textColor={white}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.phoneRef}
                        value={data.phone}
                        keyboardType='phone-pad'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitPhone}
                        returnKeyType='next'
                        label="Phone No."
                        error={errors.phone}
                        tintColor={white}
                        textColor={white}
                        onBlur={this.onBlur}
                    />

                    <TextField
                        ref={this.emailRef}
                        value={data.email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitEmail}
                        returnKeyType='next'
                        label="Email"
                        error={errors.email}
                        tintColor={white}
                        textColor={white}
                        onBlur={this.onBlur}
                    />
                    <TextField
                        ref={this.passwordRef}
                        value={data.password}
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitPassword}
                        returnKeyType='next'
                        label={password_label}
                        error={errors.password}
                        renderAccessory={this.renderPasswordAccessory}
                        tintColor={white}
                        textColor={white}
                        onBlur={this.onBlur}
                    /> 
                   
                    <Dropdown 
                        ref={this.usertypeRef}
                        value={data.usertype}
                        data={usertypeData}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onDropdownChange}
                        returnKeyType='next'
                        label="Select Usertype"
                        tintColor={white}
                        textColor={red}
                        style={container1}
                       
                     />
                     <View>
                     {this.state.value_true && 
                      <TextField
                        ref={this.emailRef}
                        value={data.email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitEmail}
                        returnKeyType='next'
                        label="Email"
                        error={errors.email}
                        tintColor={white}
                        textColor={white}
                    />
                     }
                     <TextField
                        ref={this.passwordRef}
                        value={data.password}
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitPassword}
                        returnKeyType='next'
                        label={password_label}
                        error={errors.password}
                        renderAccessory={this.renderPasswordAccessory}
                        tintColor={white}
                        textColor={white}
                        onBlur={this.onBlur}
                    /> 
                     </View>
                    <View style={loginscreenLoginContainer}>
                        <RaisedTextButton 
                            onPress={this.onSubmitRegister} 
                            title="Submit"
                            color={turquoise} 
                            titleColor={white} 
                        />
                    </View>
                     
                </View>
               </ScrollView>
            </KeyboardAvoidingView>
    );
}
}

const usertypeData = [
  { value: 'Public Adjuster' },
  { value: 'CNF Agents' },
  { value: 'Direct Clients' },
  { value: 'Claims Adjuster' },
  { value: 'Examiner'},
];
