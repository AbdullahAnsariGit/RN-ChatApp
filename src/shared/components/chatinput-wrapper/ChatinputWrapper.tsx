import {
    StyleSheet,
    TouchableOpacity,
    TextInput,
    View,
    Image
} from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import FastImage from 'react-native-fast-image'
import { icons } from 'assets/imgs'
import { themes } from 'assets/theme'
const ChatinputWrapper = () => {
    return (
        <View style={styles.maincontainer} >
            <TouchableOpacity style={styles.attachment}>
                <Image source={icons?.pin} style={styles.pin} resizeMode='contain'/>
            </TouchableOpacity>
            <TextInput
                placeholder='Write here...'
                placeholderTextColor={themes?.colors?.grey}
                style={styles.input}
            />
            <TouchableOpacity style={styles.send}>
                <FastImage source={icons?.send} style={styles.sndicon} />
            </TouchableOpacity>
        </View>
    )
}

export default ChatinputWrapper

const styles = StyleSheet.create({
    maincontainer: {
        paddingVertical: responsiveHeight(1),
        backgroundColor: themes?.colors?.flashWhite,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal:responsiveWidth(5)
    },
    attachment: {
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,

        borderRightWidth: 1,
        borderColor: themes?.colors?.grey,
    },
    pin: {
        height: responsiveWidth(5),
        width: responsiveWidth(5),
        tintColor:themes?.colors?.lightBlue
    },
    send: {
        backgroundColor: themes?.colors?.lightBlue,
        padding: 8,
        borderRadius: 5,
        elevation: 2,
    },
    sndicon: {
        height: responsiveWidth(5),
        width: responsiveWidth(5),
    },
    input: {
        width: '74%',
    },
})
