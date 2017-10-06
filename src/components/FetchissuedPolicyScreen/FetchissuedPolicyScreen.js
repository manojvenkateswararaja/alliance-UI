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
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-root-toast';

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
var userType;

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
        userType = params.userType;

        return fetch(base_url + '/fetchissuedpolicy', {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((response) => response.json()).then((responseJson) => {

            issuedPolicies = responseJson.issuedPolicies;
            console.log("isup"+issuedPolicies)
            if( !issuedPolicies ) {
                 var message = 'You can claim by selecting any policy any time';
             let toast = Toast.show(message, {
              duration: Toast.durations.LONG,
               position: Toast.positions.CENTER
              }, 1000);
          setTimeout(function () {
                Toast.hide(toast);
             }, 10000);
             }
           

            this.setState({loading_blur: false});
            this.setState({showComponent: true});
        }).catch((error) => {
            console.error(error);
        });

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
        
        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
              <ScrollView>
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
                    <Text>Fetch Issued Policy</Text>
                        
                {this.state.showComponent && <View style={loginscreenContainer}>

                    {issuedPolicies.map((item, index) => (
                        <View key={item.policyNumber} style={FetchpolicyContainer}>
                        <TouchableOpacity onPress={() => this.getItem(item)}>
                            <Text>Policy Name: {item.policyName}</Text>
                            <Text>Issued Date: {item.issuedDate}</Text>
                            <Text>Premium Amount: Rs. {item.premiumAmount}</Text>
                            <Text>Issued Amount: Rs. {item.issuedAmount}</Text>
                            <Text>Policy Holder Name:{item.policyHolderName}</Text>
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
            .navigate('InsuredDashboardPage',{policyNumber:policyNumber,token:token,userType:userType,title:'',damagedetails:'',claimno:'',totaldamagevalue:'',totalclaimvalue:'',publicadjusterid:'',assesseddamagevalue:'',assessedclaimvalue:''});
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

