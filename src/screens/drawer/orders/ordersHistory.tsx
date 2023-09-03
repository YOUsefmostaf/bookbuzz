import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Order} from '../../../components/order/order';
import {height, width, wp} from 'theme';
import {getOrdersHistory} from 'store/orders';
import {selectUser} from 'store/auth';
import {HeaderApp} from 'components';
import Spinner from 'react-native-spinkit';

import {selectOrders, selectLoadingOrders} from 'store/orders';
export const OrdersHistoryScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingOrders);
  const user = useSelector(selectUser);
  const orders = useSelector(selectOrders);
  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    // if (user) {
    //   console.log(user.userId);
    //   dispatch(getOrdersHistory({params: {customer_id: user.userId}}));
    // }
  }, [dispatch, user]);
  const refresh = () => {
    // setRefreshing(false);
    // dispatch(getOrdersHistory({params: {customer_id: user.userId}}));
  };
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OrderDetails', {
            order: item,
          });
        }}
        // eslint-disable-next-line prettier/prettier
        style={{marginBottom: height * 0.03}}>
        <Order order={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        hasBack
        mt={height * 0.1}
        title="previous orders"
        onPress={() => navigation.navigate('bottomScreens')}
      />
      {/* {loading ? (
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
      ) : ( */}
        <FlatList
          onRefresh={() => refresh()}
          data={orders}
          refreshing={loading}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onEndReachedThreshold={0.8}
          contentContainerStyle={{
            alignItems: 'center',
            marginVertical: height * 0.04,
            paddingBottom: wp(30),
            // height: height,
          }}
          keyExtractor={item => item.id}
        />
      {/* )} */}
    </View>
  );
};
