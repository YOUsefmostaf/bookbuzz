import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CheckBox} from '@ui-kitten/components';
import {useDispatch} from 'react-redux';
import {setAuthors} from 'store/auth';
import {Fonts} from 'theme';

export const AuthorsCard = React.memo((props: any) => {
  const dispatch = useDispatch();
  const _handlePush = (lang: any) => {
    let list = [...props.cate];
    list.push(lang?.id);
    props.setCate(list);
    dispatch(setAuthors(list));
  };
  const _handlePop = (lang: any) => {
    let list = [...props.cate];
    let newList = list.filter(l => {
      return l !== lang?.id;
    });
    props.setCate(newList);
    dispatch(setAuthors(newList));
  };
  return (
    <View style={{paddingHorizontal: 17}} key={props.index}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            marginTop: 12,
          }}>
          <FastImage
            source={{uri: props.item?.image?.src}}
            resizeMode="cover"
            style={{
              width: 53,
              height: 49,
              overflow: 'hidden',
              borderRadius: 7,
              marginRight: 16,
            }}
          />
          <Text
            style={{fontSize: 13, fontFamily: Fonts.CREG, color: '#313131'}}>
            {props.item?.name}
          </Text>
        </View>
        <CheckBox
          // style={styles.checkbox}
          status="basic"
          onChange={() =>
            props.cate.find((la: any) => la === props.item?.id)
              ? _handlePop(props.item)
              : _handlePush(props.item)
          }
          checked={
            props.cate.find((la: any) => la === props.item?.id) ? true : false
          }
        />
      </View>
    </View>
  );
});
