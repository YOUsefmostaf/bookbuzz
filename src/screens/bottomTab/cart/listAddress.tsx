import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {GradientButton, HeaderApp} from 'components';
import {Fonts, height, width, wp, AppColors} from 'theme';
import {SELECTED, ADD} from 'constants/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import printer from 'reactotron-react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectUser, selectUserMeta} from 'store/auth';

export const ListAddressScreen = ({navigation, ...props}) => {
  console.log();
  const isFocused = useIsFocused();
  const user = useSelector(selectUser);
  const userMeta = useSelector(selectUserMeta);
  useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({
      tabBarStyle: {display: 'none'},
    });
  }, []);

  // const getData = async () => {
  //   try {
  //     let address = [];
  //     let addsIndex = userMeta?.findIndex((i: any) => i.key === 'address');
  //     address = userMeta[addsIndex].value;
  //     setAddresses(address);
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  const [addressIndex, setAddressIndex] = useState(0);
  const [addresses, setAddresses] = useState<any[]>(
    props.route.params.addresses,
  );

  const renderAddress = ({item, index}) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        width: width * 0.9,
        alignSelf: 'center',
        marginTop: height * 0.02,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E6E6E6',
      }}
      onPress={() => setAddressIndex(index)}>
      <View
        style={{
          width: width * 0.8,
          alignSelf: 'center',
          marginVertical: height * 0.02,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: width * 0.8,
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.CREG,
              fontSize: 13,
              color: '#313131',
              writingDirection: 'rtl',
            }}>
            {`${item?.first_name} ${item?.last_name}`}
          </Text>
          {index === addressIndex ? <SELECTED /> : null}
        </View>
        <Text
          style={{
            fontFamily: Fonts.CREG,
            fontSize: 13,
            color: '#313131',
            writingDirection: 'rtl',
            marginTop: height * 0.01,
          }}>
          {item?.phone}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.CREG,
            fontSize: 13,
            color: '#313131',
            writingDirection: 'rtl',
            marginTop: height * 0.01,
          }}>
          {item?.address_1}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.1}
        hasBack
        title="العنواين المحفوظة"
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          marginTop: height * 0.01,
          height: height * 0.65,
        }}>
        <FlatList data={addresses} renderItem={renderAddress} />
        <TouchableOpacity
          style={{
            marginVertical: height * 0.015,
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: width * 0.05,
          }}
          onPress={() => {
            navigation.navigate('AddAddress');
          }}>
          <ADD />
          <Text
            style={{
              fontFamily: Fonts.CREG,
              fontSize: 13,
              color: '#313131',
              writingDirection: 'rtl',
              marginHorizontal: width * 0.01,
            }}>
            أضف عنوانا جديد
          </Text>
        </TouchableOpacity>
      </View>
      <GradientButton
        buttonName="تأكيد"
        onPress={() => {
          navigation.navigate('OrderSummary', {
            address: addresses[addressIndex],
          });
        }}
        loading={false}
        hasIcon={false}
        bR={32}
        pV={16}
        buttonWidth={width / 1.1}
        styleText={{
          fontFamily: Fonts.CBOLD,
          fontSize: 15,
          color: '#F6F6F6',
        }}
      />
    </View>
  );
};
