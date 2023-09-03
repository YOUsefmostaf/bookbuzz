import {StackNavigationProp} from '@react-navigation/stack';
import {HeaderApp} from 'components';
import * as React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-animatable';
import {DrawerParamsList} from 'src/navigation/paramsList';
import {hp} from 'theme';
import DrawerStyles from '../drawerStyles';

interface TermsProps {
  navigation: StackNavigationProp<DrawerParamsList, 'SettingsS'>;
}

const Terms: React.FC<TermsProps> = props => {
  return (
    <>
      <HeaderApp
        title="Terms and Conditions"
        mt={hp(8)}
        hasBack={true}
        backPress={() => props.navigation.navigate('bottomScreens')}
      />

      <View style={DrawerStyles.Settings.desc}>
        <Text style={DrawerStyles.Settings.descText}>
          {/* لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
          أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
          انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي
          يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن
          ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت نيولا
          باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت
          ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم. */}
          Lorem Ipsum Dollar Set Amit, Conciectator Adaiba Yesking Aliyeet, Set Do
           iOSMod Tempor UncaidedIdentity Labor at Dollar Magna Aliquia. Ut
           Anime Ad Minim Feminine Kiwas Nostril Elixir Situation Yllamco Laboras Nessie
           It Alicube x Aia Commodo Consequate. Diwas ayuti ariri dollar inn
           Reprehender Ait Voluptate Villette ACCI Kyllium Dollar Ayo Vegetarian Neola
           pararator. Accceptor saint okkikat cupidate non provident
           , Sent in Kulpa Q Ophicia DesirionTmulet Anime Eddie East Laborium.
        </Text>
      </View>
    </>
  );
};

export default Terms;
