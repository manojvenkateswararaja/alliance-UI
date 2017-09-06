import React, { Component } from 'react';
import { Text,
         View,
         ScrollView,
         Image
       } from 'react-native';
import customtext from '../../utils/customtext';
import customstyles from '../../../assets/styles/customstyles';

const { home_client_cnfAgents,
        home_client_directClients
     } = customtext;

const { scrollContainer,
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
                header: null,
        }

        constructor(props) {
                super(props);           
        }

        render() {
                return(
                        <ScrollView style={scrollContainer}>
                                <View style={scrollViewContainer}>
                                        <View style={scrollImage}>
                                                <Image
                                                        style={homeImageLayout}
                                                        source={require('../../../assets/images/marine_cargo_insurance.jpg')}
                                                />
                                        </View>
                                        
                                        <View style={scrollBox}>
                                                <Image
                                                        style={homeScrollImageLogo}
                                                        source={require('../../../assets/images/mypolicies_icon.png')}
                                                />
                                                <Text style={scrollBoxText}>My Policies</Text>
                                        </View>
                                        
                                        <View style={scrollBox}>
                                                <Image
                                                        style={homeScrollImageLogo}
                                                        source={require('../../../assets/images/savedpolicy_icon.png')}
                                                />
                                                <Text style={scrollBoxText}>Saved Policies</Text>
                                        </View>
                                        
                                        <View style={scrollBox}>
                                                <Image
                                                        style={homeScrollImageLogo}
                                                        source={require('../../../assets/images/newpolicy_icon.png')}
                                                />
                                                <Text style={scrollBoxText}>New Policy</Text>
                                        </View>
                                        
                                        <View style={scrollBox}>
                                                <Image
                                                        style={homeScrollImageLogo}
                                                        source={require('../../../assets/images/claims_icon.png')}
                                                />
                                                <Text style={scrollBoxText}>Claims</Text>
                                        </View>
                                </View>
                        </ScrollView>
                         
                );
        }
}