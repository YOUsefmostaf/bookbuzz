import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AccountCompleteScreen,
  IntrestScreen,
  LangScreen,
  WritersScreen,
} from 'screens';
import {PerfSelectParamsList} from '../paramsList';

const PerfStack = createStackNavigator<PerfSelectParamsList>();

export const PerfStackScreen = () => {
  const forFade = ({current}: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <PerfStack.Navigator
      initialRouteName="RegisterComplete"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forFade,
      }}>
      <PerfStack.Screen name="PerfSelect" component={IntrestScreen} />
      <PerfStack.Screen name="LangSelect" component={LangScreen} />
      <PerfStack.Screen name="authorSelect" component={WritersScreen} />
      <PerfStack.Screen
        name="RegisterComplete"
        component={AccountCompleteScreen}
      />
    </PerfStack.Navigator>
  );
};
