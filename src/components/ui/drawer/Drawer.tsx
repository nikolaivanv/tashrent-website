import React, { PropsWithChildren } from 'react';
import { GoX } from 'react-icons/go';
import { Button } from '../button/Button';
import Typography from '../typography/Typography';

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  title?: string
  side?: 'left' | 'right'
};

function Drawer(props: PropsWithChildren<Props>) {
  const {
    isOpen, setIsOpen, title = '', children, side = 'left',
  } = props;
  const position = side === 'left' ? 'left-0' : 'right-0';
  const offset = side === 'left' ? '-translate-x-full' : 'translate-x-full';

  return (

    <div
      className={
          `${position} z-10 absolute bg-white dark:bg-black h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ${
            isOpen ? ' translate-x-0 ' : offset}`
        }
    >
      <div className="relative flex flex-col h-full pb-4 space-y-4 overflow-y-scroll">
        <div className="flex flex-row items-center justify-between pt-2 pl-3">
          <header className="text-lg font-bold"><Typography variant="h1">{title}</Typography></header>
          <Button variant="ghost" onClick={() => setIsOpen(false)}><GoX size={30} /></Button>
          {/* <span }><GoX size={30} /></span> */}
        </div>
        {children}
      </div>
      {/* <section
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      /> */}
    </div>
  );
}

export default Drawer;
