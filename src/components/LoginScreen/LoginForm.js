import React, { Component } from 'react';
import { View, 
         Text,
         TouchableOpacity
     } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { RaisedTextButton } from 'react-native-material-buttons';
import customtext from '../../utils/customtext';
import customstyles from '../../../assets/styles/customstyles';
import colors from '../../utils/colors';

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

export default class LoginForm extends Component {
    constructor() {
        super();

        this.onFocus = this.onFocus.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitUserName = this.onSubmitUserName.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);

        this.usernameRef = this.updateRef.bind(this, 'username');
        this.passwordRef = this.updateRef.bind(this, 'password');

        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            username: '',
            password: '',
            secureTextEntry: true,
      };
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

        ['username', 'password']
            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    errors[name] = 'Should not be empty';
                } else {
                    if ('password' === name && value.length < 6) {
                        errors[name] = 'Too short';
                    }
                }
            });

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

    render() {
        let { errors = {}, secureTextEntry, ...data } = this.state;
        let { username = 'username' } = data;
        
        return (
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
                    returnKeyType='done'
                    label={password_label}
                    error={errors.password}
                    renderAccessory={this.renderPasswordAccessory}
                    tintColor={white}
                    textColor={white}
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
                    <TouchableOpacity activeOpacity={.5}>
                        <View>
                            <Text style={loginscreenCreateAccountLinkText}>
                                {create_account_link}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}