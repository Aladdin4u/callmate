import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View className="bg-background flex-1 items-center justify-center">
        <Text className="text-primary font-inter text-2xl font-bold">Welcome to Nativewind!</Text>
        <Text className="text-secondary font-inter text-xl font-bold">Welcome to Nativewind!</Text>
        <Text className=" text-xl font-bold">Welcome to no font!</Text>
        <View className="bg-accent rounded-md px-3 py-2">
          <Text className="text-xl font-bold text-background">call me</Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
