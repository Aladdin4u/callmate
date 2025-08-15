import { ThemedText } from '@/components/ThemedText';
import { callPhone } from '@/utils/call';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

const keys = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '#'],
];

export default function HomeScreen() {
  const [input, setInput] = useState('');

  const handlePress = (key: string) => {
    setInput((prev) => prev + key);
  };

  const handleBackPress = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCallPress = () => {
    if (input) callPhone(input);
  };

  return (
    <SafeAreaView className="bg-background flex-1 justify-between gap-10 px-5 py-14">
      <View className="flex flex-row items-center justify-between">
        <View>
          <ThemedText type="subtitle" className="text-primary">
            Welcome to CallMate
          </ThemedText>
          <ThemedText className="text-secondary">
            Fast, smart calling with reminders & scheduling.
          </ThemedText>
        </View>
        <Ionicons name="settings" className="text-secondary" size={24} />
      </View>

      <View className="gap-4">
        <ThemedText type="title" className="self-center">
          {input}
        </ThemedText>
        {keys.map((row, i) => (
          <View key={i} className="flex flex-row justify-between">
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                className="bg-accent  flex h-20 w-20 items-center justify-center rounded-full"
                onPress={() => handlePress(key)}>
                <ThemedText type="title" className="text-primary">
                  {key}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View className="flex flex-row items-center justify-between">
          <View className=" sr h-20 w-20"></View>
          <TouchableOpacity
            className="bg-secondary h-20 w-20 items-center justify-center rounded-full"
            onPress={handleCallPress}>
            <Ionicons name="call" size={32} />
          </TouchableOpacity>

          <TouchableOpacity className="h-20 w-20 items-center justify-center self-center rounded-full">
            <Ionicons
              name="arrow-back"
              className="text-secondary"
              size={32}
              onPress={handleBackPress}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
