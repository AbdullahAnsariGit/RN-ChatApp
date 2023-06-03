import { Pressable, StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
// import { Form } from './Form'
import { ScreenHeight, ScreenWidth } from '@freakycoder/react-native-helpers'
// import FastImage from 'react-native-fast-image'
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg'
import { bg } from 'assets'
import { TextInput } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay } from 'react-native-reanimated'
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";


const Login: React.FC = () => {

    //img posi
    const imagePosition = useSharedValue(1);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        //if image posi 0 so height minus, or if img posi 1 height will be zero
        const interpolation = interpolate(imagePosition.value, [0, 1], [-ScreenHeight / 1.6, 0])
        return {
            // for moving image to y axis with time condition based
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
        }
    })

    const buttonAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0])
        return {
            opacity: withTiming(imagePosition.value, { duration: 500 }),
            transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
        }
    })

    const closeButtonAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [0, 360])
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
            transform: [{ rotate: withTiming(interpolation + 'deg', { duration: 1000 }) }]
        }
    })

    const formAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, { duration: 800 })) : withTiming(0, { duration: 300 })
        }
    })



    // const handleSubmit = (values: any) => {
    //     console.log(values, 'lines 7')
    // }

    const login = () => {
        console.log('kjjj')
        imagePosition.value = 0
    }
    // const register = () => {
    //     console.log('kjjj')
    //     imagePosition.value = 1
    // }
    const handleClose = () => {
        console.log('jhjhhhhh')
        imagePosition.value = 1

    }
    return (
        <View style={styles.container}>
            <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
                <Svg height={ScreenHeight + 50} width={ScreenWidth} >
                    <ClipPath id="clipPathId">
                        <Ellipse cx={ScreenWidth / 2} rx={ScreenHeight} ry={ScreenHeight + 50} />
                    </ClipPath>
                    <Image href={bg} height={ScreenHeight + 100} width={ScreenWidth + 100} preserveAspectRatio='xMidYMid slice' clipPath='url(#clipPathId)' />
                </Svg>
                <Animated.View style={[styles.crossButtonContainer, closeButtonAnimatedStyle]}>
                    {/* <Text onPress={() => imagePosition.value = 1}>X</Text> */}
                    <RNBounceable onPress={() => imagePosition.value = 1}>
                        <Icon
                            name="caret-down"
                            type={IconType.FontAwesome5}
                            color={'#8b8e9f'}
                            size={30}
                        />
                    </RNBounceable>
                </Animated.View>
            </Animated.View>
            <View style={styles.buttonContainer}>
                <Animated.View style={buttonAnimatedStyle}>
                    <Pressable style={styles.button} onPress={() => login()}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
                        <TextInput placeholder='email' style={styles.textInput} />
                        <TextInput placeholder='password' style={styles.textInput} />
                        <TextInput placeholder='confirm password' style={styles.textInput} />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                </Animated.View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: '#8b8e9f',
        paddingVertical: ScreenHeight / 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        borderColor: '#ffffff',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    buttonText: {
        color: '#ffffff'
    },
    buttonContainer: {
        justifyContent: 'center',
        height: ScreenHeight / 2.3
    },
    textInput: {
        height: ScreenHeight / 15,
        borderColor: '#000000',
        borderWidth: 1,
        marginHorizontal: 20,
        marginVertical: 15
    },
    crossButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: -30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    formInputContainer: {
        marginBottom: 70,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
        justifyContent: 'center',
    },
    formcontainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})