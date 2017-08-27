import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import colors from '../../src/utils/colors';

const { turquoise,
        white, 
        emerald,
        clouds
     } = colors;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: turquoise,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    wrapper: {
        backgroundColor: turquoise,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
    },

    titleWrapper: {
        justifyContent: 'center',
        flex: 1
    },

    title: {
        color: white,
        fontSize: 35,
        fontWeight: 'bold',
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

    loginscreenInputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
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
        paddingTop: 20,
    },

    loginscreenCreateAccountText: {
        color: clouds
    },

    loginscreenCreateAccountLinkText: {
        color: white,
        marginLeft: 5,
    }
});