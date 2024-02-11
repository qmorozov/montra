import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Arrow } from '@assets/icons';

import styles from './headerStyles';
import { FC, ReactElement } from 'react';
interface IMainHeader {
  title: string;
  rightSide?: ReactElement;
  onPress?: () => void;
}

const MainHeader: FC<IMainHeader> = ({ title, rightSide = null, onPress }) => {
  const navigation = useNavigation();

  const handlePress = onPress || (() => navigation.goBack());

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handlePress}>
        <Arrow />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSide}>{rightSide && rightSide}</View>
    </View>
  );
};

export default MainHeader;
