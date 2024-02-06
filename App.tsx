import { Provider } from 'react-redux';
import store from '@services/app-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Register } from '@screens/auth';
import { Screens } from '@services/typings/global';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Screens.LOGIN}>
          <Stack.Screen name={Screens.LOGIN} component={Login} />
          <Stack.Screen name={Screens.REGISTER} component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
