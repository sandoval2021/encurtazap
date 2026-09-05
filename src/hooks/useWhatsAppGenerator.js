import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  addHistoryItem,
  clearHistoryStorage,
  loadHistory,
  persistHistory,
} from '../utils/storage.js';

import {
  buildWhatsAppLink,
  getFullPhoneNumber,
  normalizePhoneInput,
  validatePhoneNumber,
} from '../utils/whatsapp.js';

export function useWhatsAppGenerator() {
  const [ddi, setDdiState] = useState('55');
  const [phone, setPhoneState] = useState('');
  const [message, setMessage] = useState('');

  const [history, setHistory] =
    useState(loadHistory);

  const validation = useMemo(
    () => validatePhoneNumber(ddi, phone),
    [ddi, phone],
  );

  const generatedLink = useMemo(
    () =>
      buildWhatsAppLink({
        ddi,
        phone,
        message,
      }),
    [
      ddi,
      phone,
      message,
    ],
  );

  const setDdi = useCallback((newDdi) => {
    setDdiState(newDdi);

    setPhoneState((currentPhone) =>
      normalizePhoneInput(
        newDdi,
        currentPhone,
      ),
    );
  }, []);

  const setPhone = useCallback(
    (value) => {
      setPhoneState(
        normalizePhoneInput(
          ddi,
          value,
        ),
      );
    },
    [ddi],
  );

  const recordCurrentLink =
    useCallback(() => {
      if (!validation.valid || !generatedLink) {
        return;
      }

      const createdAt = Date.now();

      const historyItem = {
        id: `${createdAt}-${getFullPhoneNumber(
          ddi,
          phone,
        )}`,

        ddi,
        phone,
        message,
        url: generatedLink,
        createdAt,
      };

      setHistory((currentHistory) => {
        const newHistory =
          addHistoryItem(
            currentHistory,
            historyItem,
          );

        persistHistory(newHistory);

        return newHistory;
      });
    }, [
      ddi,
      phone,
      message,
      validation.valid,
      generatedLink,
    ]);

  const clearHistory =
    useCallback(() => {
      clearHistoryStorage();
      setHistory([]);
    }, []);

  return {
    ddi,
    phone,
    message,

    validation,
    generatedLink,
    history,

    setDdi,
    setPhone,
    setMessage,

    recordCurrentLink,
    clearHistory,
  };
}
