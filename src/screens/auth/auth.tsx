import { Screens } from '@services/typings/global';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';
import { IAuthSlide } from './dto/auth';

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
    <View style={styles.container}>
      <View style={styles.top}>
        <Swiper
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
            style={styles.registerButton}
            onPress={() => navigation.navigate(Screens.REGISTER)}
          >
            <Text style={styles.registerButtonText}>{t('signUp')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate(Screens.LOGIN)}
          >
            <Text style={styles.loginButtonText}>{t('login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Auth;
