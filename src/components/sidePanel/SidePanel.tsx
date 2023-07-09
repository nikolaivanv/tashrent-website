import React, { PropsWithChildren } from 'react';
import { GoX } from 'react-icons/go';

type Props = {
  title: string
  onClose: () => void
};

function SidePanel(props: PropsWithChildren<Props>) {
  const { title, onClose, children } = props;

  return (
    <div className="fixed inset-0 w-full min-h-screen bg-white z-10 md:w-1/3">
      <div className="flex flex-row justify-between">
        <span>{title}</span>
        <span onClick={onClose}><GoX /></span>
      </div>
      {children}
    </div>
  );
}

export default SidePanel;
