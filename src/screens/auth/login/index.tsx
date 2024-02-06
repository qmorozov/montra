import { useState } from 'react';
import { View, Text, Button, Appearance } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '@services/typings/global';

const Login = () => {
  const navigation = useNavigation() as any;

  return (
    <View>
      <Text>Login</Text>
      <Button
        title={Screens.REGISTER}
        onPress={() => navigation.navigate(Screens.REGISTER)}
      />
    </View>
  );
};

export default Login;
