import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import colors from '../../utils/colors';
import {TextField} from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {RaisedTextButton} from 'react-native-material-buttons';
import Toast from 'react-native-root-toast';
import environment from '../../utils/environment';


const {loginscreenLogoContainer, loginscreenLogo, loginTitle, commonLoading} = customstyles;

const {
    loginscreenInputContainer,
    loginscreenContainer,
    loginscreenCreateAccountWrapper,
    loginscreenCreateAccountText,
    loginscreenCreateAccountLinkText,
    loginscreenLoginContainer,
    loginTitle1
} = customstyles;
const {white, turquoise} = colors;
const { base_url } = environment;
var phone;


export default class OTPScreen extends Component {
    constructor() {
        super();

        this.onFocus = this
            .onFocus
            .bind(this);
        this.onSubmitButtonOtp = this
            .onSubmitButtonOtp
            .bind(this);
        this.onChangeText = this
            .onChangeText
            .bind(this);
        this.onBlur = this
            .onBlur
            .bind(this);
        this.onAccessoryPress = this
            .onAccessoryPress
            .bind(this);
        this.OtpRef = this
            .updateRef
            .bind(this, 'Otp');
        this.renderOtpAccessory = this
            .renderOtpAccessory
            .bind(this);

        this.state = {
            Otp: '',
        };
    }

    
    onAccessoryPress() {
        this.setState(({secureTextEntry}) => ({
            secureTextEntry: !secureTextEntry
        }));
    }


    onSubmitOtp() {
        this
            .Otp
            .focus();
    }
    
    onBlur() {
        let errors = {};

        ['Otp'].forEach((name) => {
            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'Otp' && value.length < 6) {
                    errors[name] = 'Too short';
                }
                
            }
        });

        this.setState({errors});
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
        ['Otp'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    renderOtpAccessory() {
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

    onSubmitButtonOtp(phone) {
        
        let errors = {};
        this.setState({loading_blur: true});

        ['Otp'].forEach((name) => {
            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if ('Otp' === name && value.length < 4) {
                    errors[name] = 'Too short';
                }
               
            }
        });

        if (this.isEmptyObject(errors)) {

            setTimeout(() => {
                this.setState({loading_blur: false});

            }, 3000)
        } else {
            this.setState({loading_blur: false});
        }
        if (errors === null || errors === 'null' || errors === 'undefined' || !errors) {
            console.log("Failure");
      
          }
        this.setState({errors});
                
        return fetch(base_url + '/user/phoneverification', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({otp:this.state.Otp,phone:phone})
        }).then((response) => response.json()).then((responseJson) => {
           
        var message = responseJson.message;
        if (message === 'registration successful'||message === 'please verify emailid too') {
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
          .navigate('LoginPage');
        }
        else if(message === 'Please enter a valid otp') {
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

    isEmptyObject(object) {
        return (Object.getOwnPropertyNames(object).length === 0);
    }

    static navigationOptions = {
        header: null
    }

    render() {
        var {params} = this.props.navigation.state;
        phone = params.phone

        let {
            errors = {},
            secureTextEntry,
            ...data
        } = this.state;
      
        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
            <View style={loginscreenLogoContainer}>
                    <Image
                        style={loginscreenLogo}
                        source={require('../../../assets/images/logo.png')}/>

                </View>
                <Text style={loginTitle1}>Sit back & Relax while we verify your mobile number{'\n'}{'\n'}
                    (Enter the OTP below in case if we fail to {'\n'}detect the SMS automatically)</Text>
                <View style={loginscreenInputContainer}>
                   
                    <TextField
                        ref={this.OtpRef}
                        value={data.Otp}
                        keyboardType='numeric'
                        secureTextEntry={secureTextEntry}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitOtp}
                        returnKeyType='next'
                        label="Enter OTP"
                        error={errors.Otp}
                        renderAccessory={this.renderOtpAccessory}
                        tintColor={white}
                        textColor={white}
                        onBlur={this.onBlur}/>

                    <View style={loginscreenLoginContainer}>
                        <RaisedTextButton
                            onPress={()=>this.onSubmitButtonOtp(phone)}
                            title="Submit"
                            color={turquoise}
                            titleColor={white}/>
                    </View>

                </View>
              
                {this.state.loading_blur && <View style={commonLoading}>
                    <ActivityIndicator size='large'/>
                </View>
}
            </KeyboardAvoidingView>
        );
    }
}