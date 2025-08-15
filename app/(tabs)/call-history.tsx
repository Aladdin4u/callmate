import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { formatTime12hr } from '@/utils/date';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

type ContactType = {
  id: string;
  name: string;
  phone: string;
  type: 'missed' | 'incomming' | 'ougoing';
  time: Date;
};

const MOCK_CONTACTS = [
  {
    id: '1',
    name: 'Alice Johnson',
    phone: '+2348001112222',
    type: 'missed',
    time: 1755167934170,
  },
  {
    id: '2',
    name: 'Ben Okafor',
    phone: '+2348003334444',
    type: 'incomming',
    time: 1755167934170,
  },
  {
    id: '3',
    name: 'Chinelo Eze',
    phone: '+2348005556666',
    type: 'outgoing',
    time: 1755167934170,
  },
];

export default function CallHistoryScreen() {
  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState(MOCK_CONTACTS);

  const filtered = contacts.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.phone.includes(q);
  });

  const Contact = ({ item }: { item: ContactType }) => {
    return (
      <View className="mb-4 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <MaterialIcons
            name={
              item.type === 'missed'
                ? 'call-missed'
                : item.type === 'incomming'
                  ? 'call-received'
                  : 'call-made'
            }
            size={24}
            color={
              item.type === 'missed'
                ? Colors.accent
                : item.type === 'incomming'
                  ? Colors.primary
                  : Colors.border
            }
          />
          <View>
            <ThemedText>{item.name}</ThemedText>
            <ThemedText className="text-secondary">{item.phone}</ThemedText>
          </View>
        </View>
        <ThemedText>{formatTime12hr(item.time)}</ThemedText>
      </View>
    );
  };

  const Header = () => {
    return (
      <View className="mb-10 gap-4">
        <ThemedText type="title" className="text-primary">
          Call History
        </ThemedText>
      </View>
    );
  };
  return (
    <SafeAreaView className="bg-background flex-1 justify-between gap-10 px-5 py-14">
      <FlatList
        data={filtered}
        renderItem={({ item }: { item: ContactType }) => <Contact item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <ThemedText style={{ textAlign: 'center' }}>No contacts found.</ThemedText>
        }
      />
    </SafeAreaView>
  );
}
