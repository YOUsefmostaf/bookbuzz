import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
export type AuthParamsList = {
  Login: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;
  EnterCode: undefined;
  Verification: undefined;
  newPass: undefined;
  verifyPass: undefined;
};
export type BottomTabList = {
  Home: undefined;
  Categoires: undefined;
  Cart: undefined;
  drawer: undefined;
  ProfileStack: undefined;
};
export type DrawerParamsList = {
  bottomScreens: undefined;
  test: undefined;
  orders: undefined;
  OrderDetails: undefined;
  SettingsS: undefined;
  loyalty: undefined;
};
export type PerfSelectParamsList = {
  RegisterComplete: undefined;
  LangSelect: undefined;
  PerfSelect: undefined;
  authorSelect: undefined;
};
export type ProfileParamsList = {
  Profile: undefined;
  EditProfile: undefined;
  EditPassword: undefined;
  Wishlist: undefined;
};
export type authNavigationProps<T extends keyof AuthParamsList> = {
  navigation: StackNavigationProp<AuthParamsList, T>;
};
export type PerfNavigationProps<T extends keyof PerfSelectParamsList> = {
  navigation: StackNavigationProp<PerfSelectParamsList, T>;
};

export type bottomNavigationProps<T extends keyof BottomTabList> = {
  navigation: BottomTabNavigationProp<BottomTabList, T>;
};

export type drawerNavigationProps<T extends keyof DrawerParamsList> = {
  navigation: DrawerNavigationProp<DrawerParamsList, T>;
};

export interface ProfileProps {
  navigation: StackNavigationProp<BottomTabList, 'ProfileStack'>;
}
