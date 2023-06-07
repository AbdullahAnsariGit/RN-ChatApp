import { SafeAreaView, View, Alert } from 'react-native'
import React from 'react'
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


const Register: React.FC = () => {
    const userId: string | any = uuid.v4();
    console.log("🚀 ~ file: Register.tsx:18 ~ userId:", userId)
    const handleSubmit = (value: any) => {
        console.log('register', value)
        firestore().collection('Users')
            .doc(userId).set({
                name: value?.name,
                email: value?.email,
                password: value?.password,
                userId: userId
            }).then(() => {
                console.log('User added!');
                Alert.alert('User added uccessfully')
            }).catch(err => {
                console.log(err, 'error-register')
                Alert.alert('User added unsuccessfully')
            });
    }
    return (
        <SafeAreaView style={authStyles.safeAreaView}>
            <ScrollView >
                <View style={authStyles?.auth}>
                    <View style={authStyles.logoView}>
                        <FastImage
                            source={imgs?.Logo}
                            style={authStyles.logo}
                            resizeMode="contain"
                        />
                    </View>
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
        </SafeAreaView>
    )
}

export default Register

