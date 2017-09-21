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
    loginscreenLoginContainer,
    SavedPoliciesContainer
} = customstyles;
const {white, turquoise, red} = colors;

export default class SavedPoliciesScreen extends Component {
    constructor() {
        super();

    }

    static navigationOptions = {
        header: null
    }
    render() {
        var {params} = this.props.navigation.state;
        var token = params.token

        var policyList = params.policyList

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>

                <ScrollView>
                    <View style={loginscreenInputContainer}>
                       
                        {policyList.map((item, index) => (
                            <View key={item._id} style={SavedPoliciesContainer}>
                                <Text>Consignment Weight: {item.consignmentWeight}</Text>
                                <Text>Consignment Value: {item.consignmentValue}</Text>
                                <Text>Mode of Transport: {item.modeofTransport}</Text>
                                <Text>Packing Mode: {item.packingMode}</Text>
                                <Text>Consignment Type: {item.consignmentType}</Text>
                                <Text>Contract Type: {item.contractType}</Text>
                                <Text>Policy Type: {item.policyType}</Text>
                            </View>
                        ))
}

                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        );
    }
}

