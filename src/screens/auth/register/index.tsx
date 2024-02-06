import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '@services/typings/global';

const Register = () => {
  const navigation = useNavigation() as any;

  return (
    <View>
      <Text>Register</Text>
      <Button
        title={Screens.LOGIN}
        onPress={() => navigation.navigate(Screens.LOGIN)}
      />
    </View>
  );
};

export default Register;
