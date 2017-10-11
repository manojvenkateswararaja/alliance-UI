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
  PolicyQuotescontainer,
  commonLoading
} = customstyles;
const {white, turquoise, red} = colors;
const { base_url } = environment;

var claimno,
  title,
  damagedetails,
  userClaims,userType,
  totaldamagevalue,
  totalclaimvalue,publicadjusterid,
  assesseddamagevalue,assessedclaimvalue,
  claimadjusternegotiation,publicadjusternegotiation,
  approvedclaim;
  
 var negotiationlist =[];
 

export default class FetchClaimScreen extends Component {
  constructor() {
    super();

   this.state = {
      basicNoTitleVisible: false,
      loading_blur: false
      
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
    policynumber=item.policynumber;
    totaldamagevalue=item.totaldamagevalue;
    totalclaimvalue=item.totalclaimvalue;
    publicadjusterid=item.publicadjusterid;
    assessedclaimvalue=item.assessedclaimvalue;
    assesseddamagevalue=item.assesseddamagevalue;
    negotiationlist =item.negotiationlist;
    approvedclaim=item.approvedclaim;
   

    this.props.navigation.navigate('InsuredDashboardPage',{token:token,userType:userType,policynumber:policynumber,title:title,damagedetails:damagedetails,claimno:claimno,totaldamagevalue:totaldamagevalue,totalclaimvalue:totalclaimvalue,publicadjusterid:publicadjusterid,assesseddamagevalue:assesseddamagevalue,assessedclaimvalue:assessedclaimvalue,negotiationlist:negotiationlist,claimadjusternegotiation:claimadjusternegotiation,publicadjusternegotiation:publicadjusternegotiation,approvedclaim:approvedclaim})
  }
 componentWillMount() {
  
  this.setState({showComponent: false});

  var {params} = this.props.navigation.state;
  token = params.token;
  userType = params.userType;
  console.log("usertype"+userType);
  claimadjusternegotiation = params.claimadjusternegotiation;
  publicadjusternegotiation =params.publicadjusternegotiation;
  approvedclaim = params.approvedclaim;
  console.log("in fcs"+approvedclaim)
if(userType === 'CNF Agents' || userType === 'Direct Clients'){
  return fetch(base_url + '/claim/UserClaims', {
      method: 'GET',
      headers: {

          'Content-Type': 'application/json',
          'x-access-token': token
      }
  }).then((response) => response.json()).then((responseJson) => {

    userClaims = responseJson.userClaims;

      this.setState({loading_blur: false});
      this.setState({showComponent: true});
  }).catch((error) => {
      console.error(error);
  });
} else if(userType === 'Examiner'){
  return fetch(base_url + '/claim/ExaminerClaims', {
    method: 'GET',
    headers: {

        'Content-Type': 'application/json',
        'x-access-token': token
    }
}).then((response) => response.json()).then((responseJson) => {

  userClaims = responseJson.userClaims;

    this.setState({loading_blur: false});
    this.setState({showComponent: true});
}).catch((error) => {
    console.error(error);
});
}
else if(userType === 'Claims Adjuster'){
 
  return fetch(base_url + '/claim/ClaimAdjusterClaims', {
    method: 'GET',
    headers: {

        'Content-Type': 'application/json',
        'x-access-token': token
    }
}).then((response) => response.json()).then((responseJson) => {

  userClaims = responseJson.userClaims;

     this.setState({loading_blur: false});
    this.setState({showComponent: true});
}).catch((error) => {
    console.error(error);
});

}
else if(userType === 'Public Adjuster'){
  return fetch(base_url + '/claim/PublicAdjusterClaims', {
    method: 'GET',
    headers: {

        'Content-Type': 'application/json',
        'x-access-token': token
    }
}).then((response) => response.json()).then((responseJson) => {

  userClaims = responseJson.userClaims;
console.log("userclaims"+JSON.stringify(userClaims));


    this.setState({loading_blur: false});
    this.setState({showComponent: true});
}).catch((error) => {
    console.error(error);
});
}
}

onSubmitUser(){
  this.setState({Logout: true});
}
onSubmitDashboard(userType,token){
  console.log("insubmitdadsusertype"+userType);
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
            <Text>My Claims</Text>
            {this.state.showComponent && <View style={loginscreenContainer}>
            {userClaims.map((item, index) => (
              <View key={item.claimno} style={PolicyQuotescontainer}>
                <TouchableOpacity onPress={() => this.getItem(item)}>
                  <Text>Policy Number: {item.policynumber}</Text>
                  <Text>Claim No: <Text style={{color: 'green'}}>{item.claimno}
                  </Text>
                  </Text>
                  <Text>Title: {item.title}</Text>
                  <Text> Status:<Text style={{color: 'green'}}>
                   {item.status}</Text></Text>
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
        </ScrollView>
        </KeyboardAvoidingView>
                  
    )
  }
}