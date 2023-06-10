import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { themes } from 'assets/theme'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import FastImage from 'react-native-fast-image'
import { imgs } from 'assets/imgs'

interface SenderchatWrapperProps {
    msg?: string;
    name?: string;
    time?:any;
}

export const SenderchatWrapper = ({ msg, name, time}: SenderchatWrapperProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View>
                    <FastImage resizeMode='cover' style={styles.avatar} source={imgs.avatar} />
                </View>
            </View>
            <View style={styles.dialogBox}>
                <View style={styles.msgbox}>
                    <Text style={styles.postDesp}>
                        {msg}
                    </Text>
                </View>
                <View style={styles.msgTime}>
                    <Text style={styles.postSq}>
                        {name}
                    </Text>
                    <Text style={styles.postSq}>
                       {time}
                    </Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // width: responsiveWidth(100),
        flexDirection: 'row',
        marginTop: responsiveHeight(2),
    },
    avatar: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        backgroundColor: themes?.colors.lightPink,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: themes?.colors.lightPink,
    },
    msgbox: {
        backgroundColor: themes?.colors.lightPink,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveWidth(3),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    profile: {
        flexDirection: 'column-reverse',
        marginBottom: responsiveHeight(2.5),
        marginRight: responsiveWidth(2.5),
    },
    postSq: {
        fontFamily: themes?.font?.light,
        color: themes?.colors?.black,
        fontSize: themes?.fontSize?.extraSmall
    },
    postDesp: {
        fontFamily: themes?.font?.regular,
        color: themes?.colors?.white,
        fontSize: themes?.fontSize?.small
    },
    dialogBox: {
        width: '70%'
    },
    msgTime: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
