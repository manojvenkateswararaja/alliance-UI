import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import customtext from '../../utils/customtext';
import customstyles from '../../../assets/styles/customstyles';
import environment from '../../utils/environment';
import {NavigationActions} from 'react-navigation';
import Toast from 'react-native-root-toast';

const {home_client_cnfAgents, home_client_directClients} = customtext;

const {
    scrollContainer,
    scrollViewContainer,
    scrollBoxLogout1,
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



export default class HomeScreenPublicAdjuster extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
       
    }
    

    onSubmitValidatedClaim(token,userType,claimadjusternegotiation) {
         this
             .props
             .navigation
             .navigate('FetchClaimPage', {token: token,userType:userType,claimadjusternegotiation:claimadjusternegotiation});
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

        var email = params.email;
        var claimadjusternegotiation = "Claim-Adjuster Negotiation value";
        

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
                    onPress={() => this.onSubmitValidatedClaim(token,userType,claimadjusternegotiation)}>
                    <View style={scrollBoxLogout1}>
                        <Image
                            style={homeScrollImageLogo}
                            source={require('../../../assets/images/claims_icon.png')}/>
                        <Text style={scrollBoxText}>Validated Claims</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    activeOpacity={.5}
                    onPress={() => this.onSubmitLogout(token, userType, email)}>
                    <View style={scrollBoxLogout1}>
                        <Image
                            style={homeScrollImageLogo}
                            source={require('../../../assets/images/Logout_icon.png')}/>
                        <Text style={scrollBoxText}>Logout</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                activeOpacity={.5}
                onPress={() => this.onSubmitClaimStatus(token, userType)}>
                <View style={scrollBoxLogout1}>
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