import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { themes } from 'assets/theme'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import FastImage from 'react-native-fast-image'
import { imgs } from 'assets/imgs'

interface SenderchatWrapperProps {
    msg?: string
}

export const RecieverchatWrapper = ({ msg }: SenderchatWrapperProps) => {
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
                <View style={styles.name}>
                    <Text style={styles.postSq}>
                        You
                    </Text>
                    <Text style={styles.postSq}>
                        12:00 PM
                    </Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // width: responsiveWidth(100),
        flexDirection: 'row-reverse',
        marginTop: responsiveHeight(2),
    },
    avatar: {
        height: 40,
        width: 40,
        alignSelf: 'center',
        backgroundColor: themes?.colors.lightBlue,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: themes?.colors.lightBlue,
    },
    msgbox: {
        backgroundColor: themes?.colors.lightBlue,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 10,
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

        // paddingH-20 paddingV-15
    },
    name: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    profile: {
        flexDirection: 'column-reverse',
        marginBottom: responsiveHeight(2.5),
        marginLeft: responsiveWidth(2.5),
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
    }
})
