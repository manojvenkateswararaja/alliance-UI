import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/components/SplashScreen/splashscreen'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Splash />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
