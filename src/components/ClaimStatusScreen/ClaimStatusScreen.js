import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
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
  PolicyQuotescontainer,
  commonLoading
} = customstyles;
const {white, turquoise, red} = colors;
const { base_url } = environment;

var userType,token,statuscount,statuscount1;
 

export default class ClaimStatusScreen extends Component {
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

componentWillMount() {
        this.setState({loading_blur: true});
        this.setState({showComponent: false});
        this.setState({showComponent1: false});
      
        var {params} = this.props.navigation.state;
        token = params.token;
        userType = params.userType;
             
      if(userType === 'CNF Agents' || userType === 'Direct Clients'){
        return fetch(base_url + '/claim/UserClaims', {
            method: 'GET',
            headers: {
      
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((response) => response.json()).then((responseJson) => {
      
          statuscount = responseJson.statuscount;
      
            this.setState({loading_blur: false});
            if(statuscount !== undefined){
            this.setState({showComponent: true});
            }
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
      
        statuscount = responseJson.statuscount;
      
          this.setState({loading_blur: false});
          if(statuscount !== undefined){
            this.setState({showComponent: true});
            }
          
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
      
        statuscount = responseJson.statuscount;
     
           this.setState({loading_blur: false});
           if(statuscount !== undefined){
            this.setState({showComponent: true});
            }
          
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
      
        statuscount = responseJson.statuscount;
        statuscount1 = responseJson.statuscount1;
       
          this.setState({loading_blur: false});
          if(statuscount !== undefined){
            this.setState({showComponent: true});
            }
          if(statuscount1 === undefined){
            this.setState({showComponent1:false});
          }
         else if(statuscount1[0].statusname === 'Validated'){
            this.setState({showComponent1: true});
         }
      }).catch((error) => {
          console.error(error);
      });
      }
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
          <Text>Claims Status</Text>
          {this.state.showComponent && <View style={loginscreenContainer}>
            {statuscount.map((item, index) => (
              <View key={item.statusname} style={PolicyQuotescontainer}>
                  <Text>{item.statusname}:{item.statuscount}</Text>
              </View>
            ))
}


</View>
}

{this.state.showComponent1 && <View style={loginscreenContainer}>
{statuscount1.map((item, index) => (
              <View key={item.statusname} style={PolicyQuotescontainer}>
                  <Text>{item.statusname}:{item.statuscount}</Text>
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