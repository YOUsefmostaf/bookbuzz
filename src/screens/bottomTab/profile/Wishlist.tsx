import {StackNavigationProp} from '@react-navigation/stack';
import {ListComponent} from 'components';
import {join, remove} from 'lodash';
import React, {useEffect, useState} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  BottomTabList,
  DrawerParamsList,
  ProfileParamsList,
} from 'src/navigation/paramsList';
import {getPref, savePref, selectPrefs} from 'store/pref';
import {
  getProducts,
  getProductsWishlist,
  selectProducts,
  selectProdutsWishlist,
  setWishlist,
} from 'store/products';
import _ from 'lodash';
export interface Props {
  navigation: StackNavigationProp<ProfileParamsList, 'Wishlist'>;
}
export const WhishList: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {products: ids} = useSelector(selectPrefs);
  const products = useSelector(selectProdutsWishlist);
  const [Products, setProducts] = useState<any>(products);
  BackHandler.addEventListener('hardwareBackPress', () => {
    props.navigation.navigate('Home');
    return true;
  });
  useEffect(() => {
    console.log('get pref');
    dispatch(getPref());
  }, []);
  useEffect(() => {
    // console.log('Use effect to get products of wishlist');
    // console.log(ids);
    // let newIds = join(ids, ',');
    // dispatch(
    //   getProductsWishlist({
    //     params: {include: ids.length > 0 ? newIds : '[]'},
    //   }),
    // );
  }, [dispatch]);
  useEffect(() => {
    console.log('use effect,  set products after getting');
    setProducts(products);
  }, [dispatch, products]);

  const onRemoveFromWishList = (id: any) => {
    console.log('Remove item from wishlist');
    let prods = [...ids];
    prods = _.filter(prods, item => item !== id);
    dispatch(savePref({products: prods}));
    dispatch(getPref());
    let newProducts = [...Products];
    newProducts = _.filter(newProducts, item => item.id !== id);
    setProducts(newProducts);
  };
  return (
    <View>
      <ListComponent
        title="Favorites"
        isWish={true}
        lists={Products}
        onRemoveFromWishlist={onRemoveFromWishList}
        backPress={() => props.navigation.navigate('Home')}
      />
    </View>
  );
};
