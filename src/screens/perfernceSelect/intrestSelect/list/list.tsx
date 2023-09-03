import React from 'react';
import {FlatList} from 'react-native';
import {CategoiresCard} from './cardItem';

interface Props {
  data: any;
  selectedCate: any[];
  setSelectedCate: (a: any) => void;
}

export const CategoiresList: React.FC<Props> = ({
  data,
  selectedCate,
  setSelectedCate,
}) => {
  const Items: any = ({item, index}: any) => {
    return (
      <CategoiresCard
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
        showsHorizontalScrollIndicator={false}
        data={data}
        numColumns={2}
        removeClippedSubviews={true}
        contentContainerStyle={{
          alignItems: 'flex-start',
        }}
        columnWrapperStyle={{marginLeft: 16}}
        keyExtractor={item => item?.id.toString()}
        renderItem={Items}
      />
    </>
  );
};
