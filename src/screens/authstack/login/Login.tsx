import React, { useEffect } from 'react'
import { View, ScrollView, Pressable, Text } from "react-native"
import { Form } from './Form'
import authStyles from '../authStyles'
import FastImage from 'react-native-fast-image'
import { imgs } from 'assets/imgs'
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from '@shared-constants'
import firestore from '@react-native-firebase/firestore';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Restart from 'react-native-restart';


const Login: React.FC = () => {
    const initialIconVal = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: initialIconVal.value },
                { translateX: initialIconVal.value },
                { rotate: `${initialIconVal.value * (360 * 2)}deg` },
            ]
        }
    })

    const handleRefresh = () => {
        Restart.Restart();
      };

    React.useEffect(() => {
        initialIconVal.value = withTiming(1, { duration: 2000 }), withSpring(1);
      
    }, []);

    const handleSubmit = (values: any) => {
        firestore()
            .collection('Users')
            // Filter results
            .where("email", '==', values.email)
            .get()
            .then(res => {
                console.log("🚀 ~ file: Login.tsx:40 ~ handleSubmit ~ res:", res?._docs[0]?._data)
                console.log("res", res?._docs[0]?._data.password)
                if (res?._docs[0]?._data.password == values.password) {
                    AsyncStorage.setItem(
                        'USERID',
                        JSON.stringify(res?._docs[0]?._data),
                    );
                }
            }).catch((err) => {
                console.log('user not found', err)
            });
        // NavigationService.push(SCREENS.REGISTER);
    }

    return (
        <ScrollView>
            <View style={authStyles?.auth}>
                <Animated.View style={[authStyles.logoView, animatedStyle]}>
                    <FastImage
                        source={imgs?.Logo}
                        style={authStyles.logo}
                        resizeMode="contain"
                    />
                </Animated.View>
                <Form
                    submit={handleSubmit}
                // handleForgot={handleForgot}
                // onLoginPress={() => navigation.navigate('login')}
                />
                <View style={authStyles.bottomlink}>
                    <Text style={authStyles.bottomlinkText}>Don't have an account? </Text>
                    <Pressable onPress={() => NavigationService.push(SCREENS.REGISTER)}>
                        <Text style={authStyles.bottomlinkTextNav}>Register Now</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login

