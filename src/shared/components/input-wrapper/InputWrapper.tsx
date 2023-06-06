import React, { memo, Ref } from "react";
import { StyleSheet, View, Text } from "react-native";
// import * as NavigationService from "react-navigation-helpers";
// import createStyles from "./inputStyles";
import { TextInput } from 'react-native-paper';
import { forwardRef } from "react";
// import { SCREENS } from "@shared-constants";
// import fontsSize from '@font-size'
// import Text from "@shared-components/text-wrapper/TextWrapper";
import { themes } from "assets/theme";
import globalStyles from "assets/stylings/globalStyles";
import { icons } from "assets/imgs";
// import { Text } from "react-native-svg";
interface InputWrapperProps {
    ref: Ref<any>;
    inputContainerStyle?: any;
    inputLabel?: string;
    type?: string;
    onPress?: () => void;
    textStyle?: any;
    disabled?: boolean;
    inputErrorStyle?: any;
    error?: string;
    style?: any;
    value?: string;
    countryViewLoading?: boolean;
    placeholder?: string;
    secureTextEntry?: boolean;
    placeholderTextColor?: string;
    mode?: "flat" | "outlined" | undefined;
    multiLine?: boolean;
    numberOfLines?: number;
    icon?: string;
    iconColor?: string;
    outlineColor?: string;
    bgColor?: string;
    toggleSecure?: () => void;
    activeOutlineColor?: string;
    onChangeText?: (text: string) => void;
    supportPassword?: boolean;
    handleFocus?: () => void;
    handleBlur?: () => void;
}

const InputWrapper: React.FC<InputWrapperProps> = forwardRef((props, ref: React.ForwardedRef<any>) => {
    const {
        inputContainerStyle,
        inputLabel,
        // type,
        // onPress,
        // textStyle,
        // disabled,
        inputErrorStyle,
        error,
        // style,
        value,
        // countryViewLoading = false,
        placeholder,
        secureTextEntry,
        placeholderTextColor,
        mode,
        multiLine,
        numberOfLines,
        icon,
        iconColor,
        outlineColor,
        bgColor,
        toggleSecure,
        activeOutlineColor,
        onChangeText,
        supportPassword,
        handleFocus,
        handleBlur,
    } = props;


    const renderInputView = () => {
        return (
            <TextInput
                ref={ref}
                onFocus={handleFocus}
                onBlur={handleBlur}
                theme={{
                    colors: {
                        primary: 'red', // change the color of the input text when focused
                    },
                }}
                value={value}
                label={inputLabel}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                mode={mode}
                multiline={multiLine}
                numberOfLines={numberOfLines}
                onChangeText={onChangeText}
                left={
                    icon && (
                        <TextInput.Icon
                            icon={icon}
                            iconColor={iconColor}
                            style={styles.leftIcon}
                            size={themes?.fontSize?.large}
                        />
                    )
                }

                activeOutlineColor={activeOutlineColor}
                outlineColor={outlineColor}
                outlineStyle={{ borderRadius: 10 }}
                style={[styles.inputField, { backgroundColor: bgColor ? themes.colors.flashWhite : themes.colors.white }]}
                secureTextEntry={secureTextEntry}
                right={
                    supportPassword && (
                        <TextInput.Icon
                            icon={secureTextEntry ? icons.CutEye : icons.Eye}
                            iconColor={themes.colors.grey}
                            onPress={toggleSecure}
                            size={themes?.fontSize?.large}
                        // style={styles.rightIcon}
                        />
                    )
                }
            />
        );
    };

    const renderErrorView = () => {
        return (
            <Text style={{ ...globalStyles.errorTextStyle, ...inputErrorStyle }}>
                {error}
            </Text>
        );
    };

    return (
        <View style={{ ...globalStyles.inputContainer, ...inputContainerStyle, }}>
            {renderInputView()}
            {props.error && renderErrorView()}
        </View>
    );
});

export default memo(InputWrapper);

const styles = StyleSheet.create({
    leftIcon: {
        borderRightWidth: 1,
        borderRadius: 0,
        borderColor: themes.colors.grey,
        paddingRight: 8,
    },

    inputField: {
        marginTop: 5,
    }
})