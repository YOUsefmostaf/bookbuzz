import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackScreen} from '../authNavigatior';
import {PerfStackScreen} from '../perfNavigation';
import {DrawerNav} from '../drawerNav/drawerNavgatior';
import {
  selectAuthentication,
  selectIsComplete,
  selectisFisnh,
} from 'store/auth';
import {useSelector} from 'react-redux';
const RootStack = createStackNavigator();

export const RootNavigator: React.FC = () => {
  const forFade = ({current}: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  const isAuth = useSelector(selectAuthentication);
  const isComplete = useSelector(selectIsComplete);
  const isFisish = useSelector(selectisFisnh);
  return (
    <RootStack.Navigator
      initialRouteName="Auth"
      screenOptions={{cardStyleInterpolator: forFade}}>
      {/* {!isAuth && !isComplete && !isFisish && (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
      )}
      {!isComplete && isAuth ? (
        <RootStack.Screen
          name="Perf"
          component={PerfStackScreen}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="App"
          component={DrawerNav}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
      )} */}
      {!isAuth && (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: true,
            headerShown: false,
          }}
        />
      )}
      <RootStack.Screen
        name="App"
        component={DrawerNav}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Perf"
        component={PerfStackScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
