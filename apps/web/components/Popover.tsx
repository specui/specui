import React, { useRef, useEffect, Ref, useState, RefObject } from 'react';
import { createPortal } from 'react-dom';

interface PopoverProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  target?: RefObject<HTMLButtonElement>;
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  onClose = () => {},
  isOpen = false,
  position = 'bottom',
  target,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (!target) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        !target.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleResize = () => {
      const left = (target.current?.getBoundingClientRect().left || 0) - 8;

      const top =
        (target.current?.getBoundingClientRect().top || 0) +
        (target.current?.getBoundingClientRect().height || 0) +
        5;

      setLeft(left);
      setTop(top);
    };

    handleResize();

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [onClose, target]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="bg-white border border-gray-200 fixed rounded-md dark:bg-gray-900"
      ref={contentRef}
      style={{
        left,
        top,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};
