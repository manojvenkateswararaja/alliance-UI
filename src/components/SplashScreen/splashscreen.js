import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import customcolors from '../../utils/colors';

const { wrapper, titleWrapper, title, subtitleWrapper, 
        subtitle, splashscreenLoading, splashscreenLoadingWrapper } = customstyles;
const { loading } = customtext;
const { white } = customcolors;

export default class splashscreen extends Component {
    constructor(props) {
        super();
        this.state = {
            animating: true
        };
    }

    closeActivityIndicator = () => setTimeout(() => this.setState({ 
      animating: false 
    }), 3000)

    componentDidMount = () => this.closeActivityIndicator();
    
    render() {
        const animating = this.state.animating;
        return (
            <View style={wrapper}>
                <View style={titleWrapper}>
                    <Text style={title}>Marine Insurance</Text>
                </View>

                <View style={splashscreenLoadingWrapper}>
                    <ActivityIndicator animating={animating} 
                        color={white}
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