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
    SavedPoliciesContainer,
    commonLoading
} = customstyles;
const {white, turquoise, red} = colors;
const { base_url } = environment;
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
var token,userType,policyHolderName,email,policyList;

export default class SavedPoliciesScreen extends Component {
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
        
        policyHolderName = params.policyHolderName;
        
        email = params.email;
        return fetch(base_url + '/fetchSavePolicy', {
            method: 'GET',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
            }
    }).then((response) => response.json()).then((responseJson) => {

            policyList = responseJson.policylist;
            this.setState({loading_blur: false});
            this.setState({showComponent: true});

          

    }).catch((error) => {
            console.error(error);
    });
        
        

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
        
        
       

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>

                <ScrollView>
                <Text>Saved Policies</Text>
                {this.state.showComponent && <View style={loginscreenContainer}>
                        
                       
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
                }
                {this.state.loading_blur && <View style={commonLoading}>
                    <ActivityIndicator size='large'/>
                </View>
                }
                
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
        </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

