/**
 * Created by VikramV on 2017/08/26
 */

import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.11
import SplashScreen from '../components/SplashScreen/SplashScreen';
import LoginScreen from '../components/LoginScreen/LoginScreen'


export const Navigator  = StackNavigator({
  SplashPage: {screen: SplashScreen},
  LoginPage: {screen: LoginScreen}
});