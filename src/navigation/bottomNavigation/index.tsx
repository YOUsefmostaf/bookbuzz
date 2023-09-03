import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabList} from '../paramsList';
import {Platform, View} from 'react-native';
import {HOMEICON, BOOKICON, CARTICON, ACCOUNT} from 'constants/icons';
import {CategoryNavigator} from './categoriesStack';
import {HomeNavigator} from './homeStack';
import {CartNavigator} from './cartStack';
import {height, width, wp} from 'theme';
import ProfileStack from './ProfileStack';

const Tabs = createBottomTabNavigator<BottomTabList>();
export const tabNavigatior = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: height * 0.05,
          backgroundColor: '#E6E6E6',
          borderRadius: height * 0.025,
          position: 'absolute',
          bottom: wp(5),
          paddingHorizontal: 5,
          marginHorizontal: width * 0.05,
          borderTopWidth: 0,
          alignItems: 'center',
        },
        unmountOnBlur: true,
        tabBarShowLabel: false,
        headerShown: false,

        tabBarIcon: ({focused}) => {
          if (route.name === 'Home' && focused) {
            return (
              <View
                style={{
                  top: Platform.OS === 'ios' ? wp(4) : 0,
                  alignItems: 'center',
                  height: height * 0.05,
                  justifyContent: 'center',
                }}>
                <HOMEICON />
                <View
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: '#FF0F39',
                    borderRadius: 90,
                    marginTop: 3,
                  }}
                />
              </View>
            );
          } else if (route.name === 'Home') {
            return (
              <HOMEICON
                style={{
                  top: Platform.OS === 'ios' ? wp(4) : 0,
                  alignItems: 'center',
                  height: height * 0.05,
                  justifyContent: 'center',
                }}
              />
            );
          }
          if (route.name === 'Categoires' && focused) {
            return (
              <View
                style={{
                  top: Platform.OS === 'ios' ? wp(4) : 0,
                  alignItems: 'center',
                  height: height * 0.05,
                  justifyContent: 'center',
                }}>
                <BOOKICON />
                <View
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: '#FF0F39',
                    borderRadius: 90,
                    marginTop: 3,
                  }}
                />
              </View>
            );
          } else if (route.name === 'Categoires') {
            return (
              <BOOKICON
                style={{
                  top: Platform.OS === 'ios' ? wp(4) : 0,
                  alignItems: 'center',
                  height: height * 0.05,
                  justifyContent: 'center',
                }}
              />
            );
          }
          if (route.name === 'Cart' && focused) {
            return (
              <View
                style={{
                  top: Platform.OS === 'ios' ? wp(4) : 0,
                  alignItems: 'center',
                  height: height * 0.05,
                  justifyContent: 'center',
                }}>
                <CARTICON />
                <View
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: '#FF0F39',
                    borderRadius: 90,
                    marginTop: 3,
                  }}
                />
              </View>
            );
          } else if (route.name === 'Cart') {
            return (
              <CARTICON
                style={{
                  top: Platform.OS === 'ios' ? wp(4) : 0,
                  alignItems: 'center',
                  height: height * 0.05,
                  justifyContent: 'center',
                }}
              />
            );
          }
          if (route.name === 'ProfileStack' && focused) {
            return (
              <View
                style={{
                  top: Platform.OS === 'ios' ? wp(4) : 0,
                  alignItems: 'center',
                  height: height * 0.05,
                  justifyContent: 'center',
                }}>
                <ACCOUNT />
                <View
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: '#FF0F39',
                    borderRadius: 90,
                    marginTop: 3,
                  }}
                />
              </View>
            );
          } else if (route.name === 'ProfileStack') {
            return (
              <ACCOUNT
                style={{
                  top: Platform.OS === 'ios' ? wp(4) : 0,
                  alignItems: 'center',
                  height: height * 0.05,
                  justifyContent: 'center',
                }}
              />
            );
          }
        },
      })}>
      <Tabs.Screen name="Home" component={HomeNavigator} />
      <Tabs.Screen name="Categoires" component={CategoryNavigator} />
      <Tabs.Screen name="Cart" component={CartNavigator} />
      <Tabs.Screen name="ProfileStack" component={ProfileStack} />
    </Tabs.Navigator>
  );
};
