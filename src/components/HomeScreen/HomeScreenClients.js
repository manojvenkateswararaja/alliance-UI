import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import customtext from '../../utils/customtext';
import customstyles from '../../../assets/styles/customstyles';
import environment from '../../utils/environment';
import {NavigationActions} from 'react-navigation';

const {home_client_cnfAgents, home_client_directClients} = customtext;

const {
        scrollContainer,
        scrollViewContainer,
        scrollBox,
        scrollBoxText,
        scrollImage,
        homeImageLayout,
        homeScrollImageContainer,
        homeScrollImageLogo
} = customstyles;
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
var statusnew;


export default class HomeScreenClients extends Component {
        static navigationOptions = {
                header: null
        }

        constructor(props) {
                super(props);
                this.onSubmitNewPolicy = this
                        .onSubmitNewPolicy
                        .bind(this);
        }
       
        onSubmitNewPolicy(token, userType, policyHolderName, email) {

                this
                        .props
                        .navigation
                        .navigate('NewPoliciesPage', {
                                token: token,
                                userType: userType,
                                policyHolderName: policyHolderName,
                                email: email,
                                statusnew:"new",
                                consignmentWeight:'',
                                consignmentValue:'',
                                modeofTransport:'',
                                packingMode:'',
                                consignmentType:'',
                                contractType:'',
                                policyType:'',
                                invoiceNo:'',
                                policyissuedate:'',
                                policyenddate:'',
                                voyagestartdate:'',
                                voyageenddate:''
                        });
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
        
        onSubmitMyPolicy(token,userType) {

                this
                        .props
                        .navigation
                        .navigate('FetchissuedPolicyPage', {token: token,userType:userType});
        }
        onSubmitMyClaims(token,userType) {
                
                    this
                        .props
                        .navigation
                        .navigate('FetchClaimPage', {token: token,userType:userType});
                        }
        onSubmitSavedPolicy(token, userType, policyHolderName, email) {
                

                        this
                                .props
                                .navigation
                                .navigate('SavedPoliciesPage', {
                                        token: token,
                                        userType: userType,
                                        policyHolderName: policyHolderName,
                                        email: email
                                       
                                });

        
        }
        onSubmitClaimStatus(token,userType){
                this
                .props
                .navigation
                .navigate('ClaimStatusPage', {token:token,userType:userType});
            }
        render() {
                var {params} = this.props.navigation.state;
                var token = params.token

                var userType = params.userType;

                var policyHolderName = params.policyHolderName;

                var email = params.email;

                return (
                        <ScrollView style={scrollContainer}>
                                <View style={scrollViewContainer}>
                                        <View style={scrollImage}>
                                                <Image
                                                        style={homeImageLayout}
                                                        source={require('../../../assets/images/marine_cargo_insurance.jpg')}/>
                                        </View>
                                        <TouchableOpacity
                                                activeOpacity={.5}
                                                onPress={() => this.onSubmitMyPolicy(token,userType)}>

                                                <View style={scrollBox}>

                                                        <Image
                                                                style={homeScrollImageLogo}
                                                                source={require('../../../assets/images/mypolicies_icon.png')}/>
                                                        <Text style={scrollBoxText}>My Policies</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                                activeOpacity={.5}
                                                onPress={() => this.onSubmitSavedPolicy(token, userType, policyHolderName, email)}>
                                                <View style={scrollBox}>
                                                        <Image
                                                                style={homeScrollImageLogo}
                                                                source={require('../../../assets/images/savedpolicy_icon.png')}/>
                                                        <Text style={scrollBoxText}>Saved Policies</Text>
                                                </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                                activeOpacity={.5}
                                                onPress={() => this.onSubmitNewPolicy(token, userType, policyHolderName, email)}>
                                                <View style={scrollBox}>
                                                        <Image
                                                                style={homeScrollImageLogo}
                                                                source={require('../../../assets/images/newpolicy_icon.png')}/>
                                                        <Text style={scrollBoxText}>New Policy</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                          activeOpacity={.5}
                                          onPress={() => this.onSubmitMyClaims(token,userType)}>
                                        <View style={scrollBox}>
                                                <Image
                                                        style={homeScrollImageLogo}
                                                        source={require('../../../assets/images/claims_icon.png')}/>
                                                <Text style={scrollBoxText}>Claims</Text>
                                        </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                        activeOpacity={.5}
                                        onPress={() => this.onSubmitLogout(token, userType, policyHolderName, email)}>
                                        <View style={scrollBox}>
                                            <Image
                                                style={homeScrollImageLogo}
                                                source={require('../../../assets/images/Logout_icon.png')}/>
                                            <Text style={scrollBoxText}>Logout</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={.5}
                                        onPress={() => this.onSubmitClaimStatus(token, userType)}>
                                        <View style={scrollBox}>
                                            <Image
                                                style={homeScrollImageLogo}
                                                source={require('../../../assets/images/claimstatus.png')}/>
                                            <Text style={scrollBoxText}>Claim Status</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                        </ScrollView>

                );
        }
}