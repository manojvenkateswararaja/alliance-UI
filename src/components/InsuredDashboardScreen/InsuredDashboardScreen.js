import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView
   
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import customstyles from '../../../assets/styles/customstyles';
import customtext from '../../utils/customtext';
import colors from '../../utils/colors';
import {TextField} from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {MaterialDialog} from 'react-native-material-dialog';
import {RaisedTextButton} from 'react-native-material-buttons';
import {Dropdown} from 'react-native-material-dropdown';
import Toast from 'react-native-root-toast';
import environment from '../../utils/environment';


const {loginscreenLogoContainer, loginscreenLogo, loginTitle, container1,NotificationsText,InsurerDetailsText,InsuredDashboardform} = customstyles;
const {login_welcome} = customtext;
const {
    username_label,
    password_label,
    login_label,
    create_account_text,
    create_account_link,
    value_true
} = customtext;
const {
    loginscreenInputContainer,
    loginscreenContainer,
    loginscreenCreateAccountWrapper,
    loginscreenCreateAccountText,
    loginscreenCreateAccountLinkText,
    loginscreenLoginContainer,
   
} = customstyles;
const {white, turquoise, red} = colors;
const { base_url } = environment;


export default class InsuredDashboardScreen extends Component {
    constructor() {
        super();
      

        this.onFocus = this
            .onFocus
            .bind(this);
        this.onChangeText = this
            .onChangeText
            .bind(this);
 
        this.onChangeText1 = this
            .onChangeText1
            .bind(this);

        this.onChangeText2 = this
            .onChangeText2
            .bind(this);
 
        this.onBlur = this
            .onBlur
            .bind(this);

        this.onBlur1 = this
            .onBlur1
            .bind(this);

        this.onBlur2 = this
            .onBlur2
            .bind(this);

        this.onAccessoryPress = this
            .onAccessoryPress
            .bind(this);
        

        this.TitleRef = this
            .updateRef
            .bind(this, 'Title');

        this.DamegeDetailsRef = this
            .updateRef
            .bind(this, 'DamegeDetails');

        this.DamageValueRef = this
            .updateRef
            .bind(this, 'DamageValue');

        this.TotalClaimRef = this
            .updateRef
            .bind(this, 'TotalClaim');

        this.RejectionMarkRef = this
            .updateRef
            .bind(this, 'RejectionMark');

        this.AssessedDamegeValueRef = this
            .updateRef
            .bind(this, 'AssessedDamegeValue');
            
        this.AssessedClaimValueRef = this
            .updateRef
            .bind(this, 'AssessedClaimValue');

        this.renderPasswordAccessory = this
            .renderPasswordAccessory
            .bind(this);
       
        this.state = {
            Title: '',
            DamegeDetails: '',
            DamageValue:'',
            TotalClaim:'',
            RejectionMark:'',
            AssessedDamegeValue:'',
            AssessedClaimValue:'',
            secureTextEntry: true,
            basicNoTitleVisible: false
        };

    }
   
    onAccessoryPress() {
        this.setState(({secureTextEntry}) => ({
            secureTextEntry: !secureTextEntry
        }));
    }
    onSubmitTitle() {
        this
            .Title
            .focus();
    }

    onSubmitDamegeDetails() {
        this
            .DamegeDetails
            .focus();
    }
    onSubmitDamageValue() {
        this
            .DamageValue
            .focus();
    }
    onSubmitTotalClaim() {
        this
            .TotalClaim
            .focus();
    }
    onSubmitRejectionMark() {
        this
            .RejectionMark
            .focus();
    }
    onSubmitAssessedDamegeValue() {
        this
            .AssessedDamegeValue
            .focus();
    }
    onSubmitAssessedClaimValue() {
        this
            .AssessedClaimValue
            .focus();
    }
    onDeleteBTN = () => {
        console.log("ih")
      }
    onBlur() {
        let errors = {};

        ['Title', 'DamegeDetails'].forEach((name) => {

            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'Title' && value.length < 2) {
                    errors[name] = 'Invalid Title';
                }

                if (name === 'DamegeDetails' && value.length < 2) {
                    errors[name] = 'Invalid DamegeDetails';
                }
               
            }
        });

        this.setState({errors});
    }
    onBlur1() {
        let errors = {};

        ['DamageValue','TotalClaim'].forEach((name) => {

            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'DamageValue' && value.length < 2) {
                    errors[name] = 'Invalid DamageValue';
                }
                if (name === 'TotalClaim' && value.length < 2) {
                    errors[name] = 'Invalid TotalClaim';
                }
               
            }
        });

        this.setState({errors});
    }
    onBlur2() {
        let errors = {};

        ['RejectionMark','AssessedDamegeValue','AssessedClaimValue'].forEach((name) => {

            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'RejectionMark' && value.length < 2) {
                    errors[name] = 'Invalid Rejection Mark';
                }
                if (name === 'AssessedDamegeValue' && value.length < 2) {
                    errors[name] = 'Invalid Assessed Damege Value';
                }
                if (name === 'AssessedClaimValue' && value.length < 2) {
                    errors[name] = 'Invalid Assessed Claim Value';
                }
            }
        });

        this.setState({errors});
    }


    onSubmitNotifyClaims = (policyno,token) => {
        
        this.setState({basicNoTitleVisible: true});
        return fetch(base_url + '/notifyClaim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({policyno:policyno,
                title:this.state.Title,
                damagedetails:this.state.DamegeDetails
             })
        }).then((response) => response.json()).then((responseJson) => {
          
        var message = responseJson.message;
        console.log("insureddashboard"+message);
       
       
     
        }).catch((error) => {
            console.error(error);
        });              
    }

    onFocus() {
        let {
            errors = {}
        } = this.state;
        for (let name in errors) {
            let ref = this[name];
            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }
        this.setState({errors});
    }

    onChangeText(text) {
        ['Title', 'DamegeDetails'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }
    onChangeText1(text) {
        ['DamageValue','TotalClaim'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }
    onChangeText2(text) {
        ['RejectionMark','AssessedDamegeValue','AssessedClaimValue'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }
    renderPasswordAccessory() {
        let {secureTextEntry} = this.state;
        let name = secureTextEntry
            ? 'visibility'
            : 'visibility-off';
        return (<MaterialIcon
            size={24}
            name={name}
            color={TextField.defaultProps.baseColor}
            onPress={this.onAccessoryPress}
            suppressHighlighting/>);
    }
    isEmptyObject(object) {
        return (Object.getOwnPropertyNames(object).length === 0);
    }
    static navigationOptions = {
        header: null
    }
    render() {
        var {params} = this.props.navigation.state;
        var policyno = params.policyNumber;
        console.log("policyno"+policyno);
        var token = params.token;

        let {
            errors = {},
            secureTextEntry,
            ...data
        } = this.state;
        let {
            Title = 'Title'
        } = data;

        let {
            DamegeDetails = 'DamegeDetails'
        } = data;
        let {
            DamageValue = 'DamageValue'
        } = data;
        let {
            TotalClaim = 'TotalClaim'
        } = data;
        let {
            RejectionMark = 'RejectionMark'
        } = data;
        let {
            AssessedDamegeValue = 'AssessedDamegeValue'
        } = data;
        let {
            AssessedClaimValue = 'AssessedClaimValue'
        } = data;


        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
                <ScrollView>
                    <View style={loginscreenInputContainer}>
                        <Text style={NotificationsText}>Notifications{'\n'}</Text>
                        <Text>Claim Number:{'\n'}{'\n'}{'\n'}</Text>
                        <Text>New Claim Form:{'\n'}</Text>
                        <Text style={InsurerDetailsText}>Insurer Details{'\n'}</Text>
                       
                       <View style={InsuredDashboardform}>
                        <TextField
                            ref={this.TitleRef}
                            value={data.Title}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitTitle}
                            returnKeyType='next'
                            label="Title"
                            error={errors.Title}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur}/>

                        <TextField
                            ref={this.DamegeDetailsRef}
                            value={data.DamegeDetails}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline = {true}
                            numberOfLines = {4}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitDamegeDetails}
                            returnKeyType='next'
                            label="Damege Details"
                            error={errors.DamegeDetails}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur}
                            editable = {true}
                            maxLength = {40}/>

                            <RaisedTextButton
                            onPress={()=>this.onSubmitNotifyClaims(policyno,token)}
                            title="Notify Claims"
                            color={turquoise}
                            titleColor={white}/>
                       </View>
                       
                       <View style={InsuredDashboardform}>
                            <TextField
                            ref={this.DamageValueRef}
                            value={data.DamageValue}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText1}
                            onSubmitEditing={this.onSubmitDamageValue}
                            returnKeyType='next'
                            label="Total Damage Value"
                            error={errors.DamageValue}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur1}/>

                            <TextField
                            ref={this.TotalClaimRef}
                            value={data.TotalClaim}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText1}
                            onSubmitEditing={this.onSubmitTotalClaim}
                            returnKeyType='next'
                            label="Total Claim"
                            error={errors.TotalClaim}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur1}/>

                            <RaisedTextButton
                            onPress={()=>this.onSubmitDetails(policyno,token)}
                            title="Submit Details"
                            color={turquoise}
                            titleColor={white}/>
                            </View>
                            
                        <Text style={InsurerDetailsText}>Examiner Details{'\n'}</Text>
                        <View style={InsuredDashboardform}>
                        <TextField
                            ref={this.RejectionMarkRef}
                            value={data.RejectionMark}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText2}
                            onSubmitEditing={this.onSubmitRejectionMark}
                            returnKeyType='next'
                            label="Rejection Mark"
                            error={errors.RejectionMark}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur2}/>

                        <TextField
                            ref={this.AssessedDamegeValueRef}
                            value={data.AssessedDamegeValue}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline = {true}
                            numberOfLines = {4}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText2}
                            onSubmitEditing={this.onSubmitAssessedDamegeValue}
                            returnKeyType='next'
                            label="Assessed Damege Value"
                            error={errors.AssessedDamegeValue}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur2}
                            editable = {true}
                            maxLength = {40}/>

                            <TextField
                            ref={this.AssessedClaimValueRef}
                            value={data.AssessedClaimValue}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline = {true}
                            numberOfLines = {4}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText2}
                            onSubmitEditing={this.onSubmitAssessedClaimValue}
                            returnKeyType='next'
                            label="Assessed Claim Value"
                            error={errors.AssessedClaimValue}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlur2}
                            editable = {true}
                            maxLength = {40}/>

                            <RaisedTextButton
                            onPress={()=>this.onSubmit(policyno,token)}
                            title="Sumbit"
                            color={turquoise}
                            titleColor={white}/>
                       </View>
                      
                    </View>
                      <MaterialDialog
          visible={this.state.basicNoTitleVisible}
          okLabel="ok"
          onOk={() => {
          this.setState({basicNoTitleVisible: false});
          return fetch(base_url + '/claim/UserClaims', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        }).then((response) => response.json()).then((responseJson) => {
          
            var userClaims = responseJson.userClaims;
            console.log("userClaims"+ JSON.stringify(userClaims));
            this
                        .props
                        .navigation
                        .navigate('FetchClaimPage',{token:token,userClaims:userClaims});
     
        }).catch((error) => {
            console.error(error);
        });              
         
        }}
          onCancel={() => {
          this.setState({basicNoTitleVisible: false});
        }}>
          
          <Text>
          claim notified Sucessfully !
          </Text>
        </MaterialDialog>
                </ScrollView>
              
            </KeyboardAvoidingView>
        );
    }
}
