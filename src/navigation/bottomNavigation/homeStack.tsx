import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  VendorDetailsScreen,
  AuthorDetailsScreen,
  BookDetailsScreen,
  TagsScreen,
  SubcategoriesScreen,
  VendorsScreen,
  AuthorsScreen,
  FilterScreen,
  FilterResult,
  WhishList,
} from 'screens';
const HomeStack = createStackNavigator();

export const HomeNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator initialRouteName="Categories">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="VendorDetails"
        component={VendorDetailsScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AuthorDetails"
        component={AuthorDetailsScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Tags"
        component={TagsScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Subcategories"
        component={SubcategoriesScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Vendors"
        component={VendorsScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Authors"
        component={AuthorsScreen}
        options={{
          animationEnabled: true,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="FilterS"
        component={FilterScreen}
        options={{animationEnabled: true, headerShown: false}}
      />
      <HomeStack.Screen
        name="FilterR"
        component={FilterResult}
        options={{animationEnabled: true, headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
