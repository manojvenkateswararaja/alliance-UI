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
import {MaterialDialog} from 'react-native-material-dialog';
import environment from '../../utils/environment';

const {loginscreenLogoContainer, loginscreenLogo, loginTitle, container1, PaymentImageLayout} = customstyles;
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
    loginscreenLoginContainer,
    commonLoading
} = customstyles;
const {white, turquoise, red} = colors;
const { base_url } = environment;

export default class PaymentPage extends Component {
    constructor() {
        super();
this.state={
    loading_blur: false
}
    }

    static navigationOptions = {
        header: null
    }
    onSubmitConsignmentDetails(token, userType, policyHolderName, email, consignmentWeight, consignmentValue, modeofTransport, packingMode, consignmentType, contractType, policyType, invoiceNo, policyissuedate, policyenddate, voyagestartdate, voyageenddate, policyName, premiumAmount, sumInsured) {
        var _id="59c0aad50532cd13b493f352"
        this.setState({loading_blur: true});
        return fetch(base_url + '/consignmentDetail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                _id:_id,
                userType: userType,
                policyHolderName: policyHolderName,
                email: email,
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

            })
        }).then((response) => response.json()).then((responseJson) => {

            var status = responseJson.status;
            if (status === "success") {
                this.setState({loading_blur: false});
                this
                    .props
                    .navigation
                    .navigate('FetchissuedPolicyPage', {token: token});

            }
        });
        if (this.isEmptyObject()) {
            
                        setTimeout(() => {
                            this.setState({loading_blur: false});
            
                        }, 3000)
                    } else {
                        this.setState({loading_blur: false});
                    }
                   
    }
    isEmptyObject(object) {
        return (Object.getOwnPropertyNames(object).length === 0);
    }

    render() {
        var {params} = this.props.navigation.state;
        var token = params.token;
        var userType = params.userType;
        var policyHolderName = params.policyHolderName;
        var email = params.email;
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

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>

                <View style={loginscreenInputContainer}>
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={() => this.onSubmitConsignmentDetails(token, userType, policyHolderName, email, consignmentWeight, consignmentValue, modeofTransport, packingMode, consignmentType, contractType, policyType, invoiceNo, policyissuedate, policyenddate, voyagestartdate, voyageenddate, policyName, premiumAmount, sumInsured)}>

                        <Image
                            style={PaymentImageLayout}
                            source={require('../../../assets/images/paymentgateway.png')}/>
                    </TouchableOpacity>

                </View>
                {this.state.loading_blur && <View style={commonLoading}>
                    <ActivityIndicator size='large'/>
                </View>
}
            </KeyboardAvoidingView>
        );
    }
}