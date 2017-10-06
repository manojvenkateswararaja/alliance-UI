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
import Icon from 'react-native-vector-icons/Ionicons';

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
var policyName,
  premiumAmount,
  sumInsured;

export default class PolicyQuotesScreen extends Component {
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
    policyName = item.policyName;
    premiumAmount = item.premiumAmount;
    sumInsured = item.sumInsured;

  }
  onSubmitUser(){
    this.setState({Logout: true});
  }
  onSubmitDashboard(userType,token){
    
      if (userType === 'CNF Agents') {
          this
              .props
              .navigation
              .navigate('HomePageAgents',{userType:userType,token:token});
      }
      else if(userType === 'Direct Clients'){
          this
              .props
              .navigation
              .navigate('HomePageClients',{userType:userType,token:token})
      }
      else if(userType === 'Examiner'){
          this
              .props
              .navigation
              .navigate('HomePageExaminer',{userType:userType,token:token})
      }
      else if(userType === 'Claims Adjuster'){
          this
              .props
              .navigation
              .navigate('HomePageClaimAdjuster',{userType:userType,token:token})
      }
      else if(userType === 'Public Adjuster'){
          this
              .props
              .navigation
              .navigate('HomePagePublicAdjuster',{userType:userType,token:token});
      }
    }
  onSubmitLogout() {
    
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'LoginPage'})]
            })
    
            setTimeout(() => {
                this
                    .props
                    .navigation
                    .dispatch(resetAction)
            }, 1000)
        }
  render() {

    var {params} = this.props.navigation.state;
    var token = params.token;
    var _id = params._id;
    var userType = params.userType;
    var policyHolderName = params.policyHolderName;
    var email = params.email;
    var policyList = params.policyList
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
    

    return (
      <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>

        <View style={loginscreenInputContainer}>
        <TouchableOpacity
        activeOpacity={.5}
        onPress={() => this.onSubmitUser()}>
<Text style={{textAlign: 'right', color:'navy'}}>
            <Icon name="ios-person" size={40} color="#ffffff"/> 
        {userType}</Text>
        </TouchableOpacity>
        {this.state.Logout && 
          <TouchableOpacity
          activeOpacity={.5}>
          <Text style={{textAlign: 'right', fontSize:20, color:'navy',textDecorationLine:'underline'}}
          onPress={() => this.onSubmitLogout()}>Logout</Text>
          <Text style={{textAlign: 'right', fontSize:20, color:'navy',textDecorationLine:'underline'}}
          onPress={() => this.onSubmitDashboard(userType,token)}>Go To Dashboard</Text>
          </TouchableOpacity>
        }
        <Text>Policy Quotes</Text>
          {policyList.map((item, index) => (
            <View key={item.policyName} style={PolicyQuotescontainer}>
              <TouchableOpacity onPress={() => this.getItem(item)}>
                <Text>policy Name: {item.policyName}</Text>
                <Text>Premium Amount: Rs. {item.premiumAmount}</Text>
                <Text>SumInsured: Rs. {item.sumInsured}</Text>

              </TouchableOpacity>
            </View>
          ))
}

        </View>

        <MaterialDialog
          visible={this.state.basicNoTitleVisible}
          okLabel="Yes"
          onOk={() => {
          this.setState({basicNoTitleVisible: false});
          if (userType === "Direct Clients") {
            this
              .props
              .navigation
              .navigate('PaymentPage', {
                token: token,
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
              });
          } else if (userType === "CNF Agents") {
            this
              .props
              .navigation
              .navigate('ConsignmentDetailPage', {
                token: token,
                _id:_id,
                userType: userType,
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
        }}
          cancelLabel="No"
          onCancel={() => {
          this.setState({basicNoTitleVisible: false});
        }}>
          <Text>
            Are you sure you want to proceed with the payment..
          </Text>
        </MaterialDialog>
      </KeyboardAvoidingView>
    );
  }
}

