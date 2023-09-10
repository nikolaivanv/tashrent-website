import React, { useState } from 'react';

type Props = {
  name: string
  boundMinValue: number
  boundMaxValue: number
  currentMinValue: number
  currentMaxValue: number
  onChange: (newMinValue: number, newMaxValue: number) => void
};

function RangeInput(props: Props) {
  const {
    name, boundMinValue, boundMaxValue, currentMinValue, currentMaxValue,
  } = props;

  const [minValue, setMinValue] = useState(currentMinValue);
  const [maxValue, setMaxValue] = useState(currentMaxValue);

  const validate = (newMinValue: number, newMaxValue: number) => {
    const adjustedNewMaxValue = newMaxValue < newMinValue ? newMinValue : newMaxValue;
    setMinValue(minValue);
    setMaxValue(adjustedNewMaxValue);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {name}
      </label>
      <div className="mt-2">
        <input
          type="number"
          name={`${name.toLowerCase()}_min`}
          id={`${name.toLowerCase()}_min`}
          value={minValue}
          onChange={(e) => setMinValue(parseInt(e.target.value))}
          onBlur={(e) => validate(parseInt(e.target.value), maxValue)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="mt-2">
        <input
          type="number"
          name={`${name.toLowerCase()}_max`}
          id={`${name.toLowerCase()}_max`}
          value={maxValue}
          onChange={(e) => setMaxValue(parseInt(e.target.value))}
          onBlur={(e) => validate(minValue, parseInt(e.target.value))}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default RangeInput;
