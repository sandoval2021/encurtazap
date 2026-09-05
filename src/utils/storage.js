const HISTORY_STORAGE_KEY =
  'whatsapp-link-generator-history-v1';

export const MAX_HISTORY_ITEMS = 5;

function isValidHistoryItem(item) {
  if (!item || typeof item !== 'object') {
    return false;
  }

  return (
    typeof item.id === 'string' &&
    typeof item.url === 'string' &&
    typeof item.ddi === 'string' &&
    typeof item.phone === 'string' &&
    typeof item.message === 'string' &&
    typeof item.createdAt === 'number'
  );
}

export function loadHistory() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const rawValue =
      window.localStorage.getItem(HISTORY_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter(isValidHistoryItem)
      .slice(0, MAX_HISTORY_ITEMS);
  } catch {
    return [];
  }
}

export function persistHistory(history) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS)),
    );
  } catch {
    /*
     * localStorage pode estar indisponível em determinados
     * modos privados ou políticas do navegador.
     *
     * A aplicação continua funcionando normalmente.
     */
  }
}

export function addHistoryItem(history, item) {
  const withoutDuplicate = history.filter(
    (historyItem) => historyItem.url !== item.url,
  );

  return [
    item,
    ...withoutDuplicate,
  ].slice(0, MAX_HISTORY_ITEMS);
}

export function clearHistoryStorage() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch {
    // Falha de storage não deve interromper a aplicação.
  }
}
