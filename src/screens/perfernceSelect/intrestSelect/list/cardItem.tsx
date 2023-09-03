import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Fonts} from 'theme';
import {useDispatch} from 'react-redux';
import {setIntersts} from 'store/auth';

export const CategoiresCard = React.memo((props: any) => {
  const dispatch = useDispatch();
  const _handlePush = (lang: any) => {
    let list = [...props.cate];
    list.push(lang?.id);
    props.setCate(list);
    dispatch(setIntersts(list));
  };
  const _handlePop = (lang: any) => {
    let list = [...props.cate];
    let newList = list.filter(l => {
      return l !== lang?.id;
    });
    props.setCate(newList);
    dispatch(setIntersts(newList));
  };
  return (
    <TouchableOpacity
      onPress={() => {
        props.cate.find((la: any) => la === props.item?.id)
          ? _handlePop(props.item)
          : _handlePush(props.item);
      }}
      style={{
        backgroundColor: props.cate.find((la: any) => la === props.item?.id)
          ? '#FF0F39'
          : '#F7DEE3',
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        marginRight: 12,
        marginVertical: 8,
        paddingRight: 16,
        paddingLeft: 16,
      }}
      key={props.index}>
      <Text
        style={{
          fontFamily: props.cate.find((la: any) => la === props.item?.id)
            ? Fonts.CBOLD
            : Fonts.CREG,
          color: props.cate.find((la: any) => la === props.item?.id)
            ? '#F6F6F6'
            : '#313131',
          fontSize: 13,
        }}>
        {props?.item?.name}
      </Text>
    </TouchableOpacity>
  );
});
