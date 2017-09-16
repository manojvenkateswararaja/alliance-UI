import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import customtext from '../../utils/customtext';
import customstyles from '../../../assets/styles/customstyles';

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
                                email: email
                        });
        }
        onSubmitLogout() {

                this
                        .props
                        .navigation
                        .navigate('LoginPage');
        }
        onSubmitMyPolicy(token) {

                this
                        .props
                        .navigation
                        .navigate('FetchissuedPolicyPage', {token: token});
        }
        onSubmitSavedPolicy(token) {
                var policyList;

                return fetch('http://192.168.0.20:8082/fetchSavePolicy', {
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
                                                onPress={() => this.onSubmitMyPolicy(token)}>

                                                <View style={scrollBox}>

                                                        <Image
                                                                style={homeScrollImageLogo}
                                                                source={require('../../../assets/images/mypolicies_icon.png')}/>
                                                        <Text style={scrollBoxText}>My Policies</Text>
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