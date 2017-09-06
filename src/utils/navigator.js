/**
 * Created by VikramV on 2017/08/26
 */

import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.11
import SplashScreen from '../components/SplashScreen/SplashScreen';
import LoginScreen from '../components/LoginScreen/LoginScreen';
import RegisterScreen from '../components/RegisterScreen/RegisterScreen';
import HomeScreenClients from '../components/HomeScreen/HomeScreenClients';


export const Navigator  = StackNavigator({
  SplashPage: {screen: SplashScreen},
  LoginPage: {screen: LoginScreen},
  RegisterPage: {screen: RegisterScreen},
  HomePageClients: {screen: HomeScreenClients}
});