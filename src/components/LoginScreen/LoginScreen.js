import React, { Component } from 'react';
import { Text,
         View,
         StyleSheet, 
         ActivityIndicator, 
         Image, 
         KeyboardAvoidingView 
        } from 'react-native';
import { NavigationActions } from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import LoginForm from './LoginForm';

const { loginscreenContainer,
        loginscreenLogoContainer,
        loginscreenLogo,
        loginTitle 
    } = customstyles;
const { login_welcome } = customtext;

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
                <View style={loginscreenLogoContainer}>
                    <Image
                        style={loginscreenLogo}
                        source={require('../../../assets/images/logo.png')}
                    />

                    <Text style={loginTitle}>{login_welcome}</Text>
                </View>

                <LoginForm />
            </KeyboardAvoidingView>
        );
    }
}