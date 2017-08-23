import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import styles from '../../../assets/styles/customstyles';

const { wrapper, titleWrapper, title, subtitleWrapper, subtitle } = styles;

export default class splashscreen extends Component {
    render() {
        return (
            <View style={wrapper}>
                <View style={titleWrapper}>
                    <Text style={title}>Marine Insurance</Text>
                </View>
                <View style={subtitleWrapper}>
                    <Text style={subtitle}>Powered by</Text>
                    <Text style={subtitle}>RapidQube Digital Solutions Pvt. Ltd.</Text>
                </View>
            </View>
        );
    }
}