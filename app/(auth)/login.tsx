import Input from '@/components/Input';
import { ThemedText } from '@/components/ThemedText';
import { Link, router } from 'expo-router';
import { Formik, FormikValues } from 'formik';
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
import { Button, HelperText, TextInput } from 'react-native-paper';
import * as Yup from 'yup';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});

export default function LoginScreen() {
  const [open, setOpen] = useState(false);
  const onSubmit = async (values: FormikValues) => {
    try {
      Alert.alert('success', 'login successfully!');
      router.replace('/(tabs)');
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
            initialValues={{ email: '', password: '' }}
            validationSchema={SigninSchema}
            onSubmit={onSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View className="flex flex-col justify-between gap-4">
                <View>
                  <ThemedText type="title" className="text-primary">
                    Welcome Back!
                  </ThemedText>
                  <ThemedText type="subtitle" className="text-secondary">
                    Enter login details
                  </ThemedText>
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

                <Button
                  mode="contained"
                  onPress={(e) => handleSubmit()}
                  className="font-inter rounded-sm bg-green-50 px-3 py-2"
                  buttonColor="#868B8E"
                  disabled={errors.email != null || errors.password != null}>
                  Login
                </Button>

                <View className="gap-2">
                  <Link href={'/login'} className="text-secondary font-inter text-right">
                    Forgot Password?
                  </Link>
                  <ThemedText className="text-secondary font-inter text-center">
                    Don’t have an account?{' '}
                    <Link href={'/(auth)/sign-up'} className="text-secondary">
                      Sign Up
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
