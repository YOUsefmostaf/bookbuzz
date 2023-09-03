import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  RegitserScreen,
  VerifyAccountScreen,
  ForgotScreen,
  VerifyPasswordScreen,
  ChangePasswordScreen,
} from 'screens';
import { AuthParamsList } from '../paramsList';
const AuthStack = createStackNavigator<AuthParamsList>();

export const AuthStackScreen = () => {
  const forFade = ({ current }: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forFade,
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={RegitserScreen} />
      <AuthStack.Screen name="Verification" component={VerifyAccountScreen} />
      <AuthStack.Screen name="ForgetPassword" component={ForgotScreen} />
      <AuthStack.Screen name="verifyPass" component={VerifyPasswordScreen} />
      <AuthStack.Screen name="newPass" component={ChangePasswordScreen} />
    </AuthStack.Navigator>
  );
};
