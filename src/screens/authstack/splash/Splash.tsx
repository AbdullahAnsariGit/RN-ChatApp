import { SafeAreaView, View } from 'react-native';
import React, { useEffect } from 'react';
import authStyles from '../authStyles';
import FastImage from 'react-native-fast-image';
import { imgs } from 'assets/imgs';
import * as NavigationService from 'react-navigation-helpers';
import { SCREENS } from '@shared-constants';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const SplashScreen: React.FC = () => {
    const initialIconVal = useSharedValue(0);

    const animationFunc = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: initialIconVal.value },
                { rotateY: `${initialIconVal.value * (360 * 2)}deg` },
            ],
        };
    });


    useEffect(() => {
        initialIconVal.value = withTiming(1, { duration: 2000 });
        setTimeout(() => {
            NavigationService.push(SCREENS.LOGIN);
        }, 1500)
    }, []);

    return (
        <SafeAreaView>
            <View style={authStyles?.splash}>
                <Animated.View style={[authStyles.logoView, animationFunc]}>
                    <FastImage source={imgs?.Logo} style={authStyles.logo} resizeMode="contain" />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;
