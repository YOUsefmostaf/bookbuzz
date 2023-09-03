import * as React from 'react';
import {ProfileProps} from '../paramsList';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileScreen} from 'screens/bottomTab/profile/profile';
import {EditProfile} from 'screens/bottomTab/profile/EditProfile';
import {EditPasswordScreen} from 'screens/bottomTab/profile/EditPassword';
import {WhishList} from 'screens/bottomTab/profile/Wishlist';

const ProfileNavigator = createStackNavigator();

const ProfileStack: React.FC<ProfileProps> = () => {
  return (
    <ProfileNavigator.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <ProfileNavigator.Screen component={ProfileScreen} name="Profile" />
      <ProfileNavigator.Screen component={EditProfile} name="EditProfile" />
      <ProfileNavigator.Screen
        name="EditPassword"
        component={EditPasswordScreen}
      />
      <ProfileNavigator.Screen name="whishlist" component={WhishList} />
    </ProfileNavigator.Navigator>
  );
};

export default ProfileStack;
