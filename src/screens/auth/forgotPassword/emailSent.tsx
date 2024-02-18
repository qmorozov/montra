import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmailSent as EmailSentIcon } from '@assets/icons';
import { Screens } from '@typings/global';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import styles from '../styles';
import GlobalStyles from '@styles/global';

const EmailSent = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<{ navigate: (screen: Screens) => void }>();

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={GlobalStyles.wrapper}>
        <EmailSentIcon style={styles.emailSentIcon} />

        <View style={styles.emailSentTextWrapper}>
          <Text style={styles.emailSentTitle}>{t('yourEmailIsOnTheWay')}</Text>
          <Text style={styles.emailSentText}>
            {t('checkYourEmailAndFollowTheInstructions', { email: '123213' })}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.LOGIN)}
          style={[GlobalStyles.primaryButton, { marginTop: 'auto' }]}
        >
          <Text style={GlobalStyles.primaryButtonText}>{t('backToLogin')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmailSent;
