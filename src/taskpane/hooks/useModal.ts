import { useState } from "react";

const useModal = (): {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
} => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
};

export default useModal;