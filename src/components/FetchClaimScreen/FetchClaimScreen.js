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
  PolicyQuotescontainer
} = customstyles;
const {white, turquoise, red} = colors;
var claimno,
  title,
  damagedetails;

export default class FetchClaimScreen extends Component {
  constructor() {
    super();

    this.state = {
      basicNoTitleVisible: false
    }
  }

  static navigationOptions = {
    header: null
  }
  getItem = (item) => {
    this.setState({basicNoTitleVisible: true});
    claimno = item.claimno;
    title = item.title;
    damagedetails = item.damagedetails;

  }

  render() {

    var {params} = this.props.navigation.state;
    var token = params.token;
    var userClaims = params.userClaims
    

    return (
      <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>

        <View style={loginscreenInputContainer}>
        <Text>My Claims</Text>
          {policyList.map((item, index) => (
            <View key={item.policynumber} style={PolicyQuotescontainer}>
              <TouchableOpacity onPress={() => this.getItem(item)}>
                <Text>Policy Number: {item.policynumber}</Text>
                <Text>Claim No: {item.claimno}</Text>
                <Text>Title: {item.title}</Text>
                <Text>Status: {item.status}</Text>
              </TouchableOpacity>
            </View>
          ))
}

        </View>

       
      </KeyboardAvoidingView>
    );
  }
}

