import React from 'react';
import {View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {HeaderDrawer} from './lib';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from 'store/auth';
import {useDispatch} from 'react-redux';
import {Fonts} from 'theme';

export const DrawerContent = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const logoutApp = async () => {
    await AsyncStorage.removeItem('@accessToken');
    dispatch(logout());
    props.navigation.closeDrawer();
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    });
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <DrawerContentScrollView {...props}>
        {/* <View style={styles.drawerContent}> */}
        <HeaderDrawer onPress={() => props.navigation.toggleDrawer()} />
        <View>
          <DrawerItem
            label="Account"
            labelStyle={{
              color: '#FFFFFF',
              fontFamily: Fonts.CREG,
              fontSize: 15,
            }}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('ProfileStack', {screen: 'Profile'});
            }}
          />
          <DrawerItem
            label="Favorites"
            labelStyle={{
              color: '#FFFFFF',
              fontFamily: Fonts.CREG,
              fontSize: 15,
            }}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('ProfileStack', {screen: 'whishlist'});
            }}
          />
          <DrawerItem
            label="About Us"
            labelStyle={{
              color: '#FFFFFF',
              fontFamily: Fonts.CREG,
              fontSize: 15,
            }}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('SettingsS', {screen: 'Aboutus'});
            }}
          />
          <DrawerItem
            label="Terms And Conditions"
            labelStyle={{
              color: '#FFFFFF',
              fontFamily: Fonts.CREG,
              fontSize: 15,
            }}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('SettingsS', {screen: 'Terms'});
            }}
          />
          <DrawerItem
            label="Old Orders"
            labelStyle={{
              color: '#FFFFFF',
              fontFamily: Fonts.CREG,
              fontSize: 15,
            }}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('orders');
            }}
          />
          <DrawerItem
            label="Loyalty Points"
            labelStyle={{
              color: '#FFFFFF',
              fontFamily: Fonts.CREG,
              fontSize: 15,
            }}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('loyalty');
            }}
          />
          <DrawerItem
            label="Logout"
            labelStyle={{
              color: '#FFFFFF',
              fontFamily: Fonts.CREG,
              fontSize: 15,
            }}
            onPress={logoutApp}
          />
        </View>
        {/* <View style={{}}>
            <DrawerItem
              label="My Bookings"
              labelStyle={{
                color: '#FFF',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: 15,
              }}
              icon={() => <TICKETBOOK width="20" height="20" />}
              onPress={() => {
                //@ts-ignore
                navigation.navigate('trapesStack');
              }}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#B0E3F1',
                opacity: 0.2,
              }}
            />
          </View>
          <View style={{}}>
            <DrawerItem
              label="Booking History"
              labelStyle={{
                color: '#FFFFFF',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: 15,
              }}
              icon={() => <TICKETHIST width="20" height="20" />}
              onPress={() => {
                //@ts-ignore
                navigation.navigate('trapesStack');
              }}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#B0E3F1',
                opacity: 0.2,
              }}
            />
          </View>
          <View style={{}}>
            <DrawerItem
              label="Favorites"
              labelStyle={{
                color: '#FFFFFF',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: 15,
              }}
              icon={() => <FAVD width="20" height="20" />}
              onPress={() => {
                //@ts-ignore
                navigation.navigate('trapesStack');
              }}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#B0E3F1',
                opacity: 0.2,
              }}
            />
          </View>
          <View style={{}}>
            <DrawerItem
              label="Support"
              labelStyle={{
                color: '#FFFFFF',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: 15,
              }}
              icon={() => <SUPPORT width="20" height="20" />}
              onPress={() => {
                //@ts-ignore
                navigation.navigate('trapesStack');
              }}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#B0E3F1',
                opacity: 0.2,
              }}
            />
          </View>
          <View style={{}}>
            <DrawerItem
              label="About Lokle"
              labelStyle={{
                color: '#FFFFFF',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: 15,
              }}
              icon={() => <ABOUT width="20" height="20" />}
              onPress={() => {
                //@ts-ignore
                navigation.navigate('trapesStack');
              }}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#B0E3F1',
                opacity: 0.2,
              }}
            />
          </View>
          <View style={{}}>
            <DrawerItem
              label="Settings"
              labelStyle={{
                color: '#FFFFFF',
                fontFamily: Fonts.PoppinsRegular,
                fontSize: 15,
              }}
              icon={() => <SETTINGS width="20" height="20" />}
              onPress={() => {
                //@ts-ignore
                navigation.navigate('trapesStack');
              }}
            />
          </View>
        </View> */}
      </DrawerContentScrollView>
      {/* {isDrawerOpen === 'open' ? (
        <BGHOME
          style={{
            position: 'absolute',
            bottom: 10,
            right: wp(-10),
            overflow: 'hidden',
          }}
        />
      ) : null}

      <Text
        style={{
          fontFamily: Fonts.PoppinsRegular,
          fontSize: 13,
          color: '#FFFFFF',
          paddingLeft: 23,
          paddingBottom: 12,
        }}>
        FAQs
      </Text>
      <Text
        style={{
          fontFamily: Fonts.PoppinsRegular,
          fontSize: 13,
          color: '#FFFFFF',
          paddingLeft: 23,
          paddingBottom: 12,
        }}>
        Privacy & Policy
      </Text>
      <Text
        style={{
          fontFamily: Fonts.PoppinsRegular,
          fontSize: 13,
          color: '#FFFFFF',
          paddingLeft: 23,
          paddingBottom: 32,
        }}>
        Terms & Conditions
      </Text>
      {isAuth && (
        <DrawerItem
          label="Log Out"
          style={{paddingBottom: 24, zIndex: 9999}}
          labelStyle={{
            color: '#FD7323',
            fontSize: 15,
            fontFamily: Fonts.PoppinsRegular,
          }}
          icon={() => <LOGOUT width="20" height="20" />}
          onPress={() => dispatch(logout())}
        />
      )} */}
    </View>
  );
};
