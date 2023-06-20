import React, { useEffect } from 'react'
import { SafeAreaView, View, Alert } from 'react-native'
import { Form } from './Form'
import authStyles from '../authStyles'
import FastImage from 'react-native-fast-image'
import { imgs } from 'assets/imgs'
import { ScrollView } from 'react-native'
import { Text } from 'react-native'
import { SCREENS } from '@shared-constants'
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from '@freakycoder/react-native-bounceable'
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import LoadingWrapper from '@shared-components/loading-wrapper/loadingWrapper'


const Register: React.FC = () => {
    const [isShow, setIsShow] = React.useState<boolean>(false);

    const initialIconVal = useSharedValue(0)

    const userId: string | any = uuid.v4();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: initialIconVal.value },
                { translateX: initialIconVal.value },
                { rotate: `${initialIconVal.value * (360 * 2)}deg` },
            ]
        }
    })

    useEffect(() => {
        initialIconVal.value = withTiming(1, { duration: 2000 }), withSpring(1);
    }, []);

    const handleSubmit = (value: any) => {
        setIsShow(true)
        console.log('register', value)
        firestore().collection('Users')
            .doc(userId).set({
                name: value?.name,
                email: value?.email,
                password: value?.password,
                userId: userId
            }).then(() => {
                setIsShow(false)
                NavigationService.push(SCREENS.LOGIN)
            }).catch(() => {
                setIsShow(false)
            });
    }

    return (
        <>
            <LoadingWrapper show={isShow} name='Spinning Circles Loading Animation' source='https://assets5.lottiefiles.com/private_files/lf30_tcux3hw6.json' author='Abdullah' path={require('./../../appstack/chat/chatscreen/animation.json')} />

            <ScrollView >
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
                        <Text style={authStyles.bottomlinkText}>Already have an account? </Text>
                        <RNBounceable onPress={() => NavigationService.push(SCREENS.LOGIN)}>
                            <Text style={authStyles.bottomlinkTextNav}>Login</Text>
                        </RNBounceable>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Register

