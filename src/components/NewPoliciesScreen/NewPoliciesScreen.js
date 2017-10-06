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
import {Dropdown} from 'react-native-material-dropdown';
import CheckboxGroup from 'react-native-checkbox-group';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import environment from '../../utils/environment';
import Icon from 'react-native-vector-icons/Ionicons';


const {loginscreenLogoContainer, loginscreenLogo, loginTitle, container1,containerDate} = customstyles;
const {login_welcome,policytypeData,contracttypeData} = customtext;
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
var railways = false;
var roadways = false;
var seaways = false;
var airways = false;

export default class NewPoliciesScreen extends Component {
  componentWillMount() {
    railways = false;
    roadways = false;
    seaways = false;
    airways = false;
    var {params} = this.props.navigation.state;
    
    
     if (params.status==="update") {
       console.log(params.policyissuedate)
      
      this.state = {
        ConsignmentWeight: params.consignmentWeight.toString(),
        ConsignmentValue: params.consignmentValue.toString(),
        ConsignmentType: params.consignmentType.toString(),
        policytype: params.policyType.toString(),
        contracttype: params.contractType.toString(),
        PackingMode: params.packingMode.toString(),
        InvoiceNo: params.invoiceNo.toString(),
        PolicyissueDate: params.policyissuedate.toString(),
        PolicyendDate: params.policyenddate.toString(),
        VoyagestartDate: params.voyagestartdate.toString(),
        VoyageendDate: params.voyageenddate.toString(),
        status : params.status,
        _id:params._id,
        secureTextEntry: true,
        isChecked: false,
        selectedvalue: params.modeofTransport.toString(),
        loading_blur: false
      };

      let modeOfTransport = params.modeofTransport;
      let splitTransport = [];
      splitTransport = modeOfTransport.split(",");
      for (let counter = 0; counter < splitTransport.length; counter++) {
        if (splitTransport[counter] === "Railways") {
          railways = true;
        } else if (splitTransport[counter] === "Roadways") {
          roadways = true;
        } else if (splitTransport[counter] === "Seaways") {
          seaways = true;
        } else if (splitTransport[counter] === "Airways") {
          airways = true;
        }
      }
    } else {
      var statusnew = "new"
     
      this.state = {
        ConsignmentWeight: '',
        ConsignmentValue: '',
        ConsignmentType: '',
        policytype: '',
        contracttype: '',
        PackingMode: '',
        InvoiceNo: '',
        PolicyissueDate: '',
        PolicyendDate: '',
        VoyagestartDate: '',
        VoyageendDate: '',
        _id:'',
        status:statusnew,
        secureTextEntry: true,
        isChecked: false,
        selectedvalue: '',
        loading_blur: false
      }
      railways = false;
      roadways = false;
      seaways = false;
      airways = false;
    }
  }
  
  constructor() {
    super();

    this.onFocus = this
      .onFocus
      .bind(this);
    this.onChangeText = this
      .onChangeText
      .bind(this);

    this.onBlur = this
      .onBlur
      .bind(this);
    this.onAccessoryPress = this
      .onAccessoryPress
      .bind(this);
    this.onSubmitPolicyQuotes = this
      .onSubmitPolicyQuotes
      .bind(this);

    this.policytypeRef = this
      .updateRef
      .bind(this, 'policytype');
    this.contracttypeRef = this
      .updateRef
      .bind(this, 'contracttype');
    this.ConsignmentWeightRef = this
      .updateRef
      .bind(this, 'ConsignmentWeight');
    this.ConsignmentValueRef = this
      .updateRef
      .bind(this, 'ConsignmentValue');
    this.ConsignmentTypeRef = this
      .updateRef
      .bind(this, 'ConsignmentType');
    this.PackingModeRef = this
      .updateRef
      .bind(this, 'PackingMode');
    this.InvoiceNoRef = this
      .updateRef
      .bind(this, 'InvoiceNo');
    this.PolicyissueDateRef = this
      .updateRef
      .bind(this, 'PolicyissueDate');
    this.PolicyendDateRef = this
      .updateRef
      .bind(this, 'PolicyendDate');
    this.VoyagestartDateRef = this
      .updateRef
      .bind(this, 'VoyagestartDate');
    this.VoyageendDateRef = this
      .updateRef
      .bind(this, 'VoyageendDate');
    this.onChangeText = this
      .onChangeText
      .bind(this);
    this.onDropdownpolicytype = this
      .onDropdownpolicytype
      .bind(this);
    this.onDropdowncontracttype = this
      .onDropdowncontracttype
      .bind(this);
    this.onCheckbox = this
      .onCheckbox
      .bind(this);
    this.goToPolicyQoutesScreen = this
      .goToPolicyQoutesScreen
      .bind(this);

    this.renderPasswordAccessory = this
      .renderPasswordAccessory
      .bind(this);
    

  }
  validateEmail(value) {
    let regex = /\w[-._\w]*@[-._\w]*\w\.\w{2,5}/;
    if (regex.test(value) === true) {
      return true;
    } else {
      return false;
    }
  }
  onAccessoryPress() {
    this.setState(({secureTextEntry}) => ({
      secureTextEntry: !secureTextEntry
    }));
  }
  onSubmitConsignmentWeight() {
    this
      .ConsignmentWeight
      .focus();
  }
  onSubmitConsignmentValue() {
    this
      .ConsignmentValue
      .focus();
  }
  onSubmitConsignmentType() {
    this
      .ConsignmentType
      .focus();
  }
  onSubmitPackingMode() {
    this
      .PackingMode
      .focus();
  }
  onSubmitInvoiceNo() {
    this
      .InvoiceNo
      .focus();
  }

  onBlur() {
    let errors = {};

    ['ConsignmentWeight', 'ConsignmentValue', 'ConsignmentType', 'PackingMode', 'InvoiceNo'].forEach((name) => {
      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else {
        if (name === 'ConsignmentWeight' && value.length < 2) {
          errors[name] = 'Invalid Consignment Weight';
        }
        if (name === 'ConsignmentValue' && value.length < 2) {
          errors[name] = 'Invalid Consignment Value';
        }
        if (name === 'ConsignmentType' && value.length < 2) {
          errors[name] = 'Invalid Consignment Type';
        }
        if (name === 'PackingMode' && value.length < 2) {
          errors[name] = 'Invalid Packing Mode';
        }
        if (name === 'InvoiceNo' && value.length < 2) {
          errors[name] = 'Invalid Invoice Number';
        }

      }
    });

    this.setState({errors});
  }
  onFocus() {
    let {
      errors = {}
    } = this.state;
    for (let name in errors) {
      let ref = this[name];
      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({errors});
  }

  onChangeText(text) {
    ['ConsignmentWeight', 'ConsignmentValue', 'ConsignmentType', 'PackingMode', 'InvoiceNo'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
      if (ref.isFocused()) {
        this.setState({[name]: text});
      }
    });
  }

  onDropdownpolicytype(policytype) {

    this.setState({policytype: policytype});
  }
  onDropdowncontracttype(contracttype) {

    this.setState({contracttype: contracttype});
  }
  onCheckbox(value) {

    this.setState({selectedvalue: value});
  }
  goToPolicyQoutesScreen(token, userType, policyHolderName, email) {
    var consignmentWeight = this.state.ConsignmentWeight.toString();
    var consignmentValue = this.state.ConsignmentValue.toString();
    var modeofTransport = this.state.selectedvalue.toString();
    var packingMode = this.state.PackingMode.toString();
    var consignmentType = this.state.ConsignmentType.toString();
    var contractType = this.state.contracttype.toString();
    var policyType = this.state.policytype.toString();
    var invoiceNo = this.state.InvoiceNo.toString();
    var policyissuedate = this.state.PolicyissueDate.toString();
    var policyenddate = this.state.PolicyendDate.toString();
    var voyagestartdate = this.state.VoyagestartDate.toString();
    var voyageenddate = this.state.VoyageendDate.toString();
    var status = this.state.status
    
  
    return fetch(base_url + '/fetchPolicyQuotes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      
      body: JSON.stringify({
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
        status:status,
        _id:this.state._id
      })
    }).then((response) => response.json()).then((responseJson) => {
      _id = responseJson._id;
      policyList = responseJson.policyList

      this
        .props
        .navigation
        .navigate('PolicyQuotesPage', {
          token: token,
          _id:_id,
          userType: userType,
          policyHolderName: policyHolderName,
          email: email,
          policyList: policyList,
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
          voyageenddate: voyageenddate
   

        });

    }).catch((error) => {
      console.error(error);
    });

  }
  onSubmitPolicyQuotes(token, userType, policyHolderName, email) {
    var policyList;

    let errors = new Object;
    this.setState({loading_blur: true});
    ['ConsignmentWeight', 'ConsignmentValue', 'ConsignmentType', 'PackingMode', 'InvoiceNo'].forEach((name) => {

      let value = this[name].value();

      if (!value) {
        errors[name] = 'Should not be empty';
      } else {
        if (name === 'ConsignmentWeight' && value.length < 2) {
          errors[name] = 'Invalid Consignment Weight';
        }
        if (name === 'ConsignmentValue' && value.length < 2) {
          errors[name] = 'Invalid Consignment Value';
        }
        if (name === 'ConsignmentType' && value.length < 2) {
          errors[name] = 'Invalid Consignment Type';
        }
        if (name === 'PackingMode' && value.length < 2) {
          errors[name] = 'Invalid Packing Mode';
        }
        if (name === 'InvoiceNo' && value.length < 2) {
          errors[name] = 'Invalid Invoice Number';
        }

      }

    });
    if (this.isEmptyObject(errors)) {
      
                  setTimeout(() => {
                      this.setState({loading_blur: false});
      
                  }, 3000)
              } else {
                  this.setState({loading_blur: false});
              }
    if (errors === null || errors === 'null' || errors === 'undefined' || !errors) {
      console.log("failure");

    } else {
     
      this.goToPolicyQoutesScreen(token, userType, policyHolderName, email)
    }
 
    this.setState({errors});
  }
  updateRef(name, ref) {
    this[name] = ref;
  }
  renderPasswordAccessory() {
    let {secureTextEntry} = this.state;
    let name = secureTextEntry
      ? 'visibility'
      : 'visibility-off';
    return (<MaterialIcon
      size={24}
      name={name}
      color={TextField.defaultProps.baseColor}
      onPress={this.onAccessoryPress}
      suppressHighlighting/>);
  }
  isEmptyObject(object) {
    return (Object.getOwnPropertyNames(object).length === 0);
}
  static navigationOptions = {
    header: null
  }
  onSubmitUser(){
    this.setState({Logout: true});
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
  render() {
   
    var {params} = this.props.navigation.state;
    
    var token = params.token

    var userType = params.userType;

    var policyHolderName = params.policyHolderName;

    var email = params.email; 
    

    let {
      errors = {},
      secureTextEntry,
      ...data
    } = this.state;
    let {
      ConsignmentWeight = 'ConsignmentWeight'
    } = this.state;
    let {
      ConsignmentType = 'ConsignmentType'
    } = this.state;
    let {
      ConsignmentValue = 'ConsignmentValue'
    } = this.state;
    let {
      policytype = 'policytype'
    } = this.state;
    let {
      contracttype = 'contracttype'
    } = this.state;
    let {
      PackingMode = 'PackingMode'
    } = this.state;
    let {
      InvoiceNo = 'InvoiceNo'
    } = this.state;
    let {
      PolicyissueDate = 'PolicyissueDate'
    } = this.state;
    let {
      PolicyendDate = 'PolicyendDate'
    } = this.state;

    let {
      VoyagestartDate = 'VoyagestartDate'
    } = this.state;
    let {
      VoyageendDate = 'VoyageendDate'
    } = this.state;

   
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
                              
            <TextField
              ref={this.ConsignmentWeightRef}
              value={data.ConsignmentWeight}
              keyboardType='numeric'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitConsignmentWeight}
              returnKeyType='next'
              label="Consignment Weight(In kgs)"
              error={errors.ConsignmentWeight}
              tintColor={white}
              textColor={white}
              onBlur={this.onBlur}/>
            <TextField
              ref={this.ConsignmentValueRef}
              value={data.ConsignmentValue}
              keyboardType='numeric'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitConsignmentValue}
              returnKeyType='next'
              label="Consignment Value(In kgs)"
              error={errors.ConsignmentValue}
              tintColor={white}
              textColor={white}
              onBlur={this.onBlur}/>

            <Dropdown
              ref={this.policytypeRef}
              value={params.policyType}
              data={policytypeData}
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onDropdownpolicytype}
              returnKeyType='default'
              label="Policy Type"
              tintColor={white}
              textColor={red}
              style={container1}
              dropdownPosition='4'/>

            <Dropdown
              ref={this.contracttypeRef}
              value={params.contractType}
              data={contracttypeData}
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onDropdowncontracttype}
              returnKeyType='next'
              label="Contract Type"
              tintColor={white}
              textColor={red}
              style={container1}/>
            <Text>Mode Of Transport</Text>
            <CheckboxGroup
              callback={(selected) => {
              this.onCheckbox(selected)
            }}
              iconColor={"#00a2dd"}
              iconSize={30}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={[
              {
                label: "Roadways",
                value: 'Roadways',
                selected: roadways
              }, {
                label: "Airways",
                value: 'Airways',
                selected: airways
              }, {
                label: "Railways",
                value: 'Railways',
                selected: railways
              }, {
                label: "Seaways",
                value: 'Seaways',
                selected: seaways
              }
            ]}
              labelStyle={{
              color: '#333'
            }}
              rowStyle={{
              flexDirection: 'row'
            }}
              rowDirection={"column"}/>

            <TextField
              ref={this.ConsignmentTypeRef}
              value={data.ConsignmentType}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitConsignmentType}
              returnKeyType='next'
              label="Consignment Type"
              error={errors.ConsignmentType}
              tintColor={white}
              textColor={white}
              onBlur={this.onBlur}/>
            <TextField
              ref={this.PackingModeRef}
              value={data.PackingMode}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitPackingMode}
              returnKeyType='next'
              label="Packing Mode"
              error={errors.PackingMode}
              tintColor={white}
              textColor={white}
              onBlur={this.onBlur}/>
            <TextField
              ref={this.InvoiceNoRef}
              value={data.InvoiceNo}
              keyboardType='numeric'
              autoCapitalize='none'
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitInvoiceNo}
              returnKeyType='next'
              label="Invoice Number"
              error={errors.InvoiceNo}
              tintColor={white}
              textColor={white}
              onBlur={this.onBlur}/>
              
            <Text>
              Policy Issue Date{'\n'}</Text>
            <View>
              <DatePicker
                date={data.PolicyissueDate}
                mode="date"
                placeholder="DD/MM/YYYY"
                format="DD-MM-YYYY"
                style={containerDate}
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(PolicyissueDate) => {
                this.setState({PolicyissueDate: PolicyissueDate})
              }}/>

            </View>

            <Text>
              Policy End Date{'\n'}</Text>
            <View>
              <DatePicker
                date={data.PolicyendDate}
                mode="date"
                placeholder="DD/MM/YYYY"
                format="DD-MM-YYYY"
                style={containerDate}
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(PolicyendDate) => {
                this.setState({PolicyendDate: PolicyendDate})
              }}/>
            </View>

            <Text>
              Voyage Start Date{'\n'}</Text>
            <View>            
              <DatePicker
                date={data.VoyagestartDate}
                mode="date"
                placeholder="DD/MM/YYYY"
                format="DD-MM-YYYY"
                style={containerDate}
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(VoyagestartDate) => {
                this.setState({VoyagestartDate: VoyagestartDate})
              }}/>
            </View>

            <Text>
              Voyage End Date{'\n'}</Text>
            <View>
              <DatePicker
                date={data.VoyageendDate}
                mode="date"
                placeholder="DD/MM/YYYY"
                format="DD-MM-YYYY"
                style={containerDate}
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(VoyageendDate) => {
                this.setState({VoyageendDate: VoyageendDate})
              }}/>
            </View>

            <View style={loginscreenLoginContainer}>
              <RaisedTextButton
                onPress={() => this.onSubmitPolicyQuotes(token, userType, policyHolderName, email)}
                title="Policy Quotes"
                color={turquoise}
                titleColor={white}/>
            </View>

          </View>
        </ScrollView>
        {this.state.loading_blur && <View style={commonLoading}>
                    <ActivityIndicator size='large'/>
                </View>
}
      </KeyboardAvoidingView>
    );
  }
}
