import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import RNBounceable from '@freakycoder/react-native-bounceable'
import { themes } from 'assets/theme'



interface ChatlistWrapperProps {
    imgs?: any,
    onPress?: any
}
const ChatlistWrapper = ({ imgs, onPress }: ChatlistWrapperProps) => {
    return (
        <RNBounceable
            onPress={onPress}
            style={styles.View}
        >
            <View style={styles.container}>
                <FastImage source={imgs} style={styles.img} />
                <View>
                    <Text style={styles?.postHeading}>
                        Alex
                    </Text>
                    <Text style={styles?.postDesp} numberOfLines={1} >
                        alex alex alex laex alexchudid alex alex
                    </Text>
                </View>
            </View>
            <View>
                <View style={styles.notificationView} >
                    <Text style={styles.postNoti}>
                        1
                    </Text>
                </View>
            </View>
        </RNBounceable>
    )
}

export default React.memo(ChatlistWrapper)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        flex: 1
    },
    img: {
        height: responsiveWidth(10),
        width: responsiveWidth(10),
        resizeMode: 'contain',
    },
    View: {
        backgroundColor: themes?.colors?.white,
        borderRadius: 10,
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    notificationView: {
        backgroundColor: themes?.colors?.lightBlue,
        borderRadius: 100,
        width: responsiveFontSize(2.2),
        height: responsiveFontSize(2.2),
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2.5,
    },

    postHeading: {
        fontFamily: themes?.font?.semiBold,
        color: themes?.colors?.lightBlue,
        fontSize: themes?.fontSize?.small,
    },
    postDesp: {
        fontFamily: themes?.font?.regular,
        color: themes?.colors?.fontBlack,
        fontSize: themes?.fontSize?.small,
        width: '90%',
    },
    postNoti: {
        fontFamily: themes?.font?.bold,
        color: themes?.colors?.white,
        fontSize: themes?.fontSize?.tiny,
    }
})
