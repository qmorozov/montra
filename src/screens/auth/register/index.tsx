import { SafeAreaView, Text, View } from 'react-native'
import GlobalStyles from '@styles/global'
import { MainHeader } from '@components/index'

const Register = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <MainHeader title="Register" />
      <View style={GlobalStyles.wrapper}>
        <Text>Register</Text>
      </View>
    </SafeAreaView>
  )
}

export default Register
