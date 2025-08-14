import { ThemedText } from '@/components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Avatar, FAB } from 'react-native-paper';

type ContactType = {
  id: string;
  name: string;
  image: string;
  phone: string;
  date: string;
  time: string;
};

const MOCK_CONTACTS = [
  {
    id: '1',
    name: 'Alice Johnson',
    phone: '+2348001112222',
    image: 'https://gravatar.com/avatar/8ee5935baf60e8484c78f108f594bdc1?s=400&d=robohash&r=x',
    date: '8/13/2025',
    time: '22:36:29',
  },
  {
    id: '2',
    name: 'Ben Okafor',
    phone: '+2348003334444',
    image: 'https://robohash.org/4fda73dd97fbd2bacda6c3defcc84eb6?set=set4&bgset=&size=400x400',
    date: '8/13/2025',
    time: '22:36:29',
  },
  {
    id: '3',
    name: 'Chinelo Eze',
    phone: '+2348005556666',
    image: 'https://gravatar.com/avatar/e3ac9583b64eb38f76c42d8855635332?s=400&d=robohash&r=x',
    date: '8/13/2025',
    time: '22:36:29',
  },
];

export default function ReminderScreen() {
  const [contacts, setContacts] = useState(MOCK_CONTACTS);

  const Reminder = ({ item }: { item: ContactType }) => {
    return (
      <View className="mb-4 flex w-full flex-row justify-between gap-2">
        <View className="flex flex-row items-center gap-2">
          <Avatar.Image size={32} source={{ uri: item.image }} />
          <View>
            <ThemedText className="text-primary">{item.name}</ThemedText>
            <ThemedText className="text-secondary">{item.phone}</ThemedText>
          </View>
        </View>
        <View className="items-end gap-2">
          <MaterialCommunityIcons name="alarm-multiple" size={24} />
          <View className="flex flex-row justify-end gap-2">
            <ThemedText>{item.date}</ThemedText>
            <ThemedText>{item.time}</ThemedText>
          </View>
        </View>
      </View>
    );
  };

  const Header = () => {
    return (
      <View className="mb-10 gap-4">
        <ThemedText type="title" className="text-primary">
          Scheduled events
        </ThemedText>
      </View>
    );
  };
  return (
    <SafeAreaView className="bg-background flex-1 justify-between gap-10 px-5 py-14">
      <FlatList
        data={contacts}
        renderItem={({ item }: { item: ContactType }) => <Reminder item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <ThemedText style={{ textAlign: 'center' }}>No scheduled reminders</ThemedText>
        }
      />
      <FAB
        icon="plus"
        className="absolute bottom-0 right-0"
        size="large"
        onPress={() => router.navigate('/(tabs)/add-reminder')}
      />
    </SafeAreaView>
  );
}
