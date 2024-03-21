import { useState } from "react";

export const useDrawer = (value: boolean) => {
  const [isOpen, setIsOpen] = useState(value);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
  };
};
