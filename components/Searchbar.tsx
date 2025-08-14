import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import { Searchbar, SearchbarProps } from 'react-native-paper';

type Props = SearchbarProps & {};

export default function SearchBar({ ...rest }: Props) {
  return <Searchbar style={styles.input} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.background,
    borderColor: Colors.border,
    borderRadius: 6,
  },
});
