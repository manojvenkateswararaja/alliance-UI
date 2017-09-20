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
export default class HomeScreenAgents extends Component {
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
                email: email
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
    onSubmitIssuedPolicy(token) {

        this
            .props
            .navigation
            .navigate('FetchissuedPolicyPage', {token: token});
    }
    onSubmitSavedPolicy(token) {
        var policyList;

        return fetch(base_url + '/fetchSavePolicy', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then((response) => response.json()).then((responseJson) => {

            policyList = responseJson.policylist

            this
                .props
                .navigation
                .navigate('SavedPoliciesPage', {
                    token: token,
                    policyList: policyList
                });

        }).catch((error) => {
            console.error(error);
        });
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
                        onPress={() => this.onSubmitIssuedPolicy(token)}>

                        <View style={scrollBox}>

                            <Image
                                style={homeScrollImageLogo}
                                source={require('../../../assets/images/mypolicies_icon.png')}/>
                            <Text style={scrollBoxText}>Issued Policies</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={() => this.onSubmitSavedPolicy(token)}>
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
                    <View style={scrollBox}>
                        <Image
                            style={homeScrollImageLogo}
                            source={require('../../../assets/images/claims_icon.png')}/>
                        <Text style={scrollBoxText}>Claims</Text>
                    </View>
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
                </View>
            </ScrollView>

        );
    }
}