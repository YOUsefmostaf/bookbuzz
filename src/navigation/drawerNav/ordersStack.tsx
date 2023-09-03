import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  OrdersHistoryScreen,
  OrderDetailsScreen,
  OrderTrackingScreen,
} from 'screens';

const OrderStack = createStackNavigator();

export const OrderNavigator: React.FC = () => {
  return (
    <OrderStack.Navigator initialRouteName="orders">
      <OrderStack.Screen
        name="orders"
        component={OrdersHistoryScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <OrderStack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <OrderStack.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
    </OrderStack.Navigator>
  );
};
