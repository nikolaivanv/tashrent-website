import React from 'react';
import className from 'classnames';

type Props = {
  text: string
  lat: number
  lng: number
  markerId: string
  highlighted: boolean
  isCluster: boolean
  onClick: (markerId: string) => void
};

function Marker(props: Props) {
  const {
    text, markerId, highlighted, onClick, isCluster,
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(markerId);
    }
    e.stopPropagation();
  };

  const classes = className(
    {
      'z-10 inline-flex items-center rounded-md px-3 py-1 text-l text-white bg-raisin-black-500 hover:bg-raisin-black-600 shadow-sm': !isCluster,
      'z-10 flex justify-center items-center rounded-full h-12 w-12 text-l text-raisin-black-700 bg-green-gray-200 hover:bg-green-gray-300': isCluster,
      'z-10 px-5 py-2 bg-rust-500 text-white': highlighted && !isCluster,
    },
  );

  return (
    <div
      className={classes}
      onKeyUp={handleClick}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {text}
    </div>
  );
}

export default Marker;
