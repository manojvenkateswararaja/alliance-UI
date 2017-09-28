import {StyleSheet} from 'react-native';
import {Constants} from 'expo';
import {Dimensions} from 'react-native';
import colors from '../../src/utils/colors';

const {turquoise, white, emerald, clouds, nephritis,red} = colors;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: turquoise,
        alignItems: 'center',
        justifyContent: 'center'
    },

    wrapper: {
        backgroundColor: turquoise,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight
    },

    titleWrapper: {
        justifyContent: 'center',
        flex: 1
    },

    title: {
        color: white,
        fontSize: 35,
        fontWeight: 'bold'
    },

    subtitle: {
        color: white,
        fontWeight: 'normal'
    },

    subtitleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },

    splashscreenLoading: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },

    splashscreenLoadingWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },

    loginscreenContainer: {
        flex: 1,
        backgroundColor: emerald
    },

    loginscreenLogoContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    loginscreenLogo: {
        width: 100,
        height: 100
    },

    loginTitle: {
        color: white,
        textAlign: 'center',
        opacity: 0.9,
        marginTop: 10,
        width: 160
    },
    loginTitle1:{
        color: white,
        textAlign: 'center',
        opacity: 0.9,
        marginTop: 5,
        width: 350
    },

    loginscreenInputContainer: {
        marginHorizontal: 4,
        marginVertical: 30,
        paddingHorizontal: 8
    },
   
    loginscreenLoginContainer: {
        paddingTop: 20
    },

    loginscreenCreateAccountContainer: {
        flex: 1
    },

    loginscreenCreateAccountWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 20
    },

    loginscreenCreateAccountText: {
        color: clouds
    },

    loginscreenCreateAccountLinkText: {
        color: white,
        marginLeft: 5
    },

    container1: {
        color: white
    },
  
    commonLoading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    },

    scrollContainer: {
        flex: 1,
        backgroundColor: emerald
    },

    scrollViewContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2
    },

    scrollBox: {
        margin: 2,
        width: Dimensions
            .get('window')
            .width / 2 - 6,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: nephritis
    },
    scrollBoxLogout: {
        margin: 2,
        width: Dimensions
            .get('window')
            .width / 1,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: nephritis
    },
    scrollBoxText: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    scrollImage: {
        margin: 2,
        width: Dimensions
            .get('window')
            .width / 1,
        height: 310
    },

    homeImageLayout: {
        height: 310,
        width: Dimensions
            .get('window')
            .width / 1,
        padding: 2
    },
    PaymentImageLayout: {
        height: 310,
        width: Dimensions
            .get('window')
            .width / 1,
        padding: 2
    },

    homeScrollImageContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    homeScrollImageLogo: {
        width: 50,
        height: 50
    },
    containerDate: {
        width:335
    },
    FetchpolicyContainer:{
        padding: 10,
        margin: 2,
        borderColor: '#4CAF50',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    },
    PolicyQuotescontainer:{
        padding: 10,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    },
    SavedPoliciesContainer:{
        padding: 10,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    },
    InsuredDashboardform:{
        padding: 6,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#95a5a6'
    },
    NotificationsText:{
        color:red,
        fontSize:25
    },
    InsurerDetailsText:{
        color:red,
        fontSize:20
    },
  
});