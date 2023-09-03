import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Spinner from 'react-native-spinkit';
import {GradientButton, HeaderApp} from 'components';
import {Fonts, height, width, AppColors, hp, wp} from 'theme';
import {useRoute} from '@react-navigation/native';
import printer from 'reactotron-react-native';
import {selectUser} from 'store/auth';
import ReactNativeModal from 'react-native-modal';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input} from '@ui-kitten/components';
import tron from 'reactotron-react-native';
import {selectCoupons} from 'store/cuopons';
import {
  payOnline,
  selectItems,
  selectTokenToPay,
  selectLoadingPay,
  payCOD,
} from 'store/cart';
import {useSelector, useDispatch} from 'react-redux';
import {APITOKENPAYMOB} from 'constants/index';

export const OrderSummaryScreen = ({navigation}) => {
  const array = ['الدفع عند الاستلام', 'visa'];
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingPay);
  const user = useSelector(selectUser);
  const route = useRoute();
  const {address} = route.params;
  const [promo, setPromo] = useState('');
  const [modal, setModal] = React.useState(false);
  const tokenToPay = useSelector(selectTokenToPay);
  const [method, setMethod] = React.useState('الدفع عند الاستلام');

  const products = useSelector(selectItems);
  const coupons = useSelector(selectCoupons);
  printer.log(products);
  const getTotalPrice = () => {
    return products.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0,
    );
  };
  const selectFewerProps = (items: any) => {
    const {id, quantity} = items;
    return {
      product_id: id,
      quantity: quantity,
    };
  };
  const newCartItems = products.map(selectFewerProps);
  React.useEffect(() => {
    if (tokenToPay) {
      navigation.navigate('Checkout');
    }
  }, [dispatch, navigation, tokenToPay]);
  const addPromo = () => {
    let x = coupons.filter((co: any) => {
      return co.code === promo;
    });
    printer.logImportant('ds', x);
  };
  const _handlePay = () => {
    if (method === 'visa') {
      dispatch(
        payOnline(
          APITOKENPAYMOB,
          getTotalPrice(),
          newCartItems,
          user?.userEmail,
          user?.displayName,
          address?.address,
          user?.phone,
          address?.city,
          user?.displayName,
        ),
      );
    } else {
      dispatch(
        payCOD(
          newCartItems,
          user?.userEmail,
          user?.displayName,
          address?.address,
          user?.phone,
          address?.city,
          navigation,
        ),
      );
    }
  };

  return loading ? (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FF0F39',
        opacity: 0.8,
        alignItems: 'center',

        justifyContent: 'center',
      }}>
      <Spinner
        style={{
          // position: 'absolute',
          transform: [{scaleX: 1}],
          alignSelf: 'center',
          zIndex: 100,
        }}
        isVisible={true}
        size={70}
        type="Circle"
        color="#FFFFFF"
      />
    </View>
  ) : (
    <View style={{backgroundColor: '#F6F6F6'}}>
      <ReactNativeModal
        isVisible={modal}
        animationInTiming={800}
        animationIn="bounceInUp"
        style={{padding: 0, margin: 0}}>
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: -20,
            direction: 'rtl',
            width: width,
            paddingVertical: hp(3),
            paddingHorizontal: wp(5),
          }}>
          <Text
            style={{
              fontFamily: Fonts.CBOLD,
              fontSize: 18,
              color: '#FF0F39',
            }}>
            طريقة الدفع
          </Text>
          {array.map((item: string, index: number) => (
            <React.Fragment key={index}>
              {method !== item ? (
                <TouchableOpacity
                  onPress={() => setMethod(item)}
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginTop: 36,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#313131',
                      fontSize: 13,
                      fontFamily: Fonts.CREG,
                    }}>
                    {item}
                  </Text>
                  <MatIcon
                    name="check-box-outline-blank"
                    style={{
                      color: '#313131',
                      borderRadius: 10,
                    }}
                    size={22}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setMethod(item)}
                  key={index}
                  style={{
                    flexDirection: 'row',
                    marginTop: 36,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#313131',
                      fontSize: 13,
                      fontFamily: Fonts.CREG,
                    }}>
                    {item}
                  </Text>
                  <MatComIcon
                    name="check-box-outline"
                    style={{
                      color: '#FF0F39',
                      borderRadius: 10,
                    }}
                    size={22}
                  />
                </TouchableOpacity>
              )}
            </React.Fragment>
          ))}
          <GradientButton
            onPress={() => setModal(false)}
            buttonName="تأكيد"
            hasIcon={false}
            bR={32}
            pV={16}
            mgT={50}
            mgB={50}
            buttonWidth={width / 1.1}
            styleText={{
              fontFamily: Fonts.CBOLD,
              fontSize: 15,
              color: '#F6F6F6',
            }}
          />
        </View>
      </ReactNativeModal>
      <HeaderApp
        mt={height * 0.1}
        hasBack
        title="تفاصيل الطلب"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View
          style={{
            backgroundColor: 'white',
            width: width * 0.9,
            alignSelf: 'center',
            marginTop: height * 0.02,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#E6E6E6',
          }}>
          <View
            style={{
              width: width * 0.8,
              alignSelf: 'center',
              marginBottom: height * 0.02,
            }}>
            <Text
              style={{
                fontFamily: Fonts.CREG,
                fontSize: 13,
                color: '#313131',
                writingDirection: 'rtl',
                marginTop: height * 0.02,
              }}>
              تاريخ :{' '}
              {new Date().toLocaleString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: width * 0.45}}>
                <Text
                  style={{
                    fontFamily: Fonts.CBOLD,
                    fontSize: 13,
                    color: AppColors.red,
                    writingDirection: 'rtl',
                    marginTop: height * 0.02,
                  }}>
                  الاسم
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.CREG,
                    fontSize: 13,
                    color: '#313131',
                    textAlign: 'left',
                  }}>
                  {address.name}
                </Text>
              </View>
              <View style={{width: width * 0.45}}>
                <Text
                  style={{
                    fontFamily: Fonts.CBOLD,
                    fontSize: 13,
                    color: AppColors.red,
                    writingDirection: 'rtl',
                    marginTop: height * 0.02,
                  }}>
                  المحافظة
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.CREG,
                    fontSize: 13,
                    color: '#313131',
                    writingDirection: 'rtl',
                  }}>
                  {address.city}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontFamily: Fonts.CBOLD,
                fontSize: 13,
                color: AppColors.red,
                writingDirection: 'rtl',
                marginTop: height * 0.02,
              }}>
              العنوان
            </Text>
            <Text
              style={{
                fontFamily: Fonts.CREG,
                fontSize: 13,
                color: '#313131',
                writingDirection: 'rtl',
              }}>
              {address.address}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setModal(true)}
          style={{
            backgroundColor: 'white',
            width: width * 0.9,
            alignSelf: 'center',
            marginTop: height * 0.02,
            borderRadius: 32,
            borderWidth: 1,
            borderColor: '#E6E6E6',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width * 0.8,
              marginVertical: height * 0.01,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.CREG,
                fontSize: 13,
                color: '#313131',
                writingDirection: 'rtl',
              }}>
              طريقة الدفع
            </Text>
            <Text
              style={{
                fontFamily: Fonts.CSEMIBOLD,
                fontSize: 13,
                color: AppColors.red,
                writingDirection: 'rtl',
              }}>
              {method}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            width: width * 0.9,
            alignSelf: 'center',
            marginTop: height * 0.02,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#E6E6E6',
          }}>
          <View
            style={{
              width: width * 0.8,
              alignSelf: 'center',
              marginBottom: height * 0.02,
            }}>
            <Text
              style={{
                fontFamily: Fonts.CBOLD,
                fontSize: 15,
                color: AppColors.red,
                writingDirection: 'rtl',
                marginVertical: height * 0.02,
              }}>
              تفاصيل الطلب
            </Text>
            {products.map((item, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: height * 0.01,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.CREG,
                    fontSize: 13,
                    color: '#313131',
                    writingDirection: 'rtl',
                  }}>
                  {item.quantity}x {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.CREG,
                    fontSize: 13,
                    color: '#313131',
                    writingDirection: 'rtl',
                  }}>
                  {item.price} ج.م
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View
          style={{
            width: width * 0.9,
            alignSelf: 'center',
            marginVertical: height * 0.02,
          }}>
          <Text
            style={{
              color: '#313131',
              fontSize: 15,
              fontFamily: Fonts.CREG,
              writingDirection: 'rtl',
            }}>
            الإجمالي :{' '}
            <Text
              style={{
                color: '#FF0F39',
                fontFamily: Fonts.CBOLD,
                writingDirection: 'rtl',
              }}>
              {getTotalPrice()}{' '}
            </Text>
            ج.م{' '}
          </Text>
        </View>
        <View
          style={{
            width: width * 0.9,
            height: height * 0.06,
            backgroundColor: 'white',
            alignSelf: 'center',
            alignItems: 'center',
            borderRadius: height * 0.04,
            flexDirection: 'row',
            marginBottom: height * 0.02,
            marginTop: height * 0.01,
            borderWidth: 1,
            borderColor: '#E6E6E6',
          }}>
          <Input
            style={{
              width: width * 0.65,
              borderWidth: 0,
              backgroundColor: 'transparent',
            }}
            textStyle={{
              fontFamily: Fonts.CREG,
              color: '#C5C5C5',
              textAlign: 'right',
              fontSize: 15,
            }}
            value={promo}
            onChangeText={nextValue => setPromo(nextValue)}
            size="large"
            placeholderTextColor="#C5C5C5"
            placeholder="إدخال الرمز الترويجي"
          />
          <TouchableOpacity
            onPress={addPromo}
            style={{
              backgroundColor: '#313131',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: width * 0.25,
              borderRadius: height * 0.04,
            }}>
            <Text
              style={{color: 'white', fontFamily: Fonts.CBOLD, fontSize: 13}}>
              تفعيل
            </Text>
          </TouchableOpacity>
        </View>
        <GradientButton
          buttonName="إشتري الآن"
          onPress={() => _handlePay()}
          loading={loading}
          hasIcon={false}
          bR={32}
          pV={16}
          mgT={height * 0.02}
          buttonWidth={width / 1.1}
          styleText={{
            fontFamily: Fonts.CBOLD,
            fontSize: 15,
            color: '#F6F6F6',
          }}
        />
        <View style={{height: height * 0.3}} />
      </ScrollView>
    </View>
  );
};
