import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    OrdersHistoryScreen, OrderDetailsScreen
} from 'screens';

const OrdersStack = createStackNavigator();

export const OrdersNavigator: React.FC = () => {
    return (
        <OrdersStack.Navigator initialRouteName="OrdersHistory">
            <OrdersStack.Screen
                name="OrdersHistory"
                component={OrdersHistoryScreen}
                options={{
                    animationEnabled: true,
                    headerShown: false,
                }}
            />
            <OrdersStack.Screen
                name="OrderDetails"
                component={OrderDetailsScreen}
                options={{
                    animationEnabled: true,
                    headerShown: false,
                }}
            />

        </OrdersStack.Navigator>
    );
};
