import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CategoriesScreen,
  SubcategoriesScreen,
  TagsScreen,
  BookDetailsScreen,
} from 'screens';

const CategoryStack = createStackNavigator();

export const CategoryNavigator: React.FC = () => {
  return (
    <CategoryStack.Navigator initialRouteName="Categories">
      <CategoryStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <CategoryStack.Screen
        name="Subcategories"
        component={SubcategoriesScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <CategoryStack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
    </CategoryStack.Navigator>
  );
};
