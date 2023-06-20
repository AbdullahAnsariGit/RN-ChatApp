import { themes } from 'assets/theme';
import { StyleSheet } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: responsiveScreenWidth(6)
    },
    header: {
        height: responsiveHeight(6),
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveScreenWidth(4)
    },
    headerText: {
        textAlign: 'center',
        fontFamily: themes?.font?.bold,
        color: themes?.colors?.black,
        fontSize: themes?.fontSize?.medium
    },
    headerText1: {
        textAlign: 'center',
        // width:'100%',
        fontFamily: themes?.font?.bold,
        color: themes?.colors?.black,
        fontSize: themes?.fontSize?.medium
    },
    chatlistContainer: {
        height: responsiveHeight(94),
    },
    back: {
        height: responsiveFontSize(2.2),
        width: responsiveFontSize(2.2),
    },
    back1: {
        height: responsiveFontSize(2.3),
        width: responsiveFontSize(2.3),
    },
    loaderContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:99
    }
});
