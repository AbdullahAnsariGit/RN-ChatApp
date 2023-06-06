import { ImageBackground, SafeAreaView, View } from 'react-native'
import React from 'react'
import { Form } from './Form'
import authStyles from '../authStyles'
import FastImage from 'react-native-fast-image'
import { imgs } from 'assets/imgs'
import { ScrollView } from 'react-native'
import { Pressable } from 'react-native'
import { Text } from 'react-native'
import { SCREENS } from '@shared-constants'
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from '@freakycoder/react-native-bounceable'


const Register: React.FC = () => {
    const handleSubmit = () => {
        console.log('LOGIN')
    }
    return (
        <SafeAreaView>
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
                        <Text style={authStyles.bottomlinkText}>Already have an account? </Text>
                        <RNBounceable  onPress={() => NavigationService.push(SCREENS.LOGIN)}>
                            <Text style={authStyles.bottomlinkTextNav}>Login</Text>
                        </RNBounceable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register

