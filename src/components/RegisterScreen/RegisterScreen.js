import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import colors from '../../utils/colors';
import {TextField} from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {RaisedTextButton} from 'react-native-material-buttons';
import {Dropdown} from 'react-native-material-dropdown';
import Toast from 'react-native-root-toast';
import environment from '../../utils/environment';

const {loginscreenLogoContainer, loginscreenLogo, loginTitle, container1} = customstyles;
const {login_welcome} = customtext;
const {
  username_label,
  password_label,
  login_label,
  create_account_text,
  create_account_link,
  value_true,
  usertypeData,
  login_account_text,
  login_account_link
} = customtext;
const {
  loginscreenInputContainer,
  loginscreenContainer,
  loginscreenCreateAccountWrapper,
  loginscreenCreateAccountText,
  loginscreenCreateAccountLinkText,
  loginscreenLoginContainer,
  commonLoading
} = customstyles;
const {white, turquoise, red} = colors;
const { base_url } = environment;

export default class RegisterScreen extends Component {
  constructor() {
    super();

    this.onFocus = this
      .onFocus
      .bind(this);
    this.onChangeText = this
      .onChangeText
      .bind(this);
    this.onSubmitEmail = this
      .onSubmitEmail
      .bind(this);
    this.onSubmitPassword = this
      .onSubmitPassword
      .bind(this);
    this.onSubmitClaimsId = this
      .onSubmitClaimsId
      .bind(this);
    this.onSubmitExaminerId = this
      .onSubmitExaminerId
      .bind(this);
    
    this.onBlur = this
      .onBlur
      .bind(this);
    this.onAccessoryPress = this
      .onAccessoryPress
      .bind(this);
    this.onSubmitRegister = this
      .onSubmitRegister
      .bind(this);
      this.onLogin = this
      .onLogin
      .bind(this);

    this.usertypeRef = this
      .updateRef
      .bind(this, 'usertype');
    this.fnameRef = this
      .updateRef
      .bind(this, 'fname');
    this.lnameRef = this
      .updateRef
      .bind(this, 'lname');
    this.phoneRef = this
      .updateRef
      .bind(this, 'phone');
    this.emailRef = this
      .updateRef
      .bind(this, 'email');
    this.passwordRef = this
      .updateRef
      .bind(this, 'password');
    this.rpasswordRef = this
      .updateRef
      .bind(this, 'rpassword');
    this.LicenseIdRef = this
      .updateRef
      .bind(this, 'LicenseId');
    this.ClaimsIdRef = this
      .updateRef
      .bind(this, 'ClaimsId');
    this.ExaminerIdRef = this
      .updateRef
      .bind(this, 'ExaminerId');
    this.onDropdownChange = this
      .onDropdownChange
      .bind(this);

    this.renderPasswordAccessory = this
      .renderPasswordAccessory
      .bind(this);
    this.state = {
      fname: '',
      lname: '',
      phone: '',
      email: '',
      password: '',
      rpassword: '',
      usertype: '',
      LicenseId: '',
      ClaimsId: '',
      ExaminerId: '',
      name: 'Cyan',
      code: 'A700',
      secureTextEntry: true,
      value_LicenseId: false,
      value_ClaimsId: false,
      value_ExaminerId: false
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
  validateRpassword(value) {
    if (value !== this.state.password) {
      return false;
    } else {
      return true;
    }
  }
  onAccessoryPress() {
    this.setState(({secureTextEntry}) => ({
      secureTextEntry: !secureTextEntry
    }));
  }
  onSubmitFirstName() {
    this
      .fname
      .focus();
  }
  onSubmitLastName() {
    this
      .lname
      .focus();
  }
  onSubmitPhone() {
    this
      .phone
      .focus();
  }

  onSubmitEmail() {
    this
      .email
      .focus();
  }

  onSubmitPassword() {
    this
      .password
      .focus();
  }
  onSubmitRpassword() {
    this
      .rpassword
      .focus();
  }
  onSubmitExaminerId() {
    this
      .ExaminerId
      .focus();
  }
  onSubmitLicenseId() {
    this
      .LicenseId
      .focus();
  }
  onSubmitClaimsId() {
    this
      .ClaimsId
      .focus();
  }
  onLogin(){
    this
    .props
    .navigation
    .navigate('LoginPage');
  }
  onBlur() {
    let errors = {};

    [
      'fname',
      'lname',
      'phone',
      'email',
      'password',
      'rpassword'
    ].forEach((name) => {

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
        if (name === 'password' && value.length < 6) {
          errors[name] = 'Too short';
        }
        if (name === 'rpassword' && !this.validateRpassword(value)) {
          errors[name] = 'Password Must Match';
        }
       
      }
    });
    
    this.setState({errors});
  }

  isEmptyObject(object) {
    return (Object.getOwnPropertyNames(object).length === 0);
  }

  onFocus() {
    let {
      errors = {}
    } = this.state;
    for (let name in errors) {
      let ref = this[name];
      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({errors});
  }

  onChangeText(text) {
    [
      'fname',
      'lname',
      'phone',
      'email',
      'password',
      'rpassword',
      'usertype'
     
    ].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
      if (ref.isFocused()) {
        this.setState({[name]: text});
      }
    });
  }

  onDropdownChange(text1) {

    if (text1 === "Public Adjuster") {
      this.setState({value_LicenseId: true});
    } else {
      this.setState({value_LicenseId: false});
    }
    if (text1 === "Claims Adjuster") {
      this.setState({value_ClaimsId: true});
    } else {
      this.setState({value_ClaimsId: false});
    }
    if (text1 === "Examiner") {
      this.setState({value_ExaminerId: true});
    } else {
      this.setState({value_ExaminerId: false});
    }
    this.setState({usertype: text1});
  }

  onSubmitRegister() {
  var phone;
    let errors = new Object;
    this.setState({loading_blur: true});
    
    let test;
    if (this.state.value_LicenseId) {
      test = [
        'fname',
        'lname',
        'phone',
        'email',
        'password',
        'rpassword',
        'LicenseId'
      ];
    } else if (this.state.value_ExaminerId) {
      test = [
        'fname',
        'lname',
        'phone',
        'email',
        'password',
        'rpassword',
        'ExaminerId'
      ];
    } else if (this.state.value_ClaimsId) {
      test = [
        'fname',
        'lname',
        'phone',
        'email',
        'password',
        'rpassword',
        'ClaimsId'
      ];
    } else {
      test = [
        'fname',
        'lname',
        'phone',
        'email',
        'password',
        'rpassword'
      ];

    }
console.log("rgitest"+test);
    test.forEach((name) => {

      let value = this[name].value();
      console.log("rgivalue"+value);

      if (!value) {
        errors[name] = 'Should not be empty';
      } else {
        if (name === 'fname' && value.length < 2) {
          errors[name] = 'Invalid fname';
        }
        if (name === 'lname' && value.length < 2) {
          errors[name] = 'Invalid lname';
        }
        if (name === 'phone' && value.length < 12) {
          errors[name] = 'Incorrect Phone Number';
        }
        if (name === 'email' && !this.validateEmail(value)) {
          errors[name] = 'Invalid Email ID';
        }
        if (name === 'password' && value.length < 6) {
          errors[name] = 'Too short';
        }
        if (name === 'rpassword' && !this.validateRpassword(value)) {
          errors[name] = 'Password Must Match';
        }
        if (name === 'LicenseId' && value.length < 2) {
          errors[name] = 'Invalid Number';
        }
        if (name === 'ExaminerId' && value.length < 2) {
          errors[name] = 'Invalid Number';
        }
        if (name === 'ClaimsId' && value.length < 2) {
          errors[name] = 'Invalid Number';
        }

      }

    });

    if (errors === null || errors === 'null' || errors === 'undefined' || !errors) {
      console.log("Failure");

    } 
    if (this.isEmptyObject(errors)) {
      
                  setTimeout(() => {
                      this.setState({loading_blur: false});
      
                  }, 3000)
              } else {
                  this.setState({loading_blur: false});
              }
      
    this.setState({errors});

    if (this.isEmptyObject(errors)) {
      if (this.state.value_ClaimsId) {
        this.setState({
          userObject: {
            fname: this.state.fname,
            lname: this.state.lname,
            phone: this.state.phone,
            ClaimsId: this.state.ClaimsId
          }
        });
      } else if (this.state.value_ExaminerId) {
        this.setState({
          userObject: {
            fname: this.state.fname,
            lname: this.state.lname,
            phone: this.state.phone,
            ExaminerId: this.state.ExaminerId
          }
        });
      } else if (this.state.value_LicenseId) {
        this.setState({
          userObject: {
            fname: this.state.fname,
            lname: this.state.lname,
            phone: this.state.phone,
            LicenseId: this.state.LicenseId
          }
        });
      } else {
        this.setState({
          userObject: {
            fname: this.state.fname,
            lname: this.state.lname,
            phone: this.state.phone
          }
        });

      }

      return fetch(base_url + '/registerUser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: this.state.email, password: this.state.password, userObject: this.state.userObject, usertype: this.state.usertype})
      }).then((response) => response.json()).then((responseJson) => {

        var message = responseJson.message;
        if (message === 'Please verify your emailid and phone no' ) {
          let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER
          }, 1000);
          setTimeout(function () {
            Toast.hide(toast);
          }, 5000);
          this
          .props
          .navigation
          .navigate('OTPPage',{
            phone:this.state.phone
          });
        }
        if (message === 'User Already Registered !'||message === 'Internal Server Error !') {
          let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER
          }, 1000);
          setTimeout(function () {
            Toast.hide(toast);
          }, 5000);
         
        }

      }).catch((error) => {
        console.error(error);

      });
    }

  }
  updateRef(name, ref) {
    this[name] = ref;
  }
  renderPasswordAccessory() {
    let {secureTextEntry} = this.state;
    let name = secureTextEntry
      ? 'visibility'
      : 'visibility-off';
    return (<MaterialIcon
      size={24}
      name={name}
      color={TextField.defaultProps.baseColor}
      onPress={this.onAccessoryPress}
      suppressHighlighting/>);
  }

  isEmptyObject(object) {
    return (Object.getOwnPropertyNames(object).length === 0);
}
  static navigationOptions = {
    header: null
  }
  render() {
    let {
      errors = {},
      secureTextEntry,
      ...data
    } = this.state;
    let {
      fname = 'fname'
    } = data;
    let {
      lname = 'lname'
    } = data;
    let {
      phone = 'phone'
    } = data;
    let {
      email = 'email'
    } = data;
    let {
      password = 'password'
    } = data;
    let {
      rpassword = 'rpassword'
    } = data;
    let {
      LicenseId = 'LicenseId'
    } = data;
    let {
      ClaimsId = 'ClaimsId'
    } = data;
    let {
      ExaminerId = 'ExaminerId'
    } = data;
    let {
      usertype = 'usertype'
    } = data;

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
              onBlur={this.onBlur}/>
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
              onBlur={this.onBlur}/>
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
              onBlur={this.onBlur}/>

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
              onBlur={this.onBlur}/>
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
              onBlur={this.onBlur}/>
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
              onBlur={this.onBlur}/>

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
              style={container1}/>
            <View>
              {this.state.value_LicenseId && <TextField
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
                textColor={white}/>
}
            </View>
            <View>
              {this.state.value_ClaimsId && <TextField
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
                error={errors.ClaimsId}
                tintColor={white}
                textColor={white}/>
}
            </View>
            <View>
              {this.state.value_ExaminerId && <TextField
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
                error={errors.ExaminerId}
                tintColor={white}
                textColor={white}/>
}
            </View>
            <View style={loginscreenLoginContainer}>
              <RaisedTextButton
                onPress={this.onSubmitRegister}
                title="Register"
                color={turquoise}
                titleColor={white}/>
            </View>
            <View style={loginscreenCreateAccountWrapper}>
                        <Text style={loginscreenCreateAccountText}>
                            {login_account_text}
                        </Text>
                        <TouchableOpacity activeOpacity={.5} onPress={this.onLogin}>
                            <View>
                                <Text style={loginscreenCreateAccountLinkText}>
                                    {login_account_link}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
          </View>

        </ScrollView>
        {this.state.loading_blur && <View style={commonLoading}>
                    <ActivityIndicator size='large'/>
                </View>
}
      </KeyboardAvoidingView>
    );
  }
}


