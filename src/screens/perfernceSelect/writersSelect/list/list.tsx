import React from 'react';
import {FlatList, View} from 'react-native';
import {width, wp} from 'theme';
import {AuthorsCard} from './cardItem';

interface Props {
  data: any;
  selectedCate: any[];
  setSelectedCate: (a: any) => void;
}

export const AuthorsList: React.FC<Props> = ({
  data,
  selectedCate,
  setSelectedCate,
}) => {
  const Items: any = ({item, index}: any) => {
    return (
      <AuthorsCard
        item={item}
        index={index}
        cate={selectedCate}
        setCate={setSelectedCate}
      />
    );
  };
  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={true}
        data={data}
        removeClippedSubviews={true}
        contentContainerStyle={{paddingBottom: wp(20)}}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#E6E6E6',
              width: width,
              alignSelf: 'center',
              borderStyle: 'dashed',
            }}
          />
        )}
        keyExtractor={item => item?.id.toString()}
        renderItem={Items}
      />
    </>
  );
};
