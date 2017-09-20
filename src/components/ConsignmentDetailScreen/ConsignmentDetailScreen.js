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


const {loginscreenLogoContainer, loginscreenLogo, loginTitle, container1} = customstyles;
const {login_welcome} = customtext;
const {
    username_label,
    password_label,
    login_label,
    create_account_text,
    create_account_link,
    value_true
} = customtext;
const {
    loginscreenInputContainer,
    loginscreenContainer,
    loginscreenCreateAccountWrapper,
    loginscreenCreateAccountText,
    loginscreenCreateAccountLinkText,
    loginscreenLoginContainer
} = customstyles;
const {white, turquoise, red} = colors;


export default class RegisterScreen extends Component {
    constructor() {
        super();

        this.onFocus = this
            .onFocus
            .bind(this);
        this.onChangeText = this
            .onChangeText
            .bind(this);
        this.onSubmitConsigneeEmail = this
            .onSubmitConsigneeEmail
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

        this.ConsigneeNameRef = this
            .updateRef
            .bind(this, 'ConsigneeName');

        this.ConsigneePhoneRef = this
            .updateRef
            .bind(this, 'ConsigneePhone');
        this.ConsigneeEmailRef = this
            .updateRef
            .bind(this, 'ConsigneeEmail');

        this.renderPasswordAccessory = this
            .renderPasswordAccessory
            .bind(this);
        this.state = {
            ConsigneeName: '',
            ConsigneePhone: '',
            email: '',

            secureTextEntry: true
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
        this.setState(({secureTextEntry}) => ({
            secureTextEntry: !secureTextEntry
        }));
    }
    onSubmitConsigneeName() {
        this
            .ConsigneeName
            .focus();
    }

    onSubmitConsigneePhone() {
        this
            .ConsigneePhone
            .focus();
    }

    onSubmitConsigneeEmail() {
        this
            .ConsigneeEmail
            .focus();
    }

    onBlur() {
        let errors = {};

        ['ConsigneeName', 'ConsigneePhone', 'ConsigneeEmail'].forEach((name) => {

            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'ConsigneeName' && value.length < 2) {
                    errors[name] = 'Invalid Consignee Name';
                }

                if (name === 'ConsigneePhone' && value.length < 10) {
                    errors[name] = 'Incorrect Consignee Phone Number';
                }
                if (name === 'ConsigneeEmail' && !this.validateEmail(value)) {
                    errors[name] = 'Invalid Consignee Email ID';
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
        ['ConsigneeName', 'ConsigneePhone', 'ConsigneeEmail'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }

    onSubmitRegister(token, userType, consignmentWeight, consignmentValue, modeofTransport, packingMode, consignmentType, contractType, policyType, invoiceNo, policyissuedate, policyenddate, voyagestartdate, voyageenddate, policyName, premiumAmount, sumInsured) {

        let errors = new Object;

        let test = ['ConsigneeName', 'ConsigneePhone', 'ConsigneeEmail'];

        console.log("Test: " + test)
        test.forEach((name) => {

            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'ConsigneeName' && value.length < 2) {
                    errors[name] = 'Invalid Consignee Name';
                }

                if (name === 'ConsigneePhone' && value.length < 10) {
                    errors[name] = 'Incorrect Consignee Phone Number';
                }
                if (name === 'ConsigneeEmail' && !this.validateEmail(value)) {
                    errors[name] = 'Invalid Consignee Email ID';
                }

            }

        });

        if (errors === null || errors === 'null' || errors === 'undefined' || !errors) {
            console.log("Failure");

        } else {
            console.log("Success");

            this
                .props
                .navigation
                .navigate('PaymentPage', {
                    token: token,
                    userType: userType,
                    policyHolderName: this.state.ConsigneeName,
                    email: this.state.ConsigneeEmail,
                    consignmentWeight: consignmentWeight,
                    consignmentValue: consignmentValue,
                    modeofTransport: modeofTransport,
                    packingMode: packingMode,
                    consignmentType: consignmentType,
                    contractType: contractType,
                    policyType: policyType,
                    invoiceNo: invoiceNo,
                    policyissuedate: policyissuedate,
                    policyenddate: policyenddate,
                    voyagestartdate: voyagestartdate,
                    voyageenddate: voyageenddate,
                    policyName: policyName,
                    premiumAmount: premiumAmount,
                    sumInsured: sumInsured
                });

        }
        this.setState({errors});

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
    static navigationOptions = {
        header: null
    }
    render() {
        var {params} = this.props.navigation.state;
        var token = params.token;

        var userType = params.userType;

        var consignmentWeight = params.consignmentWeight;
        var consignmentValue = params.consignmentValue;
        var modeofTransport = params.modeofTransport;
        var packingMode = params.packingMode;
        var consignmentType = params.consignmentType;
        var contractType = params.contractType;
        var policyType = params.policyType;
        var invoiceNo = params.invoiceNo;
        var policyissuedate = params.policyissuedate;
        var policyenddate = params.policyenddate;
        var voyagestartdate = params.voyagestartdate;
        var voyageenddate = params.voyageenddate;
        var policyName = params.policyName;

        var premiumAmount = params.premiumAmount;

        var sumInsured = params.sumInsured;

        let {
            errors = {},
            secureTextEntry,
            ...data
        } = this.state;
        let {
            ConsigneeName = 'ConsigneeName'
        } = data;

        let {
            ConsigneePhone = 'ConsigneePhone'
        } = data;
        let {
            ConsigneeEmail = 'ConsigneeEmail'
        } = data;

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
                <ScrollView>
                    <View style={loginscreenInputContainer}>
                        <TextField
                            ref={this.ConsigneeNameRef}
                            value={data.ConsigneeName}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitConsigneeName}
                            returnKeyType='next'
                            label="Consignee Name"
                            error={errors.ConsigneeName}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur}/>

                        <TextField
                            ref={this.ConsigneePhoneRef}
                            value={data.ConsigneePhone}
                            keyboardType='phone-pad'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitConsigneePhone}
                            returnKeyType='next'
                            label="Consignee Phone No."
                            error={errors.ConsigneePhone}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur}/>

                        <TextField
                            ref={this.ConsigneeEmailRef}
                            value={data.ConsigneeEmail}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitConsigneeEmail}
                            returnKeyType='next'
                            label="Consignee Email"
                            error={errors.ConsigneeEmail}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur}/>

                        <View style={loginscreenLoginContainer}>
                            <RaisedTextButton
                                onPress={() => this.onSubmitRegister(token, userType, consignmentWeight, consignmentValue, modeofTransport, packingMode, consignmentType, contractType, policyType, invoiceNo, policyissuedate, policyenddate, voyagestartdate, voyageenddate, policyName, premiumAmount, sumInsured)}
                                title="Register"
                                color={turquoise}
                                titleColor={white}/>
                        </View>

                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
