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
import environment from '../../utils/environment';
import {MaterialDialog} from 'react-native-material-dialog';


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
    loginscreenLoginContainer,
    FetchpolicyContainer
} = customstyles;
const {white, turquoise, red} = colors;
const { base_url } = environment;

var token;
var issuedPolicies;
var policyNumber;
export default class FetchissuedPolicyPage extends Component {
    static navigationOptions = {
        header: null
    }
    getItem = (item) => {
        this.setState({basicNoTitleVisible: true});
        policyNumber = item.policyNumber;
      }
    constructor() {
        super();
        this.state = {
            basicNoTitleVisible: false
          }

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
              <ScrollView>
                    <View style={loginscreenInputContainer}>
                        <Text>Fetch Issued Policy</Text>
                        
                {this.state.showComponent && <View style={loginscreenContainer}>

                    {issuedPolicies.map((item, index) => (
                        <View key={item.policyNumber} style={FetchpolicyContainer}>
                        <TouchableOpacity onPress={() => this.getItem(item)}>
                            <Text>Policy Name: {item.policyName}</Text>
                            <Text>Issued Date: {item.issuedDate}</Text>
                            <Text>Premium Amount: Rs. {item.premiumAmount}</Text>
                            <Text>Issued Amount: Rs. {item.issuedAmount}</Text>
                            <Text>PolicyHolder Name:{item.policyHolderName}</Text>
                            <Text>Policy Number: {item.policyNumber}</Text>
                            <Text>Agent Name: {item.agentName}</Text>
                        </TouchableOpacity>
                        </View>
                    ))
}

                </View>
}

                {this.state.loading_blur && <View style={commonLoading}>
                    <ActivityIndicator size='large'/>
                </View>
                }
                </View>
                <MaterialDialog
          visible={this.state.basicNoTitleVisible}
          okLabel="Yes"
          onOk={() => {
          this.setState({basicNoTitleVisible: false});
          this
           .props
            .navigation
            .navigate('InsuredDashboardPage',{policyNumber:policyNumber,token:token});
        }}
          cancelLabel="No"
          onCancel={() => {
          this.setState({basicNoTitleVisible: false});
        }}>
          <Text>
            Are you sure you want to claim this policy!!
          </Text>
        </MaterialDialog>
         </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

