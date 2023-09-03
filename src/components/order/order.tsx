import React from 'react';
import {View, Text} from 'react-native';
import {width, height, Fonts} from 'theme';

export const Order = ({order}: any) => {
  var months = [
    'يناير',
    'فبراير',
    'مارس',
    'إبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
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
  // console.log(order.line_items[0].name)
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: width * 0.9,
        height: height * 0.2,
        borderRadius: 12,
        borderColor: '#E6E6E6',
        flexDirection: 'column',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
      }}>
      <View style={{flexDirection: 'row-reverse', marginBottom: height * 0.03}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            flexDirection: 'row-reverse',
          }}>
          <Text
            style={{fontFamily: Fonts.CREG, fontSize: 13, color: '#313131'}}>
            order number : {order.number}
          </Text>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
            <Text
              style={{fontFamily: Fonts.CREG, fontSize: 13, color: '#313131'}}>
              Payment method : cash
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          marginBottom: height * 0.03,
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'transparent',
              borderColor: '#313131',
              borderRadius: 8,
              flexDirection: 'column',
              alignItems: 'center',
              width: width * 0.14,
              borderWidth: 0.5,
              paddingVertical: height * 0.004,
              // marginLeft: width * 0.04,
            }}>
            <Text
              style={{fontFamily: Fonts.CBOLD, fontSize: 11, color: '#FF0F39'}}>
              {new Date(order.date_created).getDate()}
            </Text>
            <Text
              style={{fontFamily: Fonts.CREG, fontSize: 11, color: '#313131'}}>
              {months[new Date(order.date_created).getMonth()]}
            </Text>
          </View>

          <Text
            style={{fontFamily: Fonts.CREG, fontSize: 13, color: '#313131'}}>
            Number of books: {order.line_items.length}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{fontFamily: Fonts.CREG, fontSize: 13, color: '#313131'}}>
            Total :
          </Text>
          <Text
            style={{fontFamily: Fonts.CBOLD, fontSize: 14, color: '#FF0F39'}}>
            {' '}
            {order.total}{' '}
          </Text>
          <Text
            style={{fontFamily: Fonts.CBOLD, fontSize: 14, color: '#313131'}}>
            E.G
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
        <View
          style={{
            width: width * 0.02,
            height: width * 0.02,
            backgroundColor: `${color}`,
            marginLeft: width * 0.02,
            borderRadius: width * 0.02,
          }}
        />

        <Text style={{fontFamily: Fonts.CREG, fontSize: 12, color: '#313131'}}>
          {statusTxt}
        </Text>
      </View>
    </View>
  );
};
