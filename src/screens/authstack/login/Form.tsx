import React, { useState, useRef } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Formik, FormikProps } from 'formik';
// FormikValues
import { ValidationSchema } from './Validation';
import { InputWrapper } from '@shared-components/index';
import authStyles from '../authStyles';
import { themes } from 'assets/theme';
import { icons } from 'assets/imgs';
import globalStyles from 'assets/stylings/globalStyles';
import LinearGradient from 'react-native-linear-gradient'

interface FormValues {
    email?: string;
    password?: string;
}

interface FormProps {
    submit: (values: FormValues) => void;
}

export const Form: React.FC<FormProps> = ({ submit }: FormProps): React.ReactElement => {
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPass, setIsFocusedPass] = useState(false);
    const [secure, setSecure] = useState(false);

    const form = useRef<FormikProps<FormValues>>(null);
    const password = useRef<TextInput>(null);
    const email = useRef<TextInput>(null);

    const toggleSecure = (): void => {
        setSecure(!secure);
    };

    const initialValues: FormValues = {
        email: '',
        password: '',
    };

    const handleSubmit = (values: FormValues): void => {
        submit(values);
    };

    return (
        <Formik<FormValues>
            innerRef={form}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
        >
            {(formikProps: FormikProps<FormValues>): React.ReactElement => (
                <View>
                    <View style={authStyles.card}>
                        <View >
                            <Text style={{fontFamily:themes?.font?.bold, fontSize:themes?.fontSize?.medium, color:themes?.colors?.black}}>Login</Text>
                            <InputWrapper
                                handleFocus={() => {
                                    setIsFocusedEmail(true);
                                }}
                                handleBlur={() => {
                                    setIsFocusedEmail(false);
                                }}
                                ref={email}
                                inputLabel='Email'
                                placeholder='email@example.com'
                                placeholderTextColor={themes?.colors?.grey}
                                mode={'outlined'}
                                multiLine={false}
                                numberOfLines={1}
                                icon={icons?.Email}
                                iconColor={isFocusedEmail ? themes?.colors?.darkPink : themes?.colors?.grey}
                                outlineColor={themes?.colors?.grey}
                                activeOutlineColor={themes.colors.lightBlue}
                                value={formikProps.values.email}
                                onChangeText={formikProps.handleChange('email')}
                                error={formikProps.errors?.email}
                            />
                            <InputWrapper
                                ref={password}
                                handleFocus={() => {
                                    setIsFocusedPass(true);
                                }}
                                handleBlur={() => {
                                    setIsFocusedPass(false);
                                }}
                                secureTextEntry={!secure}
                                inputLabel='Password'
                                placeholder='*********** '
                                placeholderTextColor={themes?.colors?.grey}
                                mode={'outlined'}
                                multiLine={false}
                                activeOutlineColor={themes.colors.lightBlue}
                                numberOfLines={1}
                                icon={icons?.Lock}
                                iconColor={isFocusedPass ? themes?.colors?.darkPink : themes?.colors?.grey}
                                outlineColor={themes?.colors?.grey}
                                toggleSecure={toggleSecure}
                                supportPassword={true}
                                value={formikProps.values.password}
                                onChangeText={formikProps.handleChange('password')}
                                error={formikProps.errors?.password}
                            />
                            {/* <View style={authStyles.forgotLink}>
                                <Pressable onPress={handleForgot}>
                                    <Text style={authStyles.forgotLinkText}>Forgot Password?</Text>
                                </Pressable>
                            </View> */}
                        </View>
                        <Pressable onPress={formikProps.handleSubmit} >
                            <LinearGradient colors={['#0493c8', '#1c66b5']} style={globalStyles.button}>
                                <Text style={globalStyles?.buttonText}>Login</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                </View>
            )}
        </Formik>
    );
};
