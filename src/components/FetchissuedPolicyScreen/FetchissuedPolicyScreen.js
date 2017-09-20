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
import environment from '../../utils/environment';

const {
    loginscreenLogoContainer,
    loginscreenLogo,
    loginTitle,
    container1,
    splashscreenLoading,
    splashscreenLoadingWrapper,
    commonLoading
} = customstyles;
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
const { base_url } = environment;

var token;
var issuedPolicies;

export default class FetchissuedPolicyPage extends Component {
    static navigationOptions = {
        header: null
    }

    constructor() {
        super();

    }

    componentWillMount() {
        this.setState({loading_blur: true});
        this.setState({showComponent: false});

        var {params} = this.props.navigation.state;
        token = params.token;

        return fetch(base_url + '/fetchissuedpolicy', {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((response) => response.json()).then((responseJson) => {

            issuedPolicies = responseJson.issuedPolicies;

            this.setState({loading_blur: false});
            this.setState({showComponent: true});
        }).catch((error) => {
            console.error(error);
        });

    }

    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>

                {this.state.showComponent && <View style={loginscreenContainer}>

                    {issuedPolicies.map((item, index) => (
                        <View key={item.policyName} style={styles.item}>

                            <Text>PolicyName: {item.policyName}</Text>
                            <Text>IssuedDate: {item.issuedDate}</Text>
                            <Text>PremiumAmount: Rs. {item.premiumAmount}</Text>
                            <Text>IssuedAmount: Rs. {item.issuedAmount}</Text>
                            <Text>PolicyHolderName:{item.policyHolderName}</Text>
                            <Text>PolicyNumber: {item.policyNumber}</Text>
                            <Text>AgentName: {item.agentName}</Text>

                        </View>
                    ))
}

                </View>
}

                {this.state.loading_blur && <View style={commonLoading}>
                    <ActivityIndicator size='large'/>
                </View>
}
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'space-between',
        padding: 10,
        margin: 2,
        borderColor: '#4CAF50',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
})