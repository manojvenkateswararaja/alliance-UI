import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/components/SplashScreen/splashscreen'
import styles from './assets/styles/customstyles';

const { container } = styles;

export default class App extends React.Component {
  render() {
    return (
      <View style={container}>
        <Splash />
      </View>
    );
  }
}