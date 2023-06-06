import { themes } from 'assets/theme';
import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

export default StyleSheet.create({

    container: {
        flexGrow: 1,
        paddingHorizontal: responsiveScreenWidth(6)
    },
    safeAreaView:{backgroundColor:"#ffffff", flex:1},
    splash: {
        backgroundColor: themes?.colors?.white,
        justifyContent:'center',
        alignItems:'center',
        height:responsiveHeight(100)
    },
    header: {
        alignItems: 'center',
        paddingVertical: 50
    },
    headerLogo: {
        width: 200,
        height: 53,
    },

    card: {
        gap: responsiveHeight(1.8)

    },
    cardHeader: {
        // marginBottom: 30
    },
    cardHeaderTitle: {
        fontSize: 28,
        fontFamily: themes.font.medium,
        color: themes.colors.fontColor,
        marginBottom: 10
    },
    auth: {
        paddingHorizontal: responsiveScreenWidth(4),
    },




    orContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 20
    },
    orContainerText: {
        fontSize: 20,
        fontFamily: themes.font.regular,
        color: themes.colors.fontColor,
    },

    bottomButton: {
        marginBottom: 20
    },



    otpContainer: {
        alignItems: 'stretch',
        marginBottom: 30,

    },

    otpInputView: {
        height: 62,
        // width: '100%',
        marginBottom: 10,
        alignItems: 'stretch',
        // backgroundColor: 'red'
    },



    codeInputHighlightStyle: {
        // borderColor: themes.colors.secondary,
        borderWidth: 2,
        color: themes.colors.fontColor
    },

    linkButtonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%'
    },

    linkButtonWithIcon: {
        flexDirection: 'row',
    },
    linkButtonText: {
        fontSize: 14,
        // color: themes.colors.lightGray,
        fontFamily: themes.font.regular,
        marginRight: 5,
    },
    linkButtonOtherText: {
        color: themes.colors.fontColor,
        fontFamily: themes.font.medium,
    },


    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(124, 128, 97, 0.7)',
        paddingTop: 200,
        paddingHorizontal: 20
    },
    modalInnerContainer: {
        flex: 1,
        backgroundColor: themes.colors.tertiary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    logo: {
        height: responsiveHeight(35),
        width: responsiveScreenWidth(55)
    },
    logoView: {
        paddingTop: responsiveScreenHeight(6),
        paddingBottom: responsiveScreenHeight(1.5),
        alignItems:'center'
    },
    bottomlink: {
        flexDirection: 'row',
        // marginTop: responsiveScreenHeight(18),
        marginVertical: responsiveScreenHeight(2),

        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomlinkText: {
        color: themes.colors?.black
    },
    bottomlinkTextNav: {
        color: themes.colors?.black,
        fontSize: themes?.fontSize?.small,
        fontFamily: themes?.font?.boldItalic,
        textDecorationLine: 'underline'
    },
    forgotLink: {
        paddingVertical: responsiveScreenHeight(0.9)
    },
    forgotLinkText: {
        color: themes.colors?.black,
        fontSize: themes?.fontSize?.small,
        fontFamily: themes?.font?.bold,
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    bottomlinkSignup: {
        flexDirection: 'row',
        marginVertical: responsiveScreenHeight(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupCard: {
        marginBottom: 15
    },
    imagesContainer: {
        position: 'relative',
        // backgroundColor:'red'
    },
    uploadProImg: {
        height: '100%',
        width: '100%',
    },
    uploadIcon: {
        borderWidth: 1,
        borderColor: themes.colors.white,
        borderRadius: 50,
        position: 'absolute',
        bottom: -6,
        right: 0,
        left: 18,
        backgroundColor: themes?.colors?.red
    },
    uploadIconImg: {
        height: '50%',
        width: '50%',
    },
    heading: {
        color: themes.colors?.black,
        fontSize: themes?.fontSize?.regular,
        fontFamily: themes?.font?.bold,
    },
    bottomBtn: {
        paddingVertical: 2,
    },
    businessProfile: {
        borderWidth: 2,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: themes?.colors?.pink
    }
});
