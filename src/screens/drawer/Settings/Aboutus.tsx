import {StackNavigationProp} from '@react-navigation/stack';
import {HeaderApp} from 'components';
import * as React from 'react';
import {View} from 'react-native';
import {Image, Text} from 'react-native-animatable';
import {DrawerParamsList} from 'src/navigation/paramsList';
import DrawerStyles from '../drawerStyles';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {hp} from 'theme';
interface AboutProps {
  navigation: StackNavigationProp<DrawerParamsList, 'SettingsS'>;
}

const About: React.FC<AboutProps> = props => {
  return (
    <>
      <HeaderApp
        title="About Us"
        mt={hp(8)}
        hasBack={true}
        backPress={() => props.navigation.navigate('bottomScreens')}
      />
      <View style={DrawerStyles.Settings.container}>
        <Image
          source={require('assets/images/bookFair.jpeg')}
          style={DrawerStyles.Settings.bookImg}
        />
        <View style={DrawerStyles.Settings.desc}>
          <Text style={DrawerStyles.Settings.descText}>
            {/* لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي
            يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن
            ريبريهينديرأيت فوليوبتاتي */}
            Lorem Ipsum Dollar Set Amit, Conciectator Adaiba Yesking Aliyeet, Set Do
             iOSMod Tempor UncaidedIdentity Labor at Dollar Magna Aliquia. Ut
             Anime Ad Minim Feminine Kiwas Nostril Elixir Situation Yllamco Laboras Nessie
             It Alicube x Aia Commodo Consequate. Diwas ayuti ariri dollar inn
             ReprehenderEight Voluptate
          </Text>
        </View>
        <Text style={DrawerStyles.Settings.socialText}>Follow us on</Text>
        <View style={DrawerStyles.Settings.social}>
          <EntypoIcon
            name="vimeo"
            color="white"
            style={DrawerStyles.Settings.icon}
            size={15}
          />
          <AntIcon
            name="twitter"
            color="white"
            style={DrawerStyles.Settings.icon}
            size={15}
          />
          <AntIcon
            name="instagram"
            color="white"
            style={DrawerStyles.Settings.icon}
            size={15}
          />
          <EvilIcon
            name="sc-facebook"
            color="white"
            style={DrawerStyles.Settings.icon}
            size={25}
          />
        </View>
      </View>
    </>
  );
};

export default About;
