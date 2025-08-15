import Input from '@/components/Input';
import { ThemedText } from '@/components/ThemedText';
import { SignUpFormValues } from '@/types';
import { Link, router } from 'expo-router';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, Checkbox, HelperText, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email Address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords don't match")
    .required('Password confirmation is required'),
  terms: Yup.boolean().oneOf([true], 'Terms and condition must be checked'),
});

export default function SignUpScreen() {
  const [open, setOpen] = useState(false);
  const onSubmit = async (values: FormikValues, { resetForm }: FormikHelpers<SignUpFormValues>) => {
    try {
      resetForm();
      router.replace('/(auth)/login');
      Alert.alert('success', 'Sign up successfully!');
    } catch (e) {
      console.error(e);
      return Alert.alert('Error', 'Faild to login');
    }
  };
  return (
    <SafeAreaView className="bg-background flex-1 px-5 py-14">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '', terms: false }}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View className="flex flex-col justify-between gap-4">
                <View>
                  <ThemedText type="title" className="text-primary">
                    Create account
                  </ThemedText>
                  <ThemedText type="subtitle" className="text-secondary">
                    Create an account
                  </ThemedText>
                </View>

                <View className="gap-2">
                  <ThemedText>Full Name</ThemedText>
                  <Input
                    placeholder="John Doe"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <HelperText type="error" visible={true}>
                      {errors.name}
                    </HelperText>
                  )}
                </View>

                <View className="gap-2">
                  <ThemedText>Email Address</ThemedText>
                  <Input
                    placeholder="name@example.com"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <HelperText type="error" visible={true}>
                      {errors.email}
                    </HelperText>
                  )}
                </View>

                <View className="gap-2">
                  <ThemedText>Password</ThemedText>
                  <Input
                    placeholder="Enter your password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={!open}
                    right={
                      <TextInput.Icon
                        icon={open ? 'eye' : 'eye-off'}
                        onPress={() => setOpen(!open)}
                      />
                    }
                  />
                  {touched.password && errors.password && (
                    <HelperText type="error" visible={true}>
                      {errors.password}
                    </HelperText>
                  )}
                </View>

                <View className="gap-2">
                  <ThemedText>Comfirm Password</ThemedText>
                  <Input
                    placeholder="Enter your password confirmation"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry={!open}
                    right={
                      <TextInput.Icon
                        icon={open ? 'eye' : 'eye-off'}
                        onPress={() => setOpen(!open)}
                      />
                    }
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <HelperText type="error" visible={true}>
                      {errors.confirmPassword}
                    </HelperText>
                  )}
                </View>

                <View className="gap-2">
                  <View className="flex flex-row items-center gap-2">
                    <Checkbox
                      status={values.terms ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setFieldValue('terms', !values.terms);
                      }}
                    />
                    <ThemedText>Agree with terms and condition</ThemedText>
                  </View>
                  {touched.terms && errors.terms && (
                    <HelperText type="error" visible={true}>
                      {errors.terms}
                    </HelperText>
                  )}
                </View>

                <Button
                  mode="contained"
                  onPress={(e) => handleSubmit()}
                  className="font-inter rounded-sm bg-green-50 px-3 py-2"
                  buttonColor="#868B8E"
                  disabled={errors.email != null || errors.password != null}>
                  Sign Up
                </Button>

                <View>
                  <ThemedText className="text-secondary font-inter text-center">
                    Already have an account?{' '}
                    <Link href={'/(auth)/login'} className="text-secondary">
                      Login
                    </Link>
                  </ThemedText>
                </View>
              </View>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
