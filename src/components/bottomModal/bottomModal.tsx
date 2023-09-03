import * as React from 'react';
import {ScrollView, Text, TouchableOpacity, View, FlatList} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {FilterStyles} from './styles';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GradientButton} from 'components';
import {Fonts, width} from 'theme';
import FastImage from 'react-native-fast-image';
import {remove} from 'lodash';
import reactotron from 'reactotron-react-native';
interface TitlesModalProps {
  values: {id: any; name: any}[];
  onConfirm: (args: any) => void;
  onHandleLoadMore: () => void;
  selected: {id: any; name: any} | any;
  mutliSelect: boolean;
  title: string;
}
interface ObjectsModalProps {
  values: {id: any; name: any}[];
  onConfirm: (args: any) => void;
  onHandleLoadMore: () => void;
  selected: {id: any; name: any; image: any} | any;
  mutliSelect: boolean;
  title: string;
}
export const Modal = {
  TitlesModal: (props: TitlesModalProps) => {
    const [selected, setselected] = React.useState(
      props?.selected && (props?.selected?.length > 0 || props?.selected?.id)
        ? props.selected
        : [],
    );
    const onSelectOne = (item: {id: any; name: any}) => {
      setselected(item);
    };
    const onSelectMulti = (item: {id: any; name: any}) => {
      setselected([...selected, item]);
    };
    const onDisSelectMulti = (item: {id: any; name: any}) => {
      let newSelectedItems = [...selected].filter(i => i !== item);
      setselected(newSelectedItems);
    };
    const UnSelectedIcon = () => {
      return (
        <MatIcon
          name="check-box-outline-blank"
          style={FilterStyles.filterBoxIcon}
          size={22}
        />
      );
    };
    const SelectedIcon = () => {
      return (
        <MatComIcon
          name="check-box-outline"
          style={FilterStyles.filterBoxIconSelected}
          size={22}
        />
      );
    };
    const SelectBox = (item: any, index: any, isSelected: boolean) => {
      return (
        <TouchableOpacity
          onPress={() =>
            props.mutliSelect
              ? isSelected
                ? onDisSelectMulti(item)
                : onSelectMulti(item)
              : onSelectOne(item)
          }
          key={index}
          style={FilterStyles.filterCheckBoxItem}>
          <Text style={FilterStyles.filterCheckBoxText}>{item?.name}</Text>
          {isSelected ? <SelectedIcon /> : <UnSelectedIcon />}
        </TouchableOpacity>
      );
    };
    const renderSelectOne = (item: any, index: any) => {
      return SelectBox(item, index, selected === item ? true : false);
    };
    const renderSelectMulti = (item: any, index: any) => {
      return SelectBox(
        item,
        index,
        selected?.findIndex((i: any) => i === item) >= 0 ? true : false,
      );
    };
    return (
      <ReactNativeModal
        isVisible={true}
        animationInTiming={800}
        animationIn="bounceInUp"
        style={{padding: 0, margin: 0}}>
        <View style={FilterStyles.bottomModal}>
          <Text style={FilterStyles.PrimaryText500}>{props.title}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            // onEndReached={() => props.onHandleLoadMore()}
            data={props?.values}
            renderItem={({item, index}) => (
              <React.Fragment key={index}>
                {props.mutliSelect
                  ? renderSelectMulti(item, index)
                  : renderSelectOne(item, index)}
              </React.Fragment>
            )}
          />
          <GradientButton
            onPress={() => props.onConfirm(selected)}
            buttonName="تأكيد"
            hasIcon={false}
            bR={32}
            pV={16}
            mgT={30}
            mgB={30}
            buttonWidth={width / 1.1}
            styleText={{
              fontFamily: Fonts.CBOLD,
              fontSize: 15,
              color: '#F6F6F6',
            }}
          />
        </View>
      </ReactNativeModal>
    );
  },
  ObjectsModal: (props: ObjectsModalProps) => {
    const [selected, setselected] = React.useState(
      props?.selected?.length > 0 ? props?.selected : [],
    );
    const onSelectOne = (item: {id: any; name: any}) => {
      setselected(item);
    };
    const onSelectMulti = (item: {id: any; name: any}) => {
      setselected([...selected, item]);
    };
    const onDisSelectMulti = (item: {id: any; name: any}) => {
      let newSelectedItems = [...selected].filter(i => i !== item);
      setselected(newSelectedItems);
    };
    const UnSelectedIcon = () => {
      return (
        <MatIcon
          name="check-box-outline-blank"
          style={FilterStyles.filterBoxIcon}
          size={22}
        />
      );
    };
    const SelectedIcon = () => {
      return (
        <MatComIcon
          name="check-box-outline"
          style={FilterStyles.filterBoxIconSelected}
          size={22}
        />
      );
    };
    const SelectBox = (item: any, index: any, isSelected: boolean) => {
      return (
        <TouchableOpacity
          onPress={() =>
            props.mutliSelect
              ? isSelected
                ? onDisSelectMulti(item)
                : onSelectMulti(item)
              : onSelectOne(item)
          }
          key={index}
          style={FilterStyles.filterCheckBoxItem}>
          <Text style={FilterStyles.filterCheckBoxText}>{item.name}</Text>
          {isSelected ? <SelectedIcon /> : <UnSelectedIcon />}
        </TouchableOpacity>
      );
    };
    const renderSelectOne = (item: any, index: any) => {
      return SelectBox(item, index, selected === item ? true : false);
    };
    const renderSelectMulti = (item: any, index: any) => {
      return SelectBox(
        item,
        index,
        selected?.findIndex((i: any) => i === item) >= 0 ? true : false,
      );
    };
    return (
      <ReactNativeModal
        isVisible={true}
        animationInTiming={800}
        animationIn="bounceInUp"
        style={{padding: 0, margin: 0}}>
        <View style={FilterStyles.bottomModal}>
          <Text style={FilterStyles.PrimaryText500}>{props.title}</Text>
          <FlatList
            // onEndReached={() => props.onHandleLoadMore()}
            data={props?.values}
            renderItem={({item, index}) => (
              <React.Fragment key={index}>
                {props.mutliSelect
                  ? renderSelectMulti(item, index)
                  : renderSelectOne(item, index)}
              </React.Fragment>
            )}
            showsVerticalScrollIndicator={false}
            style={FilterStyles.filterAuthersScroll}
          />
          <GradientButton
            onPress={() => props.onConfirm(selected)}
            buttonName="تأكيد"
            hasIcon={false}
            bR={32}
            pV={16}
            mgT={20}
            mgB={20}
            buttonWidth={width / 1.1}
            styleText={{
              fontFamily: Fonts.CBOLD,
              fontSize: 15,
              color: '#F6F6F6',
            }}
          />
        </View>
      </ReactNativeModal>
    );
  },
};
