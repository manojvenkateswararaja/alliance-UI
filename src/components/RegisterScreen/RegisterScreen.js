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
    this.onSubmitClaimsId= this.onSubmitClaimsId.bind(this);
    this.onSubmitExaminerId= this.onSubmitExaminerId.bind(this);
    this.onSubmitLicenseId= this.onSubmitLicenseId.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    
    this.usertypeRef = this.updateRef.bind(this, 'usertype');
    this.fnameRef = this.updateRef.bind(this, 'fname');
    this.lnameRef = this.updateRef.bind(this, 'lname');
    this.phoneRef = this.updateRef.bind(this, 'phone');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.rpasswordRef = this.updateRef.bind(this, 'rpassword');
    this.LicenseIdRef = this.updateRef.bind(this, 'LicenseId');
    this.ClaimsIdRef = this.updateRef.bind(this, 'ClaimsId');
    this.ExaminerIdRef = this.updateRef.bind(this, 'ExaminerId');
    this.onDropdownChange = this.onDropdownChange.bind(this);
    
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
    this.state = {
        fname: '',
        lname: '',
        phone: '',
        email: '',
        password: '',
        rpassword: '',
        usertype:'',
        LicenseId:'',
        ClaimsId:'',
        ExaminerId:'',
        name: 'Cyan',
        code: 'A700',
        secureTextEntry: true,
        value_LicenseId: false,
        value_ClaimsId: false,
        value_ExaminerId: false,
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
validateRpassword(value){
  console.log("value"+value);
  console.log("password"+this.state.password);
  if (value !== this.state.password) {
      return false;
  } else {
      return true;
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
onSubmitRpassword(){
  this.rpassword.focus();
}
onSubmitExaminerId(){
  this.ExaminerId.focus();
}
onSubmitLicenseId(){
  this.LicenseId.focus();
}
onSubmitClaimsId(){
  this.ClaimsId.focus();
}

onBlur() {
  let errors = {};
  
  ['fname', 'lname','phone', 'email','password','rpassword' ]
  .forEach((name) => {
      console.log("Name: " + name);
      let value = this[name].value();
      console.log("Value: " + value);
      
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
            // if (name === 'rpassword' && value.length < 6) {
            //   errors[name] = 'Too short';
            // }
             if (name === 'rpassword' &&  !this.validateRpassword(value)) {
              errors[name] = 'Password Must Match';
            }
            if (name === 'usertype') {
              errors[name] = 'Usertype must be selected';
            }
          }
  });
  
  this.setState({ errors });
}

isEmptyObject(object) {
        return (Object.getOwnPropertyNames(object).length === 0);
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
  ['fname','lname','phone', 'email','password','rpassword', 'usertype']
  .map((name) => ({ name, ref: this[name] }))
  .forEach(({ name, ref }) => {
      if (ref.isFocused()) {
          this.setState({ [name]: text });
      }
  });
}

onChangeText1(text) {
  console.log("Test: "+ text);
  /*console.log("value_LicenseId: "+ this.state.value_LicenseId);
  if (this.state.value_LicenseId) {
    this.setState({LicenseId: value});
  }
  if (this.state.value_ExaminerId) {
    this.setState({ExaminerId: value});
  }
  if (this.state.value_ClaimsId) {
    this.setState({ClaimsId: value});
  }*/
}

onDropdownChange(text1) {
  //['LicenseId','ClaimsId','ExaminerId']
  console.log("Dropdown: " + text1);
  if (text1 === "Public Adjuster") {
  this.setState({ value_LicenseId: true });
  } else {
    this.setState({ value_LicenseId: false });
  }
  if (text1 === "Claims Adjuster") {
  this.setState({ value_ClaimsId: true });
  } else {
    this.setState({ value_ClaimsId: false });
  }
  if (text1 === "Examiner") {
  this.setState({ value_ExaminerId: true });
  } else {
    this.setState({ value_ExaminerId: false });
  }
  this.setState({usertype: text1});
}

onSubmitRegister() {
  
  let errors = new Object;
  let i =0;
  let test;
    if (this.state.value_LicenseId) {
        test = ['fname', 'lname','phone', 'email','password','rpassword', 'LicenseId' ];
    }
    if (this.state.value_ExaminerId) {
        test = ['fname', 'lname','phone', 'email','password','rpassword', 'ExaminerId' ];
    }
    if (this.state.value_ClaimsId) {
        test = ['fname', 'lname','phone', 'email','password','rpassword', 'ClaimsId' ];
    }
console.log("Test: " + test)
  test.forEach((name) => {
      let a = i++;
      let value = this[name].value();
    
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
               if (name === 'rpassword' &&  !this.validateRpassword(value)) {
              errors[name] = 'Password Must Match';
            }
            if (name==='LicenseId' && value.length<2) {
              errors[name] = 'Invalid Number';
            }
              if(a=6){
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

  
  if (this.isEmptyObject(errors)) {
  if (this.state.value_ClaimsId) {
this.setState({userObject: {
  fname: this.state.fname, 
  lname: this.state.lname,
  phone: this.state.phone,
  ClaimsId: this.state.ClaimsId
} 
});
}
if (this.state.value_ExaminerId) {
this.setState({userObject: {
  fname: this.state.fname, 
  lname: this.state.lname,
  phone: this.state.phone,
  ExaminerId: this.state.ExaminerId
} 
});
}
if (this.state.value_LicenseId) {
  this.setState({userObject: {
  fname: this.state.fname, 
  lname: this.state.lname,
  phone: this.state.phone,
  LicenseId: this.state.LicenseId
} 
});
}

  return fetch('http://192.168.0.20:8082/registerUser', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
email: this.state.email,
password:  this.state.password,

userObject:this.state.userObject,
usertype: this.state.usertype,
 })
})
.then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson.message"+responseJson.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }
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
    let { rpassword = 'rpassword' } = data;
    let { LicenseId = 'LicenseId' } = data;
    let { ClaimsId = 'ClaimsId' } = data;
    let { ExaminerId = 'ExaminerId' } = data;
    let { usertype = 'usertype'  } = data;
    
    
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
                    <TextField
                        ref={this.rpasswordRef}
                        value={data.rpassword}
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitRpassword}
                        returnKeyType='next'
                        label="Retype Password"
                        error={errors.rpassword}
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
                     {this.state.value_LicenseId && 
                      <TextField
                        ref={this.LicenseIdRef}
                        value={data.LicenseId}
                        keyboardType='numeric'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitLicenseId}
                        returnKeyType='next'
                        label="License Id"
                        error={errors.LicenseId}
                        tintColor={white}
                        textColor={white}
                    />
                     }
                     </View>
                      <View>
                     {this.state.value_ClaimsId && 
                      <TextField
                        ref={this.ClaimsIdRef}
                        value={data.ClaimsId}
                        keyboardType='numeric'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitClaimsId}
                        returnKeyType='next'
                        label="Claims Id"
                        tintColor={white}
                        textColor={white}
                    />
                     }
                     </View>
                      <View>
                     {this.state.value_ExaminerId && 
                      <TextField
                        ref={this.ExaminerIdRef}
                        value={data.ExaminerId}
                        keyboardType='numeric'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitExaminerId}
                        returnKeyType='next'
                        label="Examiner Id"
                        tintColor={white}
                        textColor={white}
                    />
                     }
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
