import Input from '@/components/Input';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';

type ContactType = {
  id: string;
  name: string;
  image: string;
  phone: string;
};

const MOCK_CONTACTS = [
  {
    id: '1',
    name: 'Alice Johnson',
    phone: '+2348001112222',
    image: 'https://gravatar.com/avatar/8ee5935baf60e8484c78f108f594bdc1?s=400&d=robohash&r=x',
  },
  {
    id: '2',
    name: 'Ben Okafor',
    phone: '+2348003334444',
    image: 'https://robohash.org/4fda73dd97fbd2bacda6c3defcc84eb6?set=set4&bgset=&size=400x400',
  },
  {
    id: '3',
    name: 'Chinelo Eze',
    phone: '+2348005556666',
    image: 'https://gravatar.com/avatar/e3ac9583b64eb38f76c42d8855635332?s=400&d=robohash&r=x',
  },
];

export default function ContactScreen() {
  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState(MOCK_CONTACTS);

  const filtered = contacts.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.phone.includes(q);
  });

  const onCallPress = (contact: ContactType) => {
    Alert.alert('Call', `Would call ${contact.name} at ${contact.phone}`);
  };

  const Contact = ({ item }: { item: ContactType }) => {
    return (
      <View className="mb-4 flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <Avatar.Image size={32} source={{ uri: item.image }} />
          <ThemedText>{item.name}</ThemedText>
        </View>
        <TouchableOpacity
          className="bg-accent text-primary items-center justify-center rounded-full p-2"
          onPress={() => onCallPress(item)}>
          <Ionicons name="call" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const Header = () => {
    return (
      <View className="mb-10 gap-4">
        <ThemedText type="title" className="text-primary">
          Contacts
        </ThemedText>
        <Input
          placeholder="Search contacts or number"
          value={query}
          onChangeText={setQuery}
          left={<TextInput.Icon icon="account-search" />}
        />
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
