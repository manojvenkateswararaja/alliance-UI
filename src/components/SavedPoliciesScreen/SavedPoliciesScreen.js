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
    loginscreenLoginContainer
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
                        <Text>Saved Policy
                        </Text>

                        {policyList.map((item, index) => (
                            <View key={item._id} style={styles.item}>
                                <Text>ConsignmentWeight: {item.consignmentWeight}</Text>
                                <Text>ConsignmentValue: {item.consignmentValue}</Text>
                                <Text>ModeofTransport: {item.modeofTransport}</Text>
                                <Text>PackingMode: {item.packingMode}</Text>
                                <Text>ConsignmentType: {item.consignmentType}</Text>
                                <Text>ContractType: {item.contractType}</Text>
                                <Text>PolicyType: {item.policyType}</Text>
                            </View>
                        ))
}

                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    item: {
        justifyContent: 'space-between',
        padding: 10,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
})
