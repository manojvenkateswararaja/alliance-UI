import React, { Component } from 'react';
import { Text,
         View,
         StyleSheet, 
         ActivityIndicator, 
         Image, 
         KeyboardAvoidingView ,
         TouchableOpacity
        } from 'react-native';
import { NavigationActions } from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
// import LoginForm from './LoginForm';
import colors from '../../utils/colors';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';

const { 
        loginscreenLogoContainer,
        loginscreenLogo,
        loginTitle,
        commonLoading 
    } = customstyles;
const { login_welcome } = customtext;
const { username_label,
    password_label,
    login_label,
    create_account_text,
    create_account_link
 } = customtext;
const { loginscreenInputContainer,
    loginscreenContainer,
    loginscreenCreateAccountWrapper,
    loginscreenCreateAccountText,
    loginscreenCreateAccountLinkText,
    loginscreenLoginContainer
 } = customstyles;
const { white,
    turquoise
 } = colors;

export default class LoginScreen extends Component {
    constructor() {
        super();

        this.onFocus = this.onFocus.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitUserName = this.onSubmitUserName.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.onRegistration = this.onRegistration.bind(this);
        
        this.usernameRef = this.updateRef.bind(this, 'username');
        this.passwordRef = this.updateRef.bind(this, 'password');
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            username: '',
            password: '',
            secureTextEntry: true,
            loading_blur: false
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

    onSubmitUserName() {
        this.username.focus();
    }

    onSubmitPassword() {
        this.password.focus();
    }

    onBlur() {
        let errors = {};
        
        ['username', 'password']
        .forEach((name) => {
            let value = this[name].value();
            
            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'password' && value.length < 6) {
                    errors[name] = 'Too short';
                }
                if (name === 'username' && !this.validateEmail(value)) {
                    errors[name] = 'Invalid Email ID';
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
        ['username', 'password']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
                this.setState({ [name]: text });
            }
        });
    }

    onSubmitLogin() {
        let errors = {};
        this.setState({loading_blur: true});

        ['username', 'password']
        .forEach((name) => {
            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if ('password' === name && value.length < 6) {
                    errors[name] = 'Too short';
                }
                if ('username' === name && !this.validateEmail(value)) {
                    errors[name] = 'Invalid Email ID';
                }
            }
        });
  if(this.isEmptyObject(errors)) {
            setTimeout(() => {
                this.setState({loading_blur: false});
                this.setState({userType : 'Direct Clients'});
                this.props.navigation.navigate('HomePageClients');
            }, 3000)
        } else {
            this.setState({loading_blur: false});
        }

        this.setState({ errors });
return fetch('http://192.168.0.20:8082/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
email: this.state.username,
password:  this.state.password

 })
})
.then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson.message"+responseJson.message);
         console.log("responseJson.token"+responseJson.token);
          console.log("responseJson.userdetails"+responseJson.userdetails.rapidID);
           console.log("responseJson.usertype"+responseJson.userdetails.usertype);
      })
      .catch((error) => {
        console.error(error);
      });
  



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

    onRegistration(){
        console.log("Registerpage");
        this.props.navigation.navigate('RegisterPage');
    }
    isEmptyObject(object) {
        return (Object.getOwnPropertyNames(object).length === 0);
    }

    static navigationOptions = {
        header: null,
    }
    
    render() {
        let { errors = {}, secureTextEntry, ...data } = this.state;
        let { username = 'username' } = data;

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
                <View style={loginscreenLogoContainer}>
                    <Image
                        style={loginscreenLogo}
                        source={require('../../../assets/images/logo.png')}
                    />

                    <Text style={loginTitle}>{login_welcome}</Text>
                </View>
                <View style={loginscreenInputContainer}>
                    <TextField
                        ref={this.usernameRef}
                        value={data.username}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitUserName}
                        returnKeyType='next'
                        label={username_label}
                        error={errors.username}
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

                    <View style={loginscreenLoginContainer}>
                        <RaisedTextButton 
                            onPress={this.onSubmitLogin} 
                            title={login_label} 
                            color={turquoise} 
                            titleColor={white} 
                        />
                    </View>
                    
                    <View style={loginscreenCreateAccountWrapper}>
                        <Text style={loginscreenCreateAccountText}>
                            {create_account_text}
                        </Text>
                        <TouchableOpacity 
                            activeOpacity={.5}
                            onPress={this.onRegistration}>
                            <View>
                                <Text style={loginscreenCreateAccountLinkText}>
                                    {create_account_link}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                { /* Due to parent child relation of (this.props.navigation.navigate)
                 page is not navigating from LoginScreen to RegisterScreen */}
                {/* <LoginForm /> */}
                    {this.state.loading_blur &&
                    <View style={commonLoading}>
                        <ActivityIndicator size='large' />
                    </View>
                }
            </KeyboardAvoidingView>
        );
    }
}