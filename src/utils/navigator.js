/**
 * Created by VikramV on 2017/08/26
 */

import {StackNavigator} from 'react-navigation'; // 1.0.0-beta.11
import SplashScreen from '../components/SplashScreen/SplashScreen';
import LoginScreen from '../components/LoginScreen/LoginScreen';
import RegisterScreen from '../components/RegisterScreen/RegisterScreen';
import HomeScreenClients from '../components/HomeScreen/HomeScreenClients';
import NewPoliciesScreen from '../components/NewPoliciesScreen/NewPoliciesScreen';
import PolicyQuotesScreen from '../components/PolicyQuotesScreen/PolicyQuotesScreen';
import SavedPoliciesScreen from '../components/SavedPoliciesScreen/SavedPoliciesScreen';
import HomeScreenAgents from '../components/HomeScreen/HomeScreenAgents';
import PaymentScreen from '../components/PaymentScreen/PaymentScreen';
import FetchissuedPolicyScreen from '../components/FetchissuedPolicyScreen/FetchissuedPolicyScreen';
import ConsignmentDetailScreen from '../components/ConsignmentDetailScreen/ConsignmentDetailScreen';

export const Navigator = StackNavigator({
  SplashPage: {
    screen: SplashScreen
  },
  LoginPage: {
    screen: LoginScreen
  },
  RegisterPage: {
    screen: RegisterScreen
  },
  HomePageClients: {
    screen: HomeScreenClients
  },
  HomePageAgents: {
    screen: HomeScreenAgents
  },
  NewPoliciesPage: {
    screen: NewPoliciesScreen
  },
  PolicyQuotesPage: {
    screen: PolicyQuotesScreen
  },
  SavedPoliciesPage: {
    screen: SavedPoliciesScreen
  },
  PaymentPage: {
    screen: PaymentScreen
  },
  FetchissuedPolicyPage: {
    screen: FetchissuedPolicyScreen
  },
  ConsignmentDetailPage: {
    screen: ConsignmentDetailScreen
  }
});