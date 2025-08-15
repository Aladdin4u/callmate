import { ThemedText } from '@/components/ThemedText';
import { NotificationType } from '@/types';
import { formatedDate, formatTime12hr } from '@/utils/date';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Avatar, FAB } from 'react-native-paper';

export default function ReminderScreen() {
  const [contacts, setContacts] = useState<NotificationType[]>([]);

  useFocusEffect(
    useCallback(() => {
      getNotifications();

      return () => {
        // This code runs when the screen is unfocused or unmounted
      };
    }, [])
  );

  const getNotifications = async () => {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      const mapped = notifications.map((item: any, i) => {
        const data = item?.content?.data;
        return {
          id: data.id,
          name: data?.contact.name,
          phone: data?.contact.phone,
          image: data?.contact.image,
          date: data.date,
          time: data.time,
        };
      });
      setContacts(mapped);
    } catch (error) {
      console.error(error);
    }
  };

  const Reminder = ({ item }: { item: NotificationType }) => {
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
            <ThemedText>{formatedDate(item.date)}</ThemedText>
            <ThemedText>{formatTime12hr(item.time)}</ThemedText>
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
        renderItem={({ item }: { item: NotificationType }) => <Reminder item={item} />}
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
