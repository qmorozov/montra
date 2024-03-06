import { Button, Text, View } from 'react-native';
import { useService } from '@hooks/useService';
import { AuthServiceProvider } from '@screens/auth/services/auth.service';
import { useEffect } from 'react';
import { AuthApi } from '@screens/auth/services/api.service';
import { MainServiceProvider } from '@screens/main/services/main.service';

const Home = () => {
  const AuthService = useService(AuthServiceProvider);
  // const MainService = useService(MainServiceProvider);
  //
  // const fetch = async () => {
  //   const token = await MainService.getAllDataFromStorage();
  //
  //   if (token) {
  //     const { refreshToken, accessToken } = token['@tokens'];
  //
  //     const user = await AuthApi.getUserData(accessToken);
  //     console.log(user);
  //   }
  // };
  //
  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    <View style={{ marginTop: 200 }}>
      <Text>HOME</Text>

      <Button
        title="Logout"
        onPress={() => AuthService.updateSignInData(false)}
      />
    </View>
  );
};

export default Home;
