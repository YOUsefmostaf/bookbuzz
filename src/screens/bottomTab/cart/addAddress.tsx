import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Fonts, height, width, wp} from 'theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input} from '@ui-kitten/components';
import {GradientButton, HeaderApp} from 'components';
import Toast from 'react-native-toast-message';
import printer from 'reactotron-react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabList} from 'src/navigation/paramsList';
import AppInput from 'components/Input/Input';
import {validateAddress} from 'src/helper/Logger';
import {
  selectUser,
  selectUserMeta,
  updateUser,
  updateUserMeta,
} from 'store/auth';
import {useDispatch, useSelector} from 'react-redux';

interface AddressProps {
  name: string | undefined;
  number: string;
  gov: string;
  city: string;
  street: string;
  building: string;
  floor: string;
  Apartment: string;
}
interface AddAddressProps {
  navigation: StackNavigationProp<BottomTabList, 'Cart'>;
}
export const AddAddressScreen: React.FC<AddAddressProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const userMeta = useSelector(selectUserMeta);
  const userData = useSelector(selectUser);

  const [Address, setAddress] = useState<AddressProps>({
    name: '',
    number: '',
    gov: '',
    city: '',
    street: '',
    building: '',
    floor: '',
    Apartment: '',
  });
  const onHandleChangeInput = (text: string, name: string) => {
    let newAddress: any = {...Address};
    newAddress[name] = text;
    setAddress(newAddress);
  };
  useEffect(() => {
    const parent = navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });
    let fetch = async () => {
      console.log('user is', userData);
      dispatch(updateUserMeta({id: userData?.userId}));
      // dispatch(updateUser({id: userData?.userId}));
    };
    fetch();
  }, []);

  const saveAddress = async () => {
    const {error, value, warning} = validateAddress(Address);
    if (error?.message) {
      Toast.show({type: 'error', text1: error?.details[0].message});
    } else {
      let newAdd = {
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        phone: Address?.number,
        state: Address?.gov,
        city: Address?.city,
        Apartment: Address?.Apartment,
        street: Address?.street,
        floor: Address?.floor,
        building: Address?.building,
        zone: Address.gov,
      };
      let addressIndex = userMeta?.findIndex((i: any) => i.key === 'address');
      let address: any = {key: 'address', value: []};
      if (addressIndex < 0) address = {key: 'address', value: [newAdd]};
      else address?.value?.push(newAdd);
      dispatch(updateUserMeta({id: userData?.userId, body: address}));
      navigation.navigate('ListAddress');
    }
  };

  return (
    <>
      <HeaderApp
        mt={height * 0.1}
        hasBack
        backPress={() => navigation.goBack()}
        title="Add address"
      />
      <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
        <ScrollView contentContainerStyle={{paddingVertical: 20}}>
          <KeyboardAwareScrollView>
            <View style={{marginHorizontal: 16}}>
              <Text
                style={{
                  fontFamily: Fonts.CBOLD,
                  fontSize: 18,
                  color: '#FF0F39',
                  marginTop: 32,
                  writingDirection: 'rtl',
                }}>
                Add address
              </Text>
              <AppInput
                name="name"
                text="الاسم"
                input={Address?.name}
                onChnage={onHandleChangeInput}
                placeholder="ادخل اسمك"
                keyboardType="defalut"
              />
              <AppInput
                name="number"
                text="رقم الموبايل"
                placeholder="ادخل رقم الموبايل"
                input={Address?.number}
                onChnage={onHandleChangeInput}
                keyboardType="numeric"
              />
              {/* Bottom Modal instead (TitlesModal/values from bosta/OnConfirm => onHandleConfirm/oneSelect/ onSubmit) */}
              <AppInput
                name="gov"
                text="ادخل المحافظة"
                placeholder="ادخل المحافظة"
                onChnage={onHandleChangeInput}
                input={Address?.gov}
                keyboardType="default"
              />
              <AppInput
                name="city"
                text="ادخل المدينة"
                onChnage={onHandleChangeInput}
                input={Address?.city}
                placeholder="اختر المدينة"
                keyboardType="default"
              />
              <AppInput
                name="street"
                text="ادخل الشارع"
                onChnage={onHandleChangeInput}
                placeholder="ادخل الشارع"
                input={Address?.street}
                keyboardType="default"
              />
              <AppInput
                name="building"
                input={Address?.building}
                onChnage={onHandleChangeInput}
                text="ادخل رقم المبني"
                placeholder="ادخل رقم المبني"
                keyboardType="default"
              />
              <AppInput
                name="floor"
                input={Address?.floor}
                onChnage={onHandleChangeInput}
                text="ادخل رقم الطابق"
                placeholder="ادخل رقم الطابق"
                keyboardType="default"
              />
              <AppInput
                name="Apartment"
                text="رقم الشقة"
                input={Address?.Apartment}
                onChnage={onHandleChangeInput}
                placeholder="ادخل رقم الشقة"
                keyboardType="default"
              />
            </View>
            <GradientButton
              buttonName="حفظ"
              onPress={() => {
                saveAddress();
              }}
              hasIcon={false}
              bR={32}
              pV={16}
              mgT={100}
              buttonWidth={width / 1.1}
              styleText={{
                fontFamily: Fonts.CBOLD,
                fontSize: 15,
                color: '#F6F6F6',
              }}
            />
          </KeyboardAwareScrollView>
        </ScrollView>
      </View>
    </>
  );
};
