import SearchBar from '@/components/Searchbar';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { MOCK_CONTACTS } from '@/data/contacts';
import { ContactType, ScheduleFormValues } from '@/types';
import { getSecondsFormatter } from '@/utils/date';
import { schedulePushNotification } from '@/utils/schedulePushNotification';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, HelperText, List, Modal, Portal } from 'react-native-paper';

import * as Yup from 'yup';

const ScheduleSchema = Yup.object().shape({
  contact: Yup.object({
    id: Yup.string().required(),
    name: Yup.string().required(),
    phone: Yup.string(),
    image: Yup.string().nullable(),
  }).required('Contact is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.date().required('Time is required'),
});

export default function AddReminderScreen() {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [date, setDate] = useState(new Date());
  const [showDate, setshowDate] = useState(false);
  const [showTime, setshowTime] = useState(false);
  const [contacts, setContacts] = useState<ContactType[]>(MOCK_CONTACTS);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Contacts.requestPermissionsAsync();
  //     if (status === 'granted') {
  //       const { data } = await Contacts.getContactsAsync({
  //         fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
  //       });

  //       if (data.length > 0) {
  //         const mapped = data.map((item, i) => {
  //           if (item.name && item.phoneNumbers && item.phoneNumbers.length > 0) {
  //             return {
  //               id: item.id,
  //               name: item.name,
  //               phone: item.phoneNumbers[0].number,
  //               image: item.imageAvailable ? item?.image?.uri : null,
  //             };
  //           }
  //         });

  //         setContacts(mapped);
  //       }
  //     }
  //   })();
  // }, []);

  const filtered = contacts.slice(0, 20).filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return c?.name.toLowerCase().includes(q) || c?.phone.includes(q);
  });

  const onSubmit = async (
    values: FormikValues,
    { resetForm }: FormikHelpers<ScheduleFormValues>
  ) => {
    const triggerSeconds = getSecondsFormatter(values.date, values.time);
    if (triggerSeconds.seconds > 0) {
      try {
        values.id = values.contact.id + Date.now();
        // convert date and time back to string
        values.date = new Date(values.date).toISOString();
        values.time = new Date(values.time).toISOString();

        const res = await schedulePushNotification(values, triggerSeconds.seconds);
        if (res) {
          resetForm();
          Alert.alert('Scheduled', `Notification scheduled in ${triggerSeconds.humanSeconds}`);
          router.replace('/(tabs)/reminder');
        }
      } catch (e) {
        console.error(e);
        return Alert.alert('Error', 'Faild to login');
      }
    } else {
      Alert.alert('Error', 'Date and time must be greater than now');
    }
  };

  return (
    <SafeAreaView className="bg-background flex-1 px-5 py-14">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={{
              contact: {
                id: '',
                name: '',
                image: '',
                phone: '',
              },
              date: '',
              time: '',
            }}
            validationSchema={ScheduleSchema}
            onSubmit={onSubmit}>
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
              <View className="flex flex-col justify-between gap-10">
                <View>
                  <ThemedText type="title" className="text-primary">
                    Create Reminder
                  </ThemedText>
                  <ThemedText type="subtitle" className="text-secondary">
                    Schedule a call
                  </ThemedText>
                </View>

                <View className="gap-2">
                  <ThemedText>Select Contact</ThemedText>

                  <Portal>
                    <Modal
                      visible={visible}
                      onDismiss={hideModal}
                      contentContainerStyle={styles.containerStyle}>
                      <View className="sticky top-0 z-10 mt-2 w-full px-4">
                        <SearchBar
                          placeholder="Search contacts or number"
                          value={query}
                          onChangeText={setQuery}
                        />
                      </View>
                      <ScrollView className="flex-1 divide-y overflow-y-auto px-4 ">
                        {filtered.length > 0 ? (
                          filtered.map((item, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setFieldValue('contact', item);
                                setVisible(false);
                              }}>
                              <List.Item
                                title={item?.name}
                                description={item?.phone}
                                left={(props) => <List.Icon {...props} icon="phone" />}
                              />
                            </TouchableOpacity>
                          ))
                        ) : (
                          <ThemedText className="text-center">No contact found</ThemedText>
                        )}
                      </ScrollView>
                    </Modal>
                  </Portal>
                  <Button
                    mode="outlined"
                    className="font-inter rounded-sm bg-green-50 px-3 py-2"
                    onPress={showModal}>
                    {values.contact.name
                      ? `${values.contact.name} - ${values.contact.phone}`
                      : 'Choose contact'}
                  </Button>
                  {touched.contact && errors.contact && (
                    <HelperText type="error" visible={true}>
                      {errors.contact.name}
                    </HelperText>
                  )}
                </View>

                <View className="gap-2">
                  <TouchableOpacity
                    className="flex flex-row items-center justify-between gap-2"
                    onPress={() => setshowDate(true)}>
                    <ThemedText>Select Date</ThemedText>
                    <MaterialCommunityIcons name="calendar-clock-outline" size={24} />
                  </TouchableOpacity>

                  {values.date && (
                    <ThemedText type="subtitle" className="text-secondary">
                      {new Date(values.date).toDateString()}
                    </ThemedText>
                  )}
                  {showDate && (
                    <DateTimePicker
                      mode="date"
                      value={date}
                      onChange={(event, selectedDate) => {
                        setshowDate(false);
                        if (event.type === 'set') {
                          setFieldValue('date', selectedDate);
                        }
                      }}
                    />
                  )}
                  {touched.date && errors.date && (
                    <HelperText type="error" visible={true}>
                      {errors.date}
                    </HelperText>
                  )}
                </View>

                <View className="gap-2">
                  <TouchableOpacity
                    className="flex flex-row items-center justify-between gap-2"
                    onPress={() => setshowTime(true)}>
                    <ThemedText>Select Time</ThemedText>
                    <MaterialCommunityIcons name="alarm" size={24} />
                  </TouchableOpacity>
                  {values.time && (
                    <ThemedText type="subtitle" className="text-secondary">
                      {new Date(values.time).toLocaleTimeString()}
                    </ThemedText>
                  )}
                  {showTime && (
                    <DateTimePicker
                      mode="time"
                      value={date}
                      onChange={(event, selectedTime) => {
                        setshowTime(false);
                        if (event.type === 'set') {
                          setFieldValue('time', selectedTime);
                        }
                      }}
                    />
                  )}
                  {touched.time && errors.time && (
                    <HelperText type="error" visible={true}>
                      {errors.time}
                    </HelperText>
                  )}
                </View>

                <Button
                  mode="contained"
                  onPress={(e) => handleSubmit()}
                  className="font-inter rounded-sm bg-green-50 px-3 py-2"
                  buttonColor="#868B8E"
                  disabled={errors.contact != null || errors.date != null || errors.time != null}>
                  Add Reminder
                </Button>
              </View>
            )}
          </Formik>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.background,
    margin: 40,
    borderRadius: 6,
    height: 500,
    overflow: 'hidden',
  },
});
