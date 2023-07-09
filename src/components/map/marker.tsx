import React from 'react';
import className from 'classnames';

type Props = {
  text: string
  lat: number
  lng: number
  markerId: string
  highlighted: boolean
  onClick: (markerId: string) => void
};

function Marker(props: Props) {
  const {
    text, markerId, highlighted, onClick,
  } = props;
  const classes = className(
    'px-1 py-1 bg-blue-300 text-black text-l rounded-md',
    {
      'px-3 py-3 bg-blue-500 text-white': highlighted,
    },
  );

  return (
    <div
      className={classes}
      onKeyUp={() => (onClick ? onClick(markerId) : null)}
      onClick={() => (onClick ? onClick(markerId) : null)}
      role="button"
      tabIndex={0}
    >
      {text}
    </div>
  );
}

export default Marker;
