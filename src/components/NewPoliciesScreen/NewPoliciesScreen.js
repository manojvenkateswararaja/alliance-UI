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

export default class NewPoliciesScreen extends Component {
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
      secureTextEntry: true,
      isChecked: false,
      selectedvalue: '',
      loading_blur: false

    };

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
  goToPolicyQoutesScreen(token, userType, policyHolderName, email, params) {
    console.log("Params: " + JSON.stringify(params));
    var consignmentWeight = this.state.ConsignmentWeight;
    var consignmentValue = this.state.ConsignmentValue;
    var modeofTransport = this.state.selectedvalue;
    var packingMode = this.state.PackingMode;
    var consignmentType = this.state.ConsignmentType;
    var contractType = this.state.contracttype;
    var policyType = this.state.policytype;
    var invoiceNo = this.state.InvoiceNo;
    var policyissuedate = this.state.PolicyissueDate;
    var policyenddate = this.state.PolicyendDate;
    var voyagestartdate = this.state.VoyagestartDate;
    var voyageenddate = this.state.VoyageendDate;

    return fetch(base_url + '/fetchPolicyQuotes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify({
        consignmentWeight: params.consignmentWeight.toString(),
        consignmentValue: params.consignmentValue.toString(),
        modeofTransport: params.modeofTransport.toString(),
        packingMode: params.packingMode.toString(),
        consignmentType: params.consignmentType.toString(),
        contractType: params.contractType.toString(),
        policyType: params.policyType.toString(),
        invoiceNo: params.invoiceNo.toString(),
        policyissuedate: params.policyissuedate.toString(),
        policyenddate: params.policyenddate.toString(),
        voyagestartdate: params.voyagestartdate.toString(),
        voyageenddate: params.voyageenddate.toString()

      })
    }).then((response) => response.json()).then((responseJson) => {

      policyList = responseJson.policyList

      this
        .props
        .navigation
        .navigate('PolicyQuotesPage', {
          token: token,
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
  onSubmitPolicyQuotes(token, userType, policyHolderName, email, params) {

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
      console.log("Success");
      this.goToPolicyQoutesScreen(token, userType, policyHolderName, email, params)
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
  render() {
   
    var {params} = this.props.navigation.state;
    
    var token = params.token

    var userType = params.userType;

    var policyHolderName = params.policyHolderName;

    var email = params.email;
    console.log("params.consignmentWeight"+params.consignmentWeight)

    let {
      errors = {},
      secureTextEntry
      
    } = this.state;
    let {
      ConsignmentWeight = 'ConsignmentWeight'
    } = params.consignmentWeight;
    let {
      ConsignmentType = 'ConsignmentType'
    } = params.consignmentType;
    let {
      ConsignmentValue = 'ConsignmentValue'
    } = params.consignmentValue;
    let {
      policytype = 'policytype'
    } = params.policyType;
    let {
      contracttype = 'contracttype'
    } = params.contractType;
    let {
      PackingMode = 'PackingMode'
    } = params.packingMode;
    let {
      InvoiceNo = 'InvoiceNo'
    } = params.invoiceNo;
    let {
      PolicyissueDate = 'PolicyissueDate'
    } = params.policyissuedate;
    let {
      PolicyendDate = 'PolicyendDate'
    } = params.policyenddate;

    let {
      VoyagestartDate = 'VoyagestartDate'
    } = params.voyagestartdate;
    let {
      VoyageendDate = 'VoyageendDate'
    } = params.voyageenddate;

    return (
      <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
        <ScrollView>
          <View style={loginscreenInputContainer}>

            <TextField
              ref={this.ConsignmentWeightRef}
              value={(params.consignmentWeight).toString()}
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
              value={(params.consignmentValue).toString()}
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
                value: 'Roadways'
              }, {
                label: "Airways",
                value: 'Airways'
              }, {
                label: "Railways",
                value: 'Railways'
              }, {
                label: "Seaways",
                value: 'Seaways'
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
              value={params.consignmentType}
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
              value={params.packingMode}
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
              value={(params.invoiceNo).toString()}
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
                date={(params.policyissuedate).toString()}
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
                date={(params.policyenddate).toString()}
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
                date={(params.voyagestartdate).toString()}
                mode="date"
                placeholder="DD/MM/YYYY"
                format="DD-MM-YYYY"
                style={containerDate}
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(VoyagestartDate) => {da
                this.setState({VoyagestartDate: VoyagestartDate})
              }}/>
            </View>

            <Text>
              Voyage End Date{'\n'}</Text>
            <View>
              <DatePicker
                date={(params.voyageenddate).toString()}
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
                onPress={() => this.onSubmitPolicyQuotes(token, userType, policyHolderName, email, params)}
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
