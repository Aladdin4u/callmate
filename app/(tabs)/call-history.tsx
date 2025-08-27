import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { CallType } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, PermissionsAndroid, SafeAreaView, View } from 'react-native';
import CallLogs from 'react-native-call-log';

export default function CallHistoryScreen() {
  const [query, setQuery] = useState('');
  const [callLogs, setcallLogs] = useState([]);

  const readLogs = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log Example',
          message: 'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        CallLogs.load(20).then((c) => setcallLogs(c));
      } else {
        console.log('Call Log permission denied');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    readLogs();
  }, []);

  const Contact = ({ item }: { item: CallType }) => {
    return (
      <View className="mb-4 flex flex-row items-center justify-between px-5">
        <View className="flex flex-row items-center gap-2">
          <MaterialIcons
            name={
              item.type === 'MISSED'
                ? 'call-missed'
                : item.type === 'INCOMING'
                  ? 'call-received'
                  : 'call-made'
            }
            size={24}
            color={
              item.type === 'MISSED'
                ? Colors.accent
                : item.type === 'INCOMING'
                  ? Colors.primary
                  : Colors.border
            }
          />
          <View>
            <ThemedText>{item.name}</ThemedText>
            <ThemedText className="text-secondary">{item.phoneNumber}</ThemedText>
          </View>
        </View>
        <ThemedText>{item.dateTime}</ThemedText>
      </View>
    );
  };

  const Header = () => {
    return (
      <View className="px-5">
        <ThemedText type="title" className="text-primary">
          Call History
        </ThemedText>
      </View>
    );
  };
  return (
    <SafeAreaView className="flex-1 justify-between gap-10 bg-background pt-14">
      <Header />
      <FlatList
        data={callLogs}
        renderItem={({ item }: { item: CallType }) => <Contact item={item} />}
        keyExtractor={(item) => item.timestamp}
        ListEmptyComponent={
          <ThemedText style={{ textAlign: 'center' }}>No callLogs found.</ThemedText>
        }
      />
    </SafeAreaView>
  );
}
