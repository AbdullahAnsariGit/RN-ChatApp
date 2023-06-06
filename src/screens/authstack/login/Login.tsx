import { SafeAreaView, View } from 'react-native'
import React from 'react'
import { Form } from './Form'
import authStyles from '../authStyles'
import FastImage from 'react-native-fast-image'
import { imgs } from 'assets/imgs'
import { ScrollView } from 'react-native'
import { Pressable } from 'react-native'
import { Text } from 'react-native'
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from '@shared-constants'




const Login: React.FC = () => {
    const handleSubmit = (values:any) => {
console.log(values, 'login')
        // NavigationService.push(SCREENS.REGISTER);
    }
    return (
        <SafeAreaView style={authStyles.safeAreaView}>
            <ScrollView>
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
                        <Text style={authStyles.bottomlinkText}>Don't have an account? </Text>
                        <Pressable onPress={() => NavigationService.push(SCREENS.REGISTER)}>
                            <Text style={authStyles.bottomlinkTextNav}>Register Now</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login

