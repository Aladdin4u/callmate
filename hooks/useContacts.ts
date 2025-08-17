import { ContactType } from '@/types';
import * as Contacts from 'expo-contacts';
import { useCallback, useDeferredValue, useEffect, useState } from 'react';

export function useContacts(pageSize: number = 20) {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageOffset, setPageOffset] = useState(0);

  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // 🔹 Fetch one page of contacts
  const fetchContacts = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);
        setError(null);

        // Ask for permission if not already granted
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission denied');
          setPermissionGranted(false);
          return;
        }
        setPermissionGranted(true);

        const { data, hasNextPage: next } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
          pageSize,
          pageOffset: reset ? 0 : pageOffset,
          name: deferredQuery || undefined,
        });

        console.log('dda', data, hasNextPage);
        

        const formatted = data
          .filter((item) => item.phoneNumbers)
          .map((item, i) => {
            return {
              id: item.id + Date.now(),
              name: item.name,
              phone: item.phoneNumbers[0].number,
              image: item.imageAvailable ? item?.image?.uri : null,
            };
          });

        if (reset) {
          setContacts(formatted);
        } else {
          setContacts((prev) => [...prev, ...formatted]);
        }

        setHasNextPage(next);
        setPageOffset((prev) => (reset ? data.length : prev + data.length));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    },
    [pageOffset, pageSize, deferredQuery]
  );

  useEffect(() => {
    fetchContacts(true);
  }, [fetchContacts]);

  const loadMore = useCallback(() => {
    if (hasNextPage && !loading) {
      fetchContacts();
    }
  }, [hasNextPage, loading, fetchContacts]);

  // 🔹 Reset and refetch from page 0
  const refetch = useCallback(() => {
    setPageOffset(0);
    fetchContacts(true);
  }, [fetchContacts]);

  return {
    contacts,
    loading,
    error,
    permissionGranted,
    hasNextPage,
    loadMore,
    refetch,
    query,
    setQuery,
  };
}
