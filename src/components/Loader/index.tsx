import { ActivityIndicator, Modal, View } from 'react-native';
import loaderStyles from '@components/Loader/loaderStyles';

interface ILoader {
  visible: boolean;
}

const Loader = ({ visible }: ILoader) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={loaderStyles.wrapper}>
        <ActivityIndicator size="large" color="#7F3DFF" />
      </View>
    </Modal>
  );
};

export default Loader;
