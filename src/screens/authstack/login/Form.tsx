import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { ValidationSchema } from './Validation';
// , FormikValues, FormikHelpers 


interface FormValues {
    email?: string;
    submit?: any;
    error?: string;
}

export const Form = ({ submit }: FormValues): React.JSX.Element => {
    const initialValues: FormValues = { email: '', submit };


    const handleSubmit = (values: FormValues) => { submit(values) }

    return (
        <Formik<FormValues>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
        >
            {(formikProps: FormikProps<FormValues>) => (
                <View>
                    <TextInput
                        onChangeText={formikProps.handleChange('email')}
                        onBlur={formikProps.handleBlur('email')}
                        value={formikProps.values.email}
                    />
                    {formikProps.touched.email && formikProps.errors.email && (
                        <Text>{formikProps.errors.email}</Text>
                    )}
                    <Button onPress={formikProps.handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    );
};
