import React from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from 'store/cart';
import {Products} from '../../../mock/mock';

export const TestScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {Products?.map((prod, index) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 16,
              marginVertical: 20,
            }}
            key={index}>
            <Text style={{color: 'red', fontSize: 20}}>{prod?.name}</Text>
            <Button
              title="أضف الي عربة التسوق"
              onPress={() => dispatch(addToCart(prod))}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
