import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-spinkit';

import {HeaderApp} from 'components';
import {Fonts, height, width, AppColors} from 'theme';
import {useRoute} from '@react-navigation/native';
import {BACKWARDICON, MARKER} from 'constants/icons';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';

// import Geocoder from 'react-native-geocoder';

// Geocoder.fallbackToGoogle('AIzaSyCs5ZX5IjlBsNHivcIhDFs4bdPVJETWhOM');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const OrderTrackingScreen = ({navigation}: any) => {
  const route = useRoute();
  const {order} = route.params;
  const [lat, setLat] = React.useState();
  const [lng, setLng] = React.useState();
  const [markerLat, setMarkerLat] = React.useState();
  const [markerLng, setMarkerLng] = React.useState();
  const [bostaOrder, setBostaOrder] = React.useState();
  const [color, setColor] = React.useState('');
  const [statusTxt, setStatusTxt] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    refresh();
  }, []);
  const refresh = () => {
    setRefreshing(true);
    const url = 'https://app.bosta.co/api/v0/deliveries/0NUc8Y4Nbs1cI2YgJa5K9';
    fetch(url, {
      method: 'GET',
      // withCredentials: true,
      headers: new Headers({
        Authorization:
          'b6e92ac368de74b695651468def8daf859198415242fe8e608cf32af5c092263',
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
      .then(resp => resp.json())
      .then(function (data) {
        // console.log(data);
        setBostaOrder(data);
        setRefreshing(false);
      })
      .catch(function (error) {
        console.log(error, '???');
      });
  };
  React.useEffect(() => {
    // console.log(bostaOrder?.state)
    setMarkerLat(bostaOrder?.state?.delivering.actualAddress[0]);
    setMarkerLng(bostaOrder?.state?.delivering.actualAddress[0]);
    // Geocoder.geocodeAddress(bostaOrder?.dropOffAddress?.city?.name)
    //   .then(res => {
    //     console.log(res[0].position.lat, res[0].position.lng, ' city');
    //     console.log(markerLat, markerLng, ' marker');

    //     // console.log(res[0].position.lng, 'location');

    //     setLat(res[0].position.lat);
    //     setLng(res[0].position.lng);
    //     // res is an Array of geocoding object (see below)
    //   })
    //   .catch(err => console.log(err));
    switch (bostaOrder?.state?.code) {
      case 10:
        setColor('yellow');
        setStatusTxt('The request has been processed');
        break;
      case 21:
        setColor('yellow');
        setStatusTxt('The order has been handed over to the shipping company');
        break;
      case 24:
        setColor('orange');
        setStatusTxt("The order has been received at the shipping company's warehouse");
        break;

      case 45:
        setColor('green');
        setStatusTxt('The order has been delivered');
        break;
      case 46:
        setColor('red');
        setStatusTxt('The request has been returned to the Egyptian Book Fair');
        break;
      case 47:
        setColor('blue');
        setStatusTxt('exception');
        break;
      default:
        setColor('yellow');
        setStatusTxt('The request has been processed');
    }
  }, [bostaOrder]);
  return (
    <View style={{backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.1}
        hasBack
        title="Track the shipment"
        onPress={() => navigation.goBack()}
      />
      {refreshing ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: height * 0.4,
          }}>
          <Spinner
            style={{
              // position: 'absolute',
              transform: [{scaleX: 1}],
              alignSelf: 'center',
              zIndex: 100,
            }}
            isVisible={true}
            size={50}
            type="Bounce"
            color="#FF0F39"
          />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refresh()}
            />
          }>
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
                {new Date(bostaOrder?.createdAt).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })}
              </Text>
              <View style={{flexDirection: 'row-reverse'}}>
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
                    {bostaOrder?.receiver?.fullName}
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
                      flexWrap: 'wrap',
                    }}>
                    {bostaOrder?.dropOffAddress?.city?.name}
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
                {bostaOrder?.dropOffAddress?.firstLine}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              height: height * 0.28,
              width: width * 0.9,
              alignSelf: 'center',
              marginTop: height * 0.02,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E6E6E6',
            }}>
            {lat && lng ? (
              <View style={[StyleSheet.absoluteFillObject, {borderRadius: 12}]}>
                <MapView
                  // provider={PROVIDER_GOOGLE}
                  initialRegion={{
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lng),
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  style={[StyleSheet.absoluteFillObject, {borderRadius: 12}]}>
                  <Marker
                    draggable={false}
                    image={require('../../../assets/icons/marker2.png')}
                    coordinate={{
                      latitude: parseFloat(lat),
                      longitude: parseFloat(lng),
                    }}
                  />
                </MapView>
                {/* <View style={{position: 'absolute', top: 100, left: 50}} /> */}
              </View>
            ) : null}
          </View>

          <View
            style={{
              width: width * 0.9,
              alignSelf: 'center',
              marginTop: height * 0.04,
            }}>
            <Text
              style={{
                fontFamily: Fonts.CBOLD,
                fontSize: 15,
                color: AppColors.red,
                writingDirection: 'rtl',
              }}>
              Apply
            </Text>
          </View>
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
        </ScrollView>
      )}
    </View>
  );
};
