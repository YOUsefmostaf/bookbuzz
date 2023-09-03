import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Aboutus from 'screens/drawer/Settings/Aboutus';
import Terms from 'screens/drawer/Settings/Terms';
const SettingNavigtor = createStackNavigator();

export const SettingsNavigtor: React.FC = () => {
  return (
    <SettingNavigtor.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}>
      <SettingNavigtor.Screen name="Aboutus" component={Aboutus} />
      <SettingNavigtor.Screen name="Terms" component={Terms} />
    </SettingNavigtor.Navigator>
  );
};
