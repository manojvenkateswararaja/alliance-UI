import { StyleSheet } from 'react-native';
import colors from '../../src/utils/colors';

const { turquoise, white } = colors;

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
        alignItems: 'center'
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
    }
});