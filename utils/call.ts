import * as Linking from 'expo-linking';

export const callPhone = async(input: string) => {
  const url = `tel:${input}`;
  await Linking.openURL(url);
};
