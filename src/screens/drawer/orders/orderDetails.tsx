import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {HeaderApp} from 'components';
import {Fonts, height, width, AppColors} from 'theme';
import {useRoute} from '@react-navigation/native';
import {BACKWARDICON, TRUCK} from 'constants/icons';
// import sdk from 'api';
// const test = import('api').then(sdk => sdk('@bostaapp/v0.0#9k24lb1kx4ygdy7'));
// const sdk = (await import('api'))('@bostaapp/v0.0#9k24lb1kx4ygdy7');

// const test = sdk.init('@bostaapp/v0.0#9k24lb1kx4ygdy7')
// import sdk from 'api'
export const OrderDetailsScreen = ({navigation}) => {
  const route = useRoute();
  const {order} = route.params;
  console.log(order?.number, 'number');
  React.useEffect(() => {
    const options = {
      method: 'GET',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
    };

    fetch('https://api.bosta.co/api/v2/pickups', options)
      .then(response => response.text())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }, []);
  const [color, setColor] = React.useState('');
  const [statusTxt, setStatusTxt] = React.useState('');
  console.log(order.status);
  React.useEffect(() => {
    switch (order.status) {
      case 'processing':
        setColor('orange');
        setStatusTxt('Delivery is in progress');
        break;
      case 'completed':
        setColor('green');
        setStatusTxt('Delivered');
        break;
      case 'pending':
        setColor('yellow');
        setStatusTxt('The request is in progress');
        break;
      case 'on-hold':
        setColor('#E6E6E6');
        setStatusTxt('The order has been confirmed');
        break;
      case 'cancelled':
        setColor('red');
        setStatusTxt('the request has been canceled');
        break;
      case 'refunded':
        setColor('blue');
        setStatusTxt('The money has been returned');
        break;
      case 'failed':
        setColor('black');
        setStatusTxt('an error occurred');
        break;
      case 'trash':
        setColor('black');
        setStatusTxt('The request has been deleted');
        break;
      default:
        setColor('yellow');
        setStatusTxt('The request is in progress');
    }
  }, [order]);
  return (
    <View style={{backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.1}
        hasBack
        title="Order details"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',

            backgroundColor: 'transparent',
            width: width * 0.9,
            alignSelf: 'center',
            marginTop: height * 0.02,
          }}>
          <View
            style={{
              width: width * 0.02,
              height: width * 0.02,
              backgroundColor: `${color}`,
              marginLeft: width * 0.02,
              borderRadius: width * 0.02,
            }}
          />

          <Text
            style={{
              fontFamily: Fonts.CREG,
              fontSize: 12,
              color: '#313131',
              lineHeight: 26,
            }}>
            {statusTxt}
          </Text>
        </View>
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
              Date :{' '}
              {new Date(order?.date_created).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: Fonts.CBOLD,
                    fontSize: 13,
                    color: AppColors.red,
                    writingDirection: 'rtl',
                    marginTop: height * 0.02,
                  }}>
                  Name
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.CREG,
                    fontSize: 13,
                    color: '#313131',
                    writingDirection: 'rtl',
                  }}>
                  {order?.shipping?.first_name} {order?.shipping?.last_name}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: Fonts.CBOLD,
                    fontSize: 13,
                    color: AppColors.red,
                    writingDirection: 'rtl',
                    marginTop: height * 0.02,
                  }}>
                  Governorate
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.CREG,
                    fontSize: 13,
                    color: '#313131',
                    writingDirection: 'rtl',
                  }}>
                  {order?.shipping?.city}
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
              Address
            </Text>
            <Text
              style={{
                fontFamily: Fonts.CREG,
                fontSize: 13,
                color: '#313131',
                writingDirection: 'rtl',
              }}>
              {order?.shipping?.address_1 && order?.shipping?.address_2}
            </Text>
          </View>
        </View>

        <TouchableOpacity
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
              flexDirection: 'row-reverse',
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
              payment method
            </Text>
            <Text
              style={{
                fontFamily: Fonts.CSEMIBOLD,
                fontSize: 13,
                color: AppColors.red,
                writingDirection: 'rtl',
              }}>
              ‏Paiement when recieving
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
              Order details
            </Text>
            <View style={{flexDirection: 'column'}}>
              {order?.line_items.map(prod => {
                return (
                  <View
                    style={{
                      flexDirection: 'row-reverse',
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
                      {prod.quantity}x {prod.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.CREG,
                        fontSize: 13,
                        color: '#313131',
                        writingDirection: 'rtl',
                      }}>
                      {prod.total} E.G
                    </Text>
                  </View>
                );
              })}
            </View>
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
            Total :{' '}
            <Text
              style={{
                color: '#FF0F39',
                fontFamily: Fonts.CBOLD,
                writingDirection: 'rtl',
              }}>
              {order?.total}{' '}
            </Text>
            E.G{' '}
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OrderTracking', {
                order: order,
              });
            }}
            style={{
              backgroundColor: '#313131',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              height: '100%',
              width: width * 0.9,
              borderRadius: height * 0.04,
              paddingHorizontal: width * 0.05,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TRUCK style={{marginRight: width * 0.02}} />
              <Text
                style={{color: 'white', fontFamily: Fonts.CBOLD, fontSize: 13}}>
                Track the shipment
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <BACKWARDICON />
            </View>
          </TouchableOpacity>
        </View>
        {/* <GradientButton
                    buttonName="إشتري الآن"
                    onPress={() => {
                        navigation.navigate('ListAddress');
                    }}
                    loading={false}
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
                /> */}
        <View style={{height: height * 0.3}} />
      </ScrollView>
    </View>
  );
};
