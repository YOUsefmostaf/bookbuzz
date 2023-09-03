import React from 'react';
import {View} from 'react-native';
// import {LOGOHOME, BACKD} from 'constants/icons';

export const HeaderDrawer = ({onPress}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 27,
        marginBottom: 65,
        alignItems: 'center',
      }}>
      {/* <BACKD style={{paddingLeft: 16, paddingRight: 17.5}} onPress={onPress} />
      <LOGOHOME /> */}
    </View>
  );
};
