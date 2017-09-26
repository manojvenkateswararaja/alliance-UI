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
    loginscreenLoginContainer,
    SavedPoliciesContainer
} = customstyles;
const {white, turquoise, red} = colors;
var consignmentWeight;
var consignmentValue;
var modeofTransport; 
var packingMode; 
var consignmentType;
var contractType;
var policyType;
var invoiceNo;
var policyissuedate;
var policyenddate;
var voyagestartdate;
var voyageenddate;
var _id;

export default class SavedPoliciesScreen extends Component {
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
        consignmentWeight = item.consignmentWeight;
        _id=item._id;
        consignmentValue = item.consignmentValue;
        modeofTransport = item.modeofTransport;
        packingMode =item.packingMode;
        consignmentType=item.consignmentType;
        contractType=item.contractType;
        policyType=item.policyType;
        invoiceNo=item.invoiceNo;
        policyissuedate=item.policyIssueDate;
        policyenddate=item.policyEndDate;
        voyagestartdate=item.voyageStartDate;
        voyageenddate=item.voyageEndDate;
      }
    
    render() {
        var {params} = this.props.navigation.state;
        var token = params.token;
        var userType = params.userType;
        
        var policyHolderName = params.policyHolderName;
        
        var email = params.email;
        var policyList = params.policyList;
       

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>

                <ScrollView>
                    <View style={loginscreenInputContainer}>
                       <Text>Saved Policies</Text>
                        {policyList.map((item, index) => (
                            <View key={item._id} style={SavedPoliciesContainer}>
                            <TouchableOpacity onPress={() => this.getItem(item)}>
                                <Text>Consignment Weight: {item.consignmentWeight}</Text>
                                <Text>Consignment Value: {item.consignmentValue}</Text>
                                <Text>Mode of Transport: {item.modeofTransport}</Text>
                                <Text>Packing Mode: {item.packingMode}</Text>
                                <Text>Consignment Type: {item.consignmentType}</Text>
                                <Text>Contract Type: {item.contractType}</Text>
                                <Text>Policy Type: {item.policyType}</Text>
                                <Text>Invoice No : {item.invoiceNo}</Text>
                                <Text>Policy Issue Date: {item.policyIssueDate}</Text>
                                <Text>Policy End Date: {item.policyEndDate}</Text>
                                <Text>Voyage Start Date: {item.voyageStartDate}</Text>
                                <Text>Voyage End Date: {item.voyageEndDate}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
}
                    </View>
                </ScrollView>
                <MaterialDialog
          visible={this.state.basicNoTitleVisible}
          okLabel="Yes"
          onOk={() => {
          this.setState({basicNoTitleVisible: false});
          
            this
              .props
              .navigation
              .navigate('NewPoliciesPage', {
                token: token,
                _id:_id,
                status:"update",
                userType: userType,
                policyHolderName: policyHolderName,
                email: email,
                consignmentWeight:consignmentWeight,
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
          
        }}
          cancelLabel="No"
          onCancel={() => {
          this.setState({basicNoTitleVisible: false});
        }}>
          <Text>
            Are you sure you want to proceed to do the changes..
          </Text>
        </MaterialDialog>

            </KeyboardAvoidingView>
        );
    }
}

