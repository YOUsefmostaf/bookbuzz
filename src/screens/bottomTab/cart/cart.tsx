import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getReleatedProducts, selectReleatedProduts} from 'store/products';
import {getCoupons} from 'store/cuopons';
import {View} from 'react-native';
import {ListComponent} from 'components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectItems, incrementQuantity, decrementQuantity} from 'store/cart';
import tron from 'reactotron-react-native';
import {selectUser, selectUserMeta, updateUserMeta} from 'store/auth';
export const CartScreen = ({navigation}) => {
  const disptach = useDispatch();
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const user = useSelector(selectUser);
  const userMeta = useSelector(selectUserMeta);
  const products = useSelector(selectItems);

  const releated = useSelector(selectReleatedProduts);
  const dispatch = useDispatch();
  tron.logImportant('dsds', releated);
  const getTotalPrice = () => {
    return products.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0,
    );
  };

  const getData = async () => {
    try {
      dispatch(updateUserMeta({id: user?.userId}));
      let index = userMeta.findIndex((i: any) => i.key === 'address');
      let addresses = userMeta[index].value;
      setAddresses(addresses);
    } catch (e) {
      // error reading value
    }
  };

  const checkoutNav = () => {
    if (addresses.length > 0) {
      navigation.navigate('ListAddress', {addresses: addresses});
    } else {
      navigation.navigate('AddAddress');
    }
  };
  let result = products?.map(a => a.id);
  // React.useEffect(() => {
  //   dispatch(getReleatedProducts([result]));
  // }, [dispatch, result]);
  React.useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F6F6F6',
      }}>
      <ListComponent
        title="Shopping Card"
        lists={products}
        isWish={false}
        total={getTotalPrice()}
        plusQuantity={(list: any) => dispatch(incrementQuantity(list))}
        minusQuantity={(list: any) => dispatch(decrementQuantity(list))}
        variant={releated}
        Buy={checkoutNav}
      />
    </View>
  );
};
