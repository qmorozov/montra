import { memo } from 'react';
import { IVerificationTimer } from '@screens/auth/dto';
import { Text } from 'react-native';
import styles from '@screens/auth/styles';

const VerificationTimer = memo(({ timer }: IVerificationTimer) => {
  const minutes: string = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0');
  const seconds: string = (timer % 60).toString().padStart(2, '0');

  return (
    <Text
      style={[
        styles.verificationCodeTimerText,
        {
          opacity: timer === 0 ? 0.7 : 1,
          color: timer === 0 ? '#999' : '#7F3DFF',
        },
      ]}
    >
      {`${minutes}:${seconds}`}
    </Text>
  );
});

export default VerificationTimer;
