import SearchBar from '@/components/Searchbar';
import { ThemedText } from '@/components/ThemedText';
import { useContacts } from '@/hooks/useContacts';
import { ContactType } from '@/types';
import { callPhone } from '@/utils/call';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar, HelperText } from 'react-native-paper';

export default function ContactScreen() {
  const pageSize = 20;

  const { contacts, loading, error, loadMore, hasNextPage, query, setQuery } =
    useContacts(pageSize);

  const onCallPress = (contact: ContactType) => {
    callPhone(contact.phone);
  };

  const onEndReach = () => {
   if (hasNextPage) loadMore();
  };

  const Contact = ({ item }: { item: ContactType }) => {
    return (
      <View className="my-4 flex flex-row items-center justify-between px-5">
        <View className="flex flex-row items-center gap-2">
          <Avatar.Image size={32} source={{ uri: item?.image }} />
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
    <SafeAreaView className="bg-background flex-1 justify-between gap-2 pt-14">
      <View className="bg-background gap-4 px-5">
        <ThemedText type="title" className="text-primary">
          Contacts
        </ThemedText>
        <SearchBar placeholder="Search contacts or number" value={query} onChangeText={setQuery} />
      </View>
      {error && <HelperText type="error">{error}</HelperText>}
      <FlatList
        data={contacts}
        renderItem={({ item }: { item: ContactType }) => <Contact item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="my-4" />
          ) : (
            <ThemedText style={{ textAlign: 'center' }}>No contacts found.</ThemedText>
          )
        }
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
