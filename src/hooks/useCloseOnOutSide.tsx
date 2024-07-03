import { RefObject, useCallback, useEffect } from 'react';

export const useCloseOnOutSideClick = (
  isOpen: boolean,
  onClose: () => void,
  refsArray: RefObject<HTMLElement>[] = []
) => {
  const handleBackgroundClick = useCallback(
    (event: MouseEvent): void => {
      if (isOpen) {
        const isInsideRefs = refsArray.some((ref) => ref.current?.contains(event.target as Node));

        if (!isInsideRefs) {
          onClose();
        }
      }
    },
    [isOpen, onClose, refsArray]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleBackgroundClick);
    } else {
      window.removeEventListener('click', handleBackgroundClick);
    }

    return () => {
      window.removeEventListener('click', handleBackgroundClick);
    };
  }, [isOpen, handleBackgroundClick]);
};
