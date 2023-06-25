import React from 'react';

type Props = {
  text: string
  lat: number
  lng: number
  markerId: string
};

function Marker(props: Props) {
  const { text } = props;
  return (
    <div className="px-1 py-1 bg-blue-300 text-black text-l rounded-md">
      {text}
    </div>
  );
}

export default Marker;
