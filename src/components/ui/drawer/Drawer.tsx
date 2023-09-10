import React, { PropsWithChildren } from 'react';
import { GoX } from 'react-icons/go';

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  title: string
};

function Drawer(props: PropsWithChildren<Props>) {
  const {
    isOpen, setIsOpen, title, children,
  } = props;

  return (

    <main
      className={
        `fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ${
          isOpen
            ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
            : ' transition-all delay-500 opacity-0 translate-x-full  '}`
      }
    >
      <section
        className={
          ` w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ${
            isOpen ? ' translate-x-0 ' : ' translate-x-full '}`
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <div className="flex flex-row justify-between">
            <header className="p-4 font-bold text-lg">{title}</header>
            <span onClick={() => setIsOpen(false)}><GoX /></span>
          </div>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </main>
  );
}

export default Drawer;
