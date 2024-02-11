import { Text, SafeAreaView, View } from 'react-native'
import GlobalStyles from '@styles/global'
import { MainHeader } from '@components/index'

const Login = () => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <MainHeader title="Login" />
      <View style={GlobalStyles.wrapper}>
        <Text>Login</Text>
      </View>
    </SafeAreaView>
  )
}

export default Login
