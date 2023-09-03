import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {OrderNavigator} from './ordersStack';
import {DrawerParamsList} from '../paramsList';
import {LoyaltyScreen} from 'screens/drawer/loyaltyScreen/loyaltyScreen';
import {DrawerContent} from './customDrawer';
import {tabNavigatior} from '../bottomNavigation';
import {styles} from './customDrawer/style';
import {useWindowDimensions} from 'react-native';
import {SettingsNavigtor} from './SettingsNavigator';

const Drawer = createDrawerNavigator<DrawerParamsList>();
export const DrawerNav = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      initialRouteName="bottomScreens"
      screenOptions={{
        overlayColor: '0',
        unmountOnBlur: true,
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        drawerStyle: styles.drawerDiv,
        drawerPosition: 'left',
        headerShown: false,
      }}
      backBehavior="none"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="orders" component={OrderNavigator} />
      <Drawer.Screen name="bottomScreens" component={tabNavigatior} />
      <Drawer.Screen name="SettingsS" component={SettingsNavigtor} />
      <Drawer.Screen name="loyalty" component={LoyaltyScreen} />
    </Drawer.Navigator>
  );
};
