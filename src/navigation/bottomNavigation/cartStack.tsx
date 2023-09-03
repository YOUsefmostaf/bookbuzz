import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CartScreen,
  ListAddressScreen,
  AddAddressScreen,
  OrderSummaryScreen,
  CheckOutScreen,
  OrderSuccess,
  OrderFail,
} from 'screens';

const CartStack = createStackNavigator();

export const CartNavigator: React.FC = () => {
  return (
    <CartStack.Navigator initialRouteName="Categories">
      <CartStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <CartStack.Screen
        name="ListAddress"
        component={ListAddressScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <CartStack.Screen
        name="AddAddress"
        component={AddAddressScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <CartStack.Screen
        name="OrderSummary"
        component={OrderSummaryScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <CartStack.Screen
        name="Checkout"
        component={CheckOutScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <CartStack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <CartStack.Screen
        name="OrderFail"
        component={OrderFail}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
    </CartStack.Navigator>
  );
};
