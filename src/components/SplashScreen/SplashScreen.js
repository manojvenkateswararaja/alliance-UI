import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import customcolors from '../../utils/colors';

const { wrapper, 
        titleWrapper, 
        title, 
        subtitleWrapper, 
        subtitle, 
        splashscreenLoading, 
        splashscreenLoadingWrapper,
        loginscreenLogoContainer,
        loginscreenLogo } = customstyles;
const { loading } = customtext;
const { white } = customcolors;

export default class SplashScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    componentDidMount() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginPage'})
            ]
        })

        setTimeout(() => {
            this.props.navigation.dispatch(resetAction)
        }, 3000)
    }
    
    componentWillUnmount() {
        // clear the interval
        clearInterval(this.autoRefreshHandler);
    }
    
    render() {
        return (
            <View style={wrapper}>
                <View style={titleWrapper}>
                    <View style={loginscreenLogoContainer}>
                        <Image
                            style={loginscreenLogo}
                            source={require('../../../assets/images/logo.png')}
                        />
                    </View>
                    <Text style={title}>Marine Insurance</Text>
                </View>

                <View style={splashscreenLoadingWrapper}>
                    <ActivityIndicator color={white}
                        size="large"
                        style={splashscreenLoading} />
                </View>

                <View style={subtitleWrapper}>
                    <Text style={subtitle}>Powered by</Text>
                    <Text style={subtitle}>RapidQube Digital Solutions Pvt. Ltd.</Text>
                </View>
            </View>
        );
    }
}