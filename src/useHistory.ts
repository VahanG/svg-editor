import { useState, useCallback } from 'react';

function useHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setHistoryItem = useCallback(
    (newState: any) => {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(newState);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    },
    [history, currentIndex],
  );

  const undo = useCallback(() => {
    const newIndex = currentIndex - 1;

    if (currentIndex > 0) {
      setCurrentIndex(newIndex);
      return history[newIndex];
    }
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    const newIndex = currentIndex + 1;
    if (currentIndex < history.length - 1) {
      setCurrentIndex(newIndex);
    }
    return history[newIndex];
  }, [currentIndex, history]);

  const current = history[currentIndex];

  return { setHistoryItem, current, undo, redo };
}

export default useHistory;
