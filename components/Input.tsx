import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextInput, TextInputProps } from 'react-native-paper';

type Props = TextInputProps & {};

export default function Input({ ...rest }: Props) {
  return (
    <TextInput mode="outlined" style={styles.input} outlineStyle={styles.outlineStyle} {...rest} />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderRadius: 6,
  },
  outlineStyle: {
    borderColor: Colors.border,
    outline: Colors.border,
  },
});
