import SearchBar from '@/components/Searchbar';
import { ThemedText } from '@/components/ThemedText';
import { MOCK_CONTACTS } from '@/data/contacts';
import { callPhone } from '@/utils/call';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';

type ContactType = {
  id: string;
  name: string;
  image: string;
  phone: string;
};

export default function ContactScreen() {
  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState(MOCK_CONTACTS);

  const filtered = contacts.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return c.name.toLowerCase().includes(q) || c.phone.includes(q);
  });

  const onCallPress = (contact: ContactType) => {
    callPhone(contact.phone);
  };

  const Contact = ({ item }: { item: ContactType }) => {
    return (
      <View className="my-4 flex flex-row items-center justify-between px-5">
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

  return (
    <SafeAreaView className="bg-background flex-1 justify-between gap-2 py-14">
      <View className="bg-background gap-4 px-5">
        <ThemedText type="title" className="text-primary">
          Contacts
        </ThemedText>
        <SearchBar placeholder="Search contacts or number" value={query} onChangeText={setQuery} />
      </View>
      <FlatList
        data={filtered}
        renderItem={({ item }: { item: ContactType }) => <Contact item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ThemedText style={{ textAlign: 'center' }}>No contacts found.</ThemedText>
        }
      />
    </SafeAreaView>
  );
}
