import { Screens } from '@services/typings/global';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';
import { IAuthSlide } from './dto';
import GlobalStyles from '@styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

const Auth = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<{ navigate: (screen: Screens) => void }>();

  const slides: IAuthSlide[] = [
    {
      id: 1,
      title: t('mainSlides.slide_1.title'),
      description: t('mainSlides.slide_1.description'),
      image: require('@assets/images/picture_1.png'),
    },
    {
      id: 2,
      title: t('mainSlides.slide_2.title'),
      description: t('mainSlides.slide_2.description'),
      image: require('@assets/images/picture_2.png'),
    },
    {
      id: 3,
      title: t('mainSlides.slide_3.title'),
      description: t('mainSlides.slide_3.description'),
      image: require('@assets/images/picture_3.png'),
    },
  ];

  return (
    <SafeAreaView style={[GlobalStyles.wrapper, GlobalStyles.droidSafeArea]}>
      <View style={styles.top}>
        <Swiper
          autoplay={true}
          autoplayTimeout={6}
          dotStyle={styles.slideDot}
          paginationStyle={styles.paginationStyle}
          activeDotStyle={styles.activeDotStyle}
        >
          {slides.map(({ id, image, title, description }: IAuthSlide) => (
            <View key={id} style={styles.slide}>
              <Image style={styles.slideImage} source={image} />
              <View style={styles.slideTextWrapper}>
                <Text style={styles.slideTitle}>{title}</Text>
                <Text style={styles.slideDescription}>{description}</Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>

      <View style={styles.bottom}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={GlobalStyles.primaryButton}
            onPress={() => navigation.navigate(Screens.REGISTER)}
          >
            <Text style={GlobalStyles.primaryButtonText}>{t('signUp')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.secondaryButton}
            onPress={() => navigation.navigate(Screens.VERIFICATION)}
          >
            <Text style={GlobalStyles.secondaryButtonText}>{t('login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Auth;
