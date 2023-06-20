import appStyles from '@screens/appstack/appStyles';
import LottieView from 'lottie-react-native';
import React, { Fragment } from 'react';
import { View } from 'react-native';


export interface LoadingWrapperProps {
    name: string;
    source: string;
    author: string;
    path: string;
    show: boolean;
}
export default function LoadingWrapper({ name, source, author, path, show }: LoadingWrapperProps): JSX.Element {
    return (
        <Fragment>
            {show && <View style={appStyles.loaderContainer}>
                <View style={{ height: 200, width: 200, alignSelf: 'center' }}>
                    <LottieView
                        source={path}
                        autoPlay
                        loop={true}
                    />
                </View>
            </View>}
        </Fragment>
    )
}