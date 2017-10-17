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
import Icon from 'react-native-vector-icons/Ionicons';

const {loginscreenLogoContainer, loginscreenLogo, loginTitle, 
       container1,NotificationsText,InsurerDetailsText,
       InsuredDashboardform,commonLoading,AgreeNegButton,
       InsuredDashboardformBlur } = customstyles;
      
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
 var negotiation=[];
 var evenarray =[];
 var oddarray =[];
 var publicadjusterid,evenlastindex,oddlastindex,approvedclaimvalue,claimadjusternegotiation,publicadjusternegotiation;
 var token,rapidID,fullname,userlist;


export default class InsuredDashboardScreen extends Component {
    componentWillMount() {
        
        var {params} = this.props.navigation.state;
        var userType =params.userType;
        var token = params.token;

        if(userType === 'Direct Clients' || userType === 'CNF Agents'){
            this.setState({examiner: true});
            this.setState({examiner1: false});
            this.setState({Insurer: true});
            this.setState({Insurer1: false});
            this.setState({Negotiation: false});
            this.setState({Negotiation1: true});   
        }
        
        if(userType === 'Examiner'){
            this.setState({examiner: false});
            this.setState({examiner1: true});
            this.setState({Insurer: false});
            this.setState({Insurer1: true});
            this.setState({Negotiation: false});
            this.setState({Negotiation1: true});
        }

        if(userType === 'Claims Adjuster' || userType === 'Public Adjuster'){
            this.setState({examiner: true});
            this.setState({examiner1: false});
            this.setState({Insurer: false});
            this.setState({Insurer1: true});
            this.setState({Negotiation: true});
            this.setState({Negotiation1: false});
        }

        negotiation=params.negotiationlist;
        console.log("in ids"+params.approvedclaim);
     
        if(params.approvedclaim === undefined){
        approvedclaimvalue=params.approvedclaim;
        }else{
        approvedclaimvalue=params.approvedclaim.toString();
        }
        
        if(params.claimadjusternegotiation === undefined){
        claimadjusternegotiation=params.claimadjusternegotiation;
        }else{
        claimadjusternegotiation=params.claimadjusternegotiation.toString();

        }
        if(params.publicadjusternegotiation ===undefined){
        publicadjusternegotiation=params.publicadjusternegotiation;
        }
        else{
        publicadjusternegotiation=params.publicadjusternegotiation.toString();

        }
    
  evenlastindex=evenarray[evenarray.length-1]
  
  oddlastindex =oddarray[oddarray.length-1]
 
         if (params.claimno !== null && (params.userType==='Examiner' || params.userType === 'CNF Agents' || params.userType === 'Direct Clients' )) {
                     
          this.state = {
            ClaimNo: params.claimno.toString(),
            Title: params.title.toString(),
            DamegeDetails: params.damagedetails.toString(),
            DamageValue:params.totaldamagevalue.toString(),
            TotalClaim:params.totalclaimvalue.toString(),
            PublicAdjuster:params.publicadjusterid.toString(),
            AssessedDamegeValue:params.assesseddamagevalue.toString(),
            AssessedClaimValue:params.assessedclaimvalue.toString(),
            ApprovedClaimValue:approvedclaimvalue,
            rapidID:params.rapidID,
            secureTextEntry: true,
            loading_blur: false,
            payment:false
          };
    
        } else if(params.claimno !== null && (params.userType==='Public Adjuster' )){
           
           if(negotiation !== null){
            for(let i=0; i<negotiation.length; i++)
                {
                    if( (i+2)%2 == 0){
                        //evenarray[i] =negotiation[i];
                        evenarray.push(negotiation[i]);
                        console.log("evenarray :"+JSON.stringify(evenarray));
                        
                    }else{
                       
                        oddarray.push(negotiation[i]);
                        console.log("oddarray :"+JSON.stringify(oddarray));
                       
                    }
                }
            }

             if  (evenlastindex === undefined){
                this.state = {
                    ClaimNo: params.claimno.toString(),
                    asperterm:'',
                    negotiationvalue:'',
                    Title: params.title.toString(),
                    DamegeDetails: params.damagedetails.toString(),
                    DamageValue:params.totaldamagevalue.toString(),
                    TotalClaim:params.totalclaimvalue.toString(),
                    PublicAdjuster:params.publicadjusterid.toString(),
                    AssessedDamegeValue:params.assesseddamagevalue.toString(),
                    AssessedClaimValue:params.assessedclaimvalue.toString(),
                    claimadjusternegotiation:claimadjusternegotiation,
                    ApprovedClaimValue:approvedclaimvalue,
                    secureTextEntry: true,
                    loading_blur: false,
                    payment:false
                  }
                } else {
                    this.state = {
                        ClaimNo: params.claimno.toString(),
                        asperterm:evenlastindex.asperterm,
                        negotiationvalue:evenlastindex.negotiationvalue,
                        Title: params.title.toString(),
                        DamegeDetails: params.damagedetails.toString(),
                        DamageValue:params.totaldamagevalue.toString(),
                        TotalClaim:params.totalclaimvalue.toString(),
                        PublicAdjuster:params.publicadjusterid.toString(),
                        AssessedDamegeValue:params.assesseddamagevalue.toString(),
                        AssessedClaimValue:params.assessedclaimvalue.toString(),
                        claimadjusternegotiation:claimadjusternegotiation,
                        ApprovedClaimValue:approvedclaimvalue,
                        secureTextEntry: true,
                        loading_blur: false,
                        payment:false
                      }    
                   }

        }else if(params.claimno !== null && (params.userType==='Claims Adjuster' )){
            this.setState({payment: true})
            if(negotiation !== null){
            for(let i=0; i<negotiation.length; i++)
                {
                    if( (i+2)%2 == 0){
                        //evenarray[i] =negotiation[i];
                        evenarray.push(negotiation[i]);
                        console.log("evenarray :"+JSON.stringify(evenarray));
                        
                    }else{
                       
                        oddarray.push(negotiation[i]);
                        console.log("oddarray :"+JSON.stringify(oddarray));
                       
                    }
                }
            }
            if  (oddlastindex === undefined){
            this.state = {
                ClaimNo: params.claimno.toString(),
                asperterm:'',
                negotiationvalue:'',
                Title: params.title.toString(),
                DamegeDetails: params.damagedetails.toString(),
                DamageValue:params.totaldamagevalue.toString(),
                TotalClaim:params.totalclaimvalue.toString(),
                PublicAdjuster:params.publicadjusterid.toString(),
                AssessedDamegeValue:params.assesseddamagevalue.toString(),
                AssessedClaimValue:params.assessedclaimvalue.toString(),
                publicadjusternegotiation:publicadjusternegotiation,
                ApprovedClaimValue:approvedclaimvalue,
                secureTextEntry: true,
                loading_blur: false,
                payment:false
              }
            } else {
                this.state = {
                    ClaimNo: params.claimno.toString(),
                    asperterm:oddlastindex.asperterm,
                    negotiationvalue:oddlastindex.negotiationvalue,
                    Title: params.title.toString(),
                    DamegeDetails: params.damagedetails.toString(),
                    DamageValue:params.totaldamagevalue.toString(),
                    TotalClaim:params.totalclaimvalue.toString(),
                    PublicAdjuster:params.publicadjusterid.toString(),
                    AssessedDamegeValue:params.assesseddamagevalue.toString(),
                    AssessedClaimValue:params.assessedclaimvalue.toString(),
                    publicadjusternegotiation:publicadjusternegotiation,
                    ApprovedClaimValue:approvedclaimvalue,
                    secureTextEntry: true,
                    loading_blur: false,
                    payment:false
                  }
            }

        } else {
          
          this.state = {
            ClaimNo: '',
            asperterm:'',
            negotiationvalue:'',
            Title:'',
            DamegeDetails: '',
            DamageValue:'',
            TotalClaim:'',
            fullname:'',
            PublicAdjuster:'',
            RejectionClaim:'',
            AssessedDamegeValue:'',
            AssessedClaimValue:'',
            PublicNegotiationValue:'',
            PublicBaseValue:'',
            ClaimNegotiationValue:'',
            ClaimBaseValue:'',
            ApprovedClaimValue:'',
            secureTextEntry: true,
            loading_blur: false,
            payment:false
          }
        }
        return fetch(base_url + '/publicadjusterlist', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        }).then((response) => response.json()).then((responseJson) => {
        
        userlist = responseJson.message;
        console.log("userlist"+ JSON.stringify(userlist));

        // for (var i = 0; i < userlist.length; i++) {
        //     fullname.push(userlist[i].fullname)
        //     console.log(fullname);
        //   }

        fullname = userlist[0].fullname;
        console.log("fullname"+ JSON.stringify(fullname));

        rapidID = userlist[0].rapidID;
        console.log("rapidID"+ JSON.stringify(rapidID));
                 
        this.setState({fullname});
        this.setState({rapidID});
               
        }).catch((error) => {
         console.error(error);
        });
                    
      }
    constructor() {
        super();
      
        this.onFocus = this
            .onFocus
            .bind(this);
        this.onChangeTextInsurerNotifyClaim = this
            .onChangeTextInsurerNotifyClaim
            .bind(this);
 
        this.onChangeTextInsurerSubmitClaim = this
            .onChangeTextInsurerSubmitClaim
            .bind(this);

        this.onChangeTextExamineClaim = this
            .onChangeTextExamineClaim
            .bind(this);

        this.onChangeTextNegotiationRejection = this
            .onChangeTextNegotiationRejection
            .bind(this);

        this.onChangeTextNegotiation = this
            .onChangeTextNegotiation
            .bind(this);

        this.onChangeTextExaminerRejection = this
            .onChangeTextExaminerRejection
            .bind(this);
 
 
        this.onBlurInsurerNotifyClaim = this
            .onBlurInsurerNotifyClaim
            .bind(this);

        this.onBlurInsurerSubmitClaim = this
            .onBlurInsurerSubmitClaim
            .bind(this);

        this.onBlurExamineClaim = this
            .onBlurExamineClaim
            .bind(this);

        this.onBlurNegotiation = this
            .onBlurNegotiation
            .bind(this);

        this.onBlurExaminerRejection = this
            .onBlurExaminerRejection
            .bind(this);

        this.onBlurNegotiationRejection = this
            .onBlurNegotiationRejection
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

        this.ApprovedClaimValueRef = this
            .updateRef
            .bind(this, 'ApprovedClaimValue');

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
        
        this.RejectionClaimRef = this
            .updateRef
            .bind(this, 'RejectionClaim');
                 
        this.RejectionClaimExaminerRef = this
            .updateRef
            .bind(this, 'RejectionClaimExaminer'); 

        this.PublicNegotiationValueRef = this
            .updateRef
            .bind(this, 'PublicNegotiationValue'); 

        this.ClaimNegotiationValueRef = this
            .updateRef
            .bind(this, 'ClaimNegotiationValue'); 
            
        this.PublicBaseValueRef = this
            .updateRef
            .bind(this, 'PublicBaseValue');  

        this.ClaimBaseValueRef = this
            .updateRef
            .bind(this, 'ClaimBaseValue');

        this.PublicAdjusterRef = this
            .updateRef
            .bind(this, 'PublicAdjuster');
             
        this.renderPasswordAccessory = this
            .renderPasswordAccessory
            .bind(this);
     
        this.state = {
            Title: '',
            DamegeDetails: '',
            DamageValue:'',
            TotalClaim:'',
            PublicAdjuster:'',
            RejectionMark:'',
            AssessedDamegeValue:'',
            AssessedClaimValue:'',
            RejectionClaim:'',
            RejectionClaimExaminer:'',
            PublicNegotiationValue:'',
            PublicBaseValue:'',
            ClaimNegotiationValue:'',
            ClaimBaseValue:'',
            fullname:'',
            ApprovedClaimValue:'',
            secureTextEntry: true,
            basicNoTitleVisible: false,
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
    onSubmitPublicAdjuster() {
        this
            .PublicAdjuster
            .focus();
    }
    onSubmitRejectionClaim() {
        this
            .RejectionClaim
            .focus();
    }
    onSubmitRejectionClaimExaminer() {
        this
            .RejectionClaimExaminer
            .focus();
    }
    onSubmitPublicNegotiationValue() {
        this
            .PublicNegotiationValue
            .focus();
    }
    onSubmitPublicBaseValue() {
        this
            .PublicBaseValue
            .focus();
    }
    onSubmitClaimNegotiationValue() {
        this
            .ClaimNegotiationValue
            .focus();
    }
    onSubmitClaimBaseValue() {
        this
            .ClaimBaseValue
            .focus();
    }
    onBlurInsurerNotifyClaim() {
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
        if (this.isEmptyObject(errors)) {
            
                        setTimeout(() => {
                            this.setState({loading_blur: false});
                            this.setState({userType: 'Direct Clients'});
            
                        }, 3000)
                    } else {
                        this.setState({loading_blur: false});
                    }
            
        this.setState({errors});
    }
    onBlurInsurerSubmitClaim() {
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
                if (name === 'PublicAdjuster' && value.length < 2) {
                    errors[name] = 'Invalid PublicAdjuster';
                }
            }
        });
        if (this.isEmptyObject(errors)) {
            
                        setTimeout(() => {
                            this.setState({loading_blur: false});
                            this.setState({userType: 'Direct Clients'});
            
                        }, 3000)
                    } else {
                        this.setState({loading_blur: false});
                    }
            
        this.setState({errors});
    }
    onBlurExamineClaim() {
        let errors = {};

        ['AssessedDamegeValue','AssessedClaimValue'].forEach((name) => {

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
        if (this.isEmptyObject(errors)) {
            
                        setTimeout(() => {
                            this.setState({loading_blur: false});
                            this.setState({userType: 'Direct Clients'});
            
                        }, 3000)
                    } else {
                        this.setState({loading_blur: false});
                    }
            
        this.setState({errors});
    }
    onBlurNegotiationRejection() {
        let errors = {};

        ['RejectionClaim'].forEach((name) => {

            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'RejectionClaim' && value.length < 2) {
                    errors[name] = 'Invalid Rejection Claim';
                }
               
            }
        });
            
        this.setState({errors});
    }

    onBlurNegotiation() {
        let errors = {};

        ['PublicNegotiationValue','PublicBaseValue','ClaimNegotiationValue','ClaimBaseValue'].forEach((name) => {

            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'PublicNegotiationValue' && value.length < 2) {
                    errors[name] = 'Invalid Negotiation Value';
                }
                if (name === 'PublicBaseValue' && value.length < 2) {
                    errors[name] = 'Invalid Base Value';
                }
                if (name === 'ClaimNegotiationValue' && value.length < 2) {
                    errors[name] = 'Invalid Negotiation Value';
                }
                if (name === 'ClaimBaseValue' && value.length < 2) {
                    errors[name] = 'Invalid Base Value';
                }
               
            }
        });
            
        this.setState({errors});
    }

    onBlurExaminerRejection() {
        let errors = {};

        ['RejectionClaimExaminer'].forEach((name) => {

            let value = this[name].value();

            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'RejectionClaimExaminer' && value.length < 2) {
                    errors[name] = 'Invalid Rejection Claim';
                }
               
            }
        });
            
        this.setState({errors});
    }

    onSubmitNotifyClaims = (policyno,token,userType) => {
        this.setState({loading_blur: true});
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
        if (message === 'claim notified Sucessfully !'){
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
           
            this
            .props
            .navigation
            .navigate('FetchClaimPage', {token:token,userType:userType});
         
        }
            }).catch((error) => {
                console.error(error);
            });              
        }
    onSubmitDetails = (token,userType) => {
        this.setState({loading_blur: true});
        this.setState({basicNoTitleVisible: true});
        console.log("p-ubid"+this.state.PublicAdjuster)
        return fetch(base_url + '/createClaim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                claimno:this.state.ClaimNo,
                totaldamagevalue:this.state.DamageValue,
                totalclaimvalue:this.state.TotalClaim,
                publicadjusterid:this.state.rapidID
             })
        }).then((response) => response.json()).then((responseJson) => {
          
        var message = responseJson.message;
        console.log("insureddashboard"+message);
        if (message === 'claim value updated Sucessfully !'){
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
            this
            .props
            .navigation
            .navigate('FetchClaimPage', {token:token,userType:userType});
        }
       
     
        }).catch((error) => {
            console.error(error);
        });              
    }
    onExamine(token,userType){
        this.setState({loading_blur: true});
        this.setState({basicNoTitleVisible: true});
        return fetch(base_url + '/examineClaim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                claimno:this.state.ClaimNo,
                assesseddamagevalue:this.state.AssessedDamegeValue,
                assessedclaimvalue:this.state.AssessedClaimValue,
              
             })
        }).then((response) => response.json()).then((responseJson) => {
          
        var message = responseJson.message;
        console.log("insureddashboard"+message);
        if (message === 'claim value examined Sucessfully !'){
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
            this
            .props
            .navigation
            .navigate('FetchClaimPage', {token:token,userType:userType});
        }
       
     
        }).catch((error) => {
            console.error(error);
        });              
    }
    onSubmitAddRemark(token,userType){
        this.setState({loading_blur: true});
        this.setState({basicNoTitleVisible: true});
        return fetch(base_url + '/rejectClaim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                claimno:this.state.ClaimNo,
                remarks:this.state.RejectionClaim,
             })
        }).then((response) => response.json()).then((responseJson) => {
          
        var message = responseJson.message;
        console.log("insureddashboard"+message);
        if (message === 'claim  rejected  !' || message === 'Internal Server Error !'){
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
            this
            .props
            .navigation
            .navigate('FetchClaimPage', {token:token,userType:userType});
        }
       
        }).catch((error) => {
            console.error(error);
        });              
    }
    onSubmitRemarkExaminer(token,userType){
        this.setState({loading_blur: true});
        this.setState({basicNoTitleVisible: true});
        return fetch(base_url + '/rejectClaim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                claimno:this.state.ClaimNo,
                remarks:this.state.RejectionClaimExaminer,
             })
        }).then((response) => response.json()).then((responseJson) => {
          
        var message = responseJson.message;
        console.log("insureddashboard"+message);
        if (message === 'claim  rejected  !' || message === 'Internal Server Error !'){
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
            this
            .props
            .navigation
            .navigate('FetchClaimPage', {token:token,userType:userType});

        }
       
     
        }).catch((error) => {
            console.error(error);
        });              
    }
    onSubmitPayment(token,userType){
        this.setState({loading_blur: true});
        this.setState({basicNoTitleVisible: true});
        return fetch(base_url + '/settleClaim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                claimno:this.state.ClaimNo
             })
        }).then((response) => response.json()).then((responseJson) => {
          
        var message = responseJson.message;
        console.log("insureddashboard"+message);
        if (message === 'claim  settled Sucessfully !'){
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
            this
            .props
            .navigation
            .navigate('FetchClaimPage', {token:token,userType:userType});

        }
       
     
        }).catch((error) => {
            console.error(error);
        });              
    }
    onSubmitAgree(token,userType){
        this.setState({loading_blur: true});
        this.setState({basicNoTitleVisible: true});
        return fetch(base_url + '/approveClaim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                claimno:this.state.ClaimNo
             })
        }).then((response) => response.json()).then((responseJson) => {
          
        var message = responseJson.message;
        console.log("insureddashboard"+message);
        if (message === 'claim  approved Sucessfully !'){
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
            return fetch(base_url + '/approveClaimValue', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({
                    claimno:this.state.ClaimNo
                 })
            }).then((response) => response.json()).then((responseJson) => {
              
            var approvedclaim = responseJson.approvedclaim;
            console.log("approvedclaim"+approvedclaim);
            this
            .props
            .navigation
            .navigate('FetchClaimPage', {token:token,userType:userType,approvedclaim:approvedclaim});
        }).catch((error) => {
        console.error(error);
    });    
    
    }
        }).catch((error) => {
            console.error(error);
        });              
    }
    onSubmitNegotiation(token,userType){
        this.setState({loading_blur: true});
        this.setState({basicNoTitleVisible: true});
        if(userType==='Claims Adjuster'){
        return fetch(base_url + '/negotiateClaim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                claimno:this.state.ClaimNo,
                negotiationamount:this.state.ClaimNegotiationValue,
                asperterm2B:this.state.ClaimBaseValue,
              
             })
        }).then((response) => response.json()).then((responseJson) => {
          
        var message = responseJson.message;
        console.log("insureddashboard"+message);
        if (message === 'claim  negotiated Sucessfully !'){
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
            this
            .props
            .navigation
            .navigate('FetchClaimPage', {token:token,userType:userType,publicadjusternegotiation:publicadjusternegotiation});
        }
       
     
        }).catch((error) => {
            console.error(error);
        });
    }else if(userType==='Public Adjuster'){
        return fetch(base_url + '/negotiateClaim', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                claimno:this.state.ClaimNo,
                negotiationamount:this.state.PublicNegotiationValue,
                asperterm2B:this.state.PublicBaseValue,
              
             })
        }).then((response) => response.json()).then((responseJson) => {
          
        var message = responseJson.message;
        console.log("insureddashboard"+message);
        if (message === 'claim  negotiated Sucessfully !'){
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
            this
            .props
            .navigation
            .navigate('FetchClaimPage', {token:token,userType:userType,claimadjusternegotiation:claimadjusternegotiation});
        }
       
     
        }).catch((error) => {
            console.error(error);
        });




    }              
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
   
    onChangeTextInsurerNotifyClaim(text) {
        ['Title', 'DamegeDetails'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }
    onChangeTextInsurerSubmitClaim(text) {
        ['DamageValue','TotalClaim'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }
    onChangeTextExamineClaim(text) {
        ['AssessedDamegeValue','AssessedClaimValue'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }
    onChangeTextNegotiationRejection(text) {
        ['RejectionClaim'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }
    onChangeTextNegotiation(text) {
        ['PublicNegotiationValue','PublicBaseValue','ClaimNegotiationValue','ClaimBaseValue'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
            if (ref.isFocused()) {
                this.setState({[name]: text});
            }
        });
    }
    onChangeTextExaminerRejection(text) {
        ['RejectionClaimExaminer'].map((name) => ({name, ref: this[name]})).forEach(({name, ref}) => {
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
    onSubmitUser(){
        this.setState({Logout: true});
      }
      onSubmitDashboard(userType,token){
      
        if (userType === 'CNF Agents') {
            this
                .props
                .navigation
                .navigate('HomePageAgents',{userType:userType,token:token});
        }
        else if(userType === 'Direct Clients'){
            this
                .props
                .navigation
                .navigate('HomePageClients',{userType:userType,token:token})
        }
        else if(userType === 'Examiner'){
            this
                .props
                .navigation
                .navigate('HomePageExaminer',{userType:userType,token:token})
        }
        else if(userType === 'Claims Adjuster'){
            this
                .props
                .navigation
                .navigate('HomePageClaimAdjuster',{userType:userType,token:token})
        }
        else if(userType === 'Public Adjuster'){
            this
                .props
                .navigation
                .navigate('HomePagePublicAdjuster',{userType:userType,token:token});
        }
      }
      onSubmitLogout() {
        
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'LoginPage'})]
                })
        
                setTimeout(() => {
                    this
                        .props
                        .navigation
                        .dispatch(resetAction)
                }, 1000)
            }
       
    render() {
        var {params} = this.props.navigation.state;
        var policyno = params.policyNumber;
        console.log("policyno"+policyno);
        var token = params.token;
        var userType = params.userType;
         

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
        let {
            PublicAdjuster = 'PublicAdjuster'
        } = data;
        let {
            RejectionClaim = 'RejectionClaim'
        } = data;
        let {
            RejectionClaimExaminer = 'RejectionClaimExaminer'
        } = data;
        let {
            PublicNegotiationValue = 'PublicNegotiationValue'
        } = data;
        let {
            PublicBaseValue = 'PublicBaseValue'
        } = data;
        let {
            ClaimNegotiationValue = 'ClaimNegotiationValue'
        } = data;
        let {
            ClaimBaseValue = 'ClaimBaseValue'
        } = data;
        let {
            ApprovedClaimValue = 'ApprovedClaimValue'
        } = data;
        let user = [{
            value:fullname
          }];

        return (
            <KeyboardAvoidingView behavior="padding" style={loginscreenContainer}>
                <ScrollView>
                    <View style={loginscreenInputContainer}>
                   
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={() => this.onSubmitUser()}>
                        <Text style={{textAlign: 'right', color:'navy'}}>
                        <Icon name="ios-person" size={40} color="#ffffff"/> 
                        {userType}</Text>
                    </TouchableOpacity>
                    
                    {this.state.Logout && 
                      <TouchableOpacity
                    activeOpacity={.5}>
                    <Text style={{textAlign: 'right', fontSize:20, color:'navy',textDecorationLine:'underline'}}
                    onPress={() => this.onSubmitLogout()}>Logout</Text>
                    <Text style={{textAlign: 'right', fontSize:20, color:'navy',textDecorationLine:'underline'}}
                    onPress={() => this.onSubmitDashboard(userType,token)}>Go To Dashboard</Text>
                    </TouchableOpacity>
                    }

                        <Text style={NotificationsText}>Notifications{'\n'}</Text>
                        <Text style={{color:'red'}}>Claim Number: <Text style={{color:'blue',textDecorationLine:'underline'}}>
                            {this.state.ClaimNo}{'\n'}{'\n'}</Text></Text>
                        
                        <Text style={{color:'blue',textDecorationLine:'underline'}}>New Claim Form:{'\n'}</Text>
                      
                        <Text style={InsurerDetailsText}>Insurer Details{'\n'}</Text>
                       
                        {this.state.Insurer && <View style={InsuredDashboardform}>
                        <TextField
                            ref={this.TitleRef}
                            value={data.Title}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextInsurerNotifyClaim}
                            onSubmitEditing={this.onSubmitTitle}
                            returnKeyType='next'
                            label="Title"
                            error={errors.Title}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurInsurerNotifyClaim}/>

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
                            onChangeText={this.onChangeTextInsurerNotifyClaim}
                            onSubmitEditing={this.onSubmitDamegeDetails}
                            returnKeyType='next'
                            label="Damage Details"
                            error={errors.DamegeDetails}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurInsurerNotifyClaim}
                            editable = {true}
                            maxLength = {40}/>

                            <RaisedTextButton
                            onPress={()=>this.onSubmitNotifyClaims(policyno,token,userType)}
                            title="Notify Claims"
                            color={turquoise}onSubmitMyPolicy
                            titleColor={white}/>
                       </View>
                        }
                        {this.state.Insurer1 && <View style={InsuredDashboardformBlur}>
                        <TextField
                            ref={this.TitleRef}
                            value={data.Title}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextInsurerNotifyClaim}
                            onSubmitEditing={this.onSubmitTitle}
                            returnKeyType='next'
                            label="Title"
                            error={errors.Title}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurInsurerNotifyClaim}
                            editable={false}/>

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
                            onChangeText={this.onChangeTextInsurerNotifyClaim}
                            onSubmitEditing={this.onSubmitDamegeDetails}
                            returnKeyType='next'
                            label="Damage Details"
                            error={errors.DamegeDetails}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurInsurerNotifyClaim}
                            editable = {true}
                            maxLength = {40}
                            editable={false}/>

                            <RaisedTextButton
                            onPress={()=>this.onSubmitNotifyClaims(policyno,token,userType)}
                            title="Notify Claims"
                            color={turquoise}onSubmitMyPolicy
                            titleColor={white}
                            disabled={true}/>
                       </View>
                        }
                        {this.state.Insurer && <View style={InsuredDashboardform}>
                            <TextField
                            ref={this.DamageValueRef}
                            value={data.DamageValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextInsurerSubmitClaim}
                            onSubmitEditing={this.onSubmitDamageValue}
                            returnKeyType='next'
                            label="Total Damage Value"
                            error={errors.DamageValue}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurInsurerSubmitClaim}/>

                            <TextField
                            ref={this.TotalClaimRef}
                            value={data.TotalClaim}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextInsurerSubmitClaim}
                            onSubmitEditing={this.onSubmitTotalClaim}
                            returnKeyType='next'
                            label="Total Claim"
                            error={errors.TotalClaim}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurInsurerSubmitClaim}/>

                            <Dropdown
                            label='Select User'
                            value={data.fullname}
                            data={user}
                            tintColor={white}
                            textColor={red}
                            style={container1}/>


                            <RaisedTextButton
                            onPress={()=>this.onSubmitDetails(token,userType)}
                            title="Submit Details"
                            color={turquoise}
                            titleColor={white}/>
                            </View>
                        }
                        {this.state.Insurer1 && <View style={InsuredDashboardformBlur}>
                            <TextField
                            ref={this.DamageValueRef}
                            value={data.DamageValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextInsurerSubmitClaim}
                            onSubmitEditing={this.onSubmitDamageValue}
                            returnKeyType='next'
                            label="Total Damage Value"
                            error={errors.DamageValue}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurInsurerSubmitClaim}
                            editable={false}/>

                            <TextField
                            ref={this.TotalClaimRef}
                            value={data.TotalClaim}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextInsurerSubmitClaim}
                            onSubmitEditing={this.onSubmitTotalClaim}
                            returnKeyType='next'
                            label="Total Claim"
                            error={errors.TotalClaim}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurInsurerSubmitClaim}
                            editable={false}/>

                            <Dropdown
                            label='Select User'
                            value={data.fullname}
                            data={user}
                            tintColor={white}
                            textColor={red}
                            disabled={true}
                            style={container1}/>

                            <RaisedTextButton
                            onPress={()=>this.onSubmitDetails(token,userType)}
                            title="Submit Details"
                            color={turquoise}
                            titleColor={white}
                            disabled={true}/>
                            </View>
                        }
                        <Text style={InsurerDetailsText}>Examiner Details{'\n'}</Text>
                        {this.state.examiner && <View style={InsuredDashboardformBlur}>
                        
                        <TextField
                        ref={this.RejectionClaimExaminerRef}
                        value={data.RejectionClaimExaminer}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        multiline = {true}
                        numberOfLines = {4}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeTextExaminerRejection}
                        onSubmitEditing={this.onSubmitRejectionClaimExaminer}
                        returnKeyType='next'
                        label="Add remark of Rejection of Claim"
                        error={errors.RejectionClaimExaminer}
                        tintColor={white}
                        textColor={white}
                        onBlur={this.onBlurExaminerRejection}
                        maxLength = {40}
                        editable={false}/>

                        <RaisedTextButton
                        onPress={()=>this.onSubmitRemarkExaminer(token,userType)}
                        title="Add Remark"
                        color={turquoise}
                        titleColor={white}
                        disabled={true}/>

                        <TextField
                            ref={this.AssessedDamegeValueRef}
                            value={data.AssessedDamegeValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline = {true}
                            numberOfLines = {4}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextExamineClaim}
                            onSubmitEditing={this.onSubmitAssessedDamegeValue}
                            returnKeyType='next'
                            label="Assessed Damage Value"
                            error={errors.AssessedDamegeValue}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurExamineClaim}
                            editable = {true}
                            maxLength = {40}
                            editable={false}/>

                            <TextField
                            ref={this.AssessedClaimValueRef}
                            value={data.AssessedClaimValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline = {true}
                            numberOfLines = {4}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextExamineClaim}
                            onSubmitEditing={this.onSubmitAssessedClaimValue}
                            returnKeyType='next'
                            label="Assessed Claim Value"
                            error={errors.AssessedClaimValue}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurExamineClaim}
                            editable = {true}
                            maxLength = {40}
                            editable={false}/>

                            <RaisedTextButton
                            onPress={()=>this.onExamine(token,userType)}
                            title="Examine"
                            color={turquoise}
                            titleColor={white}
                            disabled={true}/>
                       </View>
                        }
                        {this.state.examiner1 && <View style={InsuredDashboardform}>
                        <TextField
                        ref={this.RejectionClaimExaminerRef}
                        value={data.RejectionClaimExaminer}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        multiline = {true}
                        numberOfLines = {4}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeTextExaminerRejection}
                        onSubmitEditing={this.onSubmitRejectionClaimExaminer}
                        returnKeyType='next'
                        label="Add remark of Rejection of Claim"
                        error={errors.RejectionClaimExaminer}
                        tintColor={white}
                        textColor={white}
                        onBlur={this.onBlurExaminerRejection}
                        maxLength = {40}/>

                        <RaisedTextButton
                        onPress={()=>this.onSubmitRemarkExaminer(token,userType)}
                        title="Add Remark"
                        color={turquoise}
                        titleColor={white}/>

                        <TextField
                            ref={this.AssessedDamegeValueRef}
                            value={data.AssessedDamegeValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline = {true}
                            numberOfLines = {4}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextExamineClaim}
                            onSubmitEditing={this.onSubmitAssessedDamegeValue}
                            returnKeyType='next'
                            label="Assessed Damage Value"
                            error={errors.AssessedDamegeValue}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurExamineClaim}
                            editable = {true}
                            maxLength = {40}/>

                            <TextField
                            ref={this.AssessedClaimValueRef}
                            value={data.AssessedClaimValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline = {true}
                            numberOfLines = {4}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextExamineClaim}
                            onSubmitEditing={this.onSubmitAssessedClaimValue}
                            returnKeyType='next'
                            label="Assessed Claim Value"
                            error={errors.AssessedClaimValue}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurExamineClaim}
                            editable = {true}
                            maxLength = {40}/>

                            <RaisedTextButton
                            onPress={()=>this.onExamine(token,userType)}
                            title="Examine"
                            color={turquoise}
                            titleColor={white}/>
                       </View>
                        }
                       <Text style={InsurerDetailsText}>Negotiation Details{'\n'}</Text>
                      
                       {this.state.Negotiation && <View style={InsuredDashboardform}>
                       <Text>Rejection Remark From Claim Claim-Adjuster</Text>
                       
                       <TextField
                            ref={this.RejectionClaimRef}
                            value={data.RejectionClaim}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline = {true}
                            numberOfLines = {4}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextNegotiationRejection}
                            onSubmitEditing={this.onSubmitRejectionClaim}
                            returnKeyType='next'
                            label="Add remark of Rejection of Claim"
                            error={errors.RejectionClaim}
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurNegotiationRejection}
                            maxLength = {40}/>

                            <RaisedTextButton
                            onPress={()=>this.onSubmitAddRemark(token,userType)}
                            title="Add Remark"
                            color={turquoise}
                            titleColor={white}/>

                            <View style={InsuredDashboardform}>
                            <Text style={{color:'navy'}}>{this.state.claimadjusternegotiation}</ Text>
                            <Text style={{color:'navy'}}>{this.state.publicadjusternegotiation}</ Text>
                            <Text style={{color:'navy'}}>{this.state.negotiationvalue}{'\n'}</Text>
                            <Text style={{color:'navy'}}>{this.state.asperterm}{'\n'}</Text>
                            </View>
                            

                            <Text>Negotiation for Claim-Adjuster:</Text>
                            <Text>Negotiated 1:</Text>
                            <TextField
                            ref={this.ClaimNegotiationValueRef}
                            value={data.ClaimNegotiationValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextNegotiation}
                            onSubmitEditing={this.onSubmitClaimNegotiationValue}
                            returnKeyType='next'
                            label="Negotiation Value"
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurNegotiation}/>

                            <Text>As Per Term:</Text>
                            <TextField
                            ref={this.ClaimBaseValueRef}
                            value={data.ClaimBaseValue}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextNegotiation}
                            onSubmitEditing={this.onSubmitClaimBaseValue}
                            returnKeyType='next'
                            label="As Per Term"
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurNegotiation}/>

                            <Text>Negotiation for Public-Adjuster:</Text>
                            <Text>Negotiated 2:</Text>
                            <TextField
                            ref={this.PublicNegotiationValueRef}
                            value={data.PublicNegotiationValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextNegotiation}
                            onSubmitEditing={this.onSubmitPublicNegotiationValue}
                            returnKeyType='next'
                            label="Negotiation Value"
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurNegotiation}/>

                            <Text>As Per Term:</Text>
                            <TextField
                            ref={this.PublicBaseValueRef}
                            value={data.PublicBaseValue}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextNegotiation}
                            onSubmitEditing={this.onSubmitPublicBaseValue}
                            returnKeyType='next'
                            label="As Per Term"
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurNegotiation}/>


                            <RaisedTextButton style={AgreeNegButton}
                            onPress={()=>this.onSubmitAgree(token,userType)}
                            title="Agree" 
                            titleColor={white}/>
                            

                            <RaisedTextButton style={AgreeNegButton}
                            onPress={()=>this.onSubmitNegotiation(token,userType)}
                            title="Negotiation"
                            titleColor={white}/>

                            <View style={InsuredDashboardform}>
                            <Text>Approved Claim:</Text>
                            <TextField
                            ref={this.ApprovedClaimValueRef}
                            value={data.ApprovedClaimValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onSubmitEditing={this.onSubmitApprovedClaimValue}
                            returnKeyType='next'
                            label="Approved Claim Value"
                            tintColor={white}
                            textColor={white}/>

                            {this.state.payment && 
                            <RaisedTextButton
                            onPress={()=>this.onSubmitPayment(token,userType)}
                            title="Payment"
                            color={turquoise}
                            titleColor={white}/>
                            }
                                </View>
                      </View>
                       }
                       {this.state.Negotiation1 && <View style={InsuredDashboardformBlur}>
                       <Text>Rejection Remark From Claim Claim-Adjuster</Text>
                       
                       <TextField
                       ref={this.RejectionClaimRef}
                       value={data.RejectionClaim}
                       keyboardType='default'
                       autoCapitalize='none'
                       autoCorrect={false}
                       multiline = {true}
                       numberOfLines = {4}
                       enablesReturnKeyAutomatically={true}
                       onFocus={this.onFocus}
                       onChangeText={this.onChangeTextNegotiationRejection}
                       onSubmitEditing={this.onSubmitRejectionClaim}
                       returnKeyType='next'
                       label="Add remark of Rejection of Claim"
                       error={errors.RejectionClaim}
                       tintColor={white}
                       textColor={white}
                       onBlur={this.onBlurNegotiationRejection}
                       maxLength = {40}
                       editable={false}/>

                            <RaisedTextButton
                            onPress={()=>this.onSubmitAddRemark(token,userType)}
                            title="Add Remark"
                            color={turquoise}
                            titleColor={white}
                            disabled={true}/>

                            <View style={InsuredDashboardformBlur}>
                            <Text style={{color:'navy'}}>{this.state.claimadjusternegotiation}</ Text>
                            <Text style={{color:'navy'}}>{this.state.publicadjusternegotiation}</ Text>
                            <Text style={{color:'navy'}}>{this.state.negotiationvalue}{'\n'}</Text>
                            <Text style={{color:'navy'}}>{this.state.asperterm}{'\n'}</Text>
                            </View>
                            

                            <Text>Negotiation for Claim-Adjuster:</Text>
                            <Text>Negotiated 1:</Text>
                            <TextField
                            ref={this.ClaimNegotiationValueRef}
                            value={data.ClaimNegotiationValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextNegotiation}
                            onSubmitEditing={this.onSubmitClaimNegotiationValue}
                            returnKeyType='next'
                            label="Negotiation Value"
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurNegotiation}
                            editable={false}/>

                            <Text>As Per Term:</Text>
                            <TextField
                            ref={this.ClaimBaseValueRef}
                            value={data.ClaimBaseValue}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextNegotiation}
                            onSubmitEditing={this.onSubmitClaimBaseValue}
                            returnKeyType='next'
                            label="As Per Term"
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurNegotiation}
                            editable={false}/>

                            <Text>Negotiation for Public-Adjuster:</Text>
                            <Text>Negotiated 2:</Text>
                            <TextField
                            ref={this.PublicNegotiationValueRef}
                            value={data.PublicNegotiationValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextNegotiation}
                            onSubmitEditing={this.onSubmitPublicNegotiationValue}
                            returnKeyType='next'
                            label="Negotiation Value"
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurNegotiation}
                            editable={false}/>

                            <Text>As Per Term:</Text>
                            <TextField
                            ref={this.PublicBaseValueRef}
                            value={data.PublicBaseValue}
                            keyboardType='default'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeTextNegotiation}
                            onSubmitEditing={this.onSubmitPublicBaseValue}
                            returnKeyType='next'
                            label="As Per Term"
                            tintColor={white}
                            textColor={white}
                            onBlur={this.onBlurNegotiation}
                            editable={false}/>


                            <RaisedTextButton style={AgreeNegButton}
                            onPress={()=>this.onSubmitAgree(token,userType)}
                            title="Agree" 
                            titleColor={white}
                            disabled={true}/>
                            

                            <RaisedTextButton style={AgreeNegButton}
                            onPress={()=>this.onSubmitNegotiation(token,userType)}
                            title="Negotiation"
                            titleColor={white}
                            disabled={true}/>

                            <View style={InsuredDashboardformBlur}>
                            <Text>Approved Claim:</Text>
                            <TextField
                            ref={this.ApprovedClaimValueRef}
                            value={data.ApprovedClaimValue}
                            keyboardType='numeric'
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onSubmitEditing={this.onSubmitApprovedClaimValue}
                            returnKeyType='next'
                            label="Approved Claim Value"
                            tintColor={white}
                            textColor={white}
                            editable={false}/>

                            {this.state.payment && 
                            <RaisedTextButton
                            onPress={()=>this.onSubmitPayment(token,userType)}
                            title="Payment"
                            color={turquoise}
                            titleColor={white}/>
                            }
                                </View>
                      </View>
                       }
                    </View>
                      
                </ScrollView>
                {this.state.loading_blur && <View style={commonLoading}>
                    <ActivityIndicator size='large'/>
                </View>
}                        

            </KeyboardAvoidingView>
        );
    }
}