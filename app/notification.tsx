import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function NotificationScreen() {
  const handleAcceptPress = () => {
    router.replace('/(tabs)');
  };

  const handleCancelPress = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="bg-background flex-1 items-center justify-center gap-10 px-5 py-14">
      <MaterialIcons
        name="notifications-on"
        size={100}
        color={Colors.accent}
        className="bg-secondary items-center justify-center rounded-full p-4"
      />
      <ThemedText type="title" className="text-primary">
        Can We Notify You?
      </ThemedText>
      <ThemedText className="text-secondary">
        We use notifications to keep you updated about your schedule, reminders, and important
        changes in real-time. Please allow notification access so you don’t miss anything important.
      </ThemedText>

      <View className="w-full gap-4">
        <Button
          mode="contained"
          onPress={handleAcceptPress}
          className="font-inter w-full rounded-sm px-3 py-2"
          buttonColor="#868B8E">
          Allow
        </Button>

        <Button
          mode="outlined"
          onPress={handleCancelPress}
          className="font-inter w-full rounded-sm px-3 py-2">
          Not Allow
        </Button>
      </View>
    </SafeAreaView>
  );
}
