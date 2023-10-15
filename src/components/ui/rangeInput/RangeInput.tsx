import React, { useState } from 'react';

type Props = {
  name: string
  boundMinValue: number
  boundMaxValue: number
  currentMinValue: number
  currentMaxValue: number
  onChange: (newMinValue: number, newMaxValue: number) => void
  onBlur: () => void
};

function RangeInput(props: Props) {
  const {
    name, boundMinValue, boundMaxValue, currentMinValue, currentMaxValue, onChange, onBlur,
  } = props;

  const [minValue, setMinValue] = useState(currentMinValue);
  const [maxValue, setMaxValue] = useState(currentMaxValue);

  const handleOnBlur = () => {
    const adjustedNewMaxValue = maxValue < minValue ? minValue : maxValue;
    setMaxValue(adjustedNewMaxValue);
    onBlur();
  };

  const handleOnChangeMinValue = (e) => {
    const newMinValue = parseInt(e.target.value);
    setMinValue(newMinValue);
    onChange(newMinValue, maxValue);
  };

  const handleOnChangeMaxValue = (e) => {
    const newMaxValue = parseInt(e.target.value);
    setMaxValue(newMaxValue);
    onChange(minValue, newMaxValue);
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
          onChange={handleOnChangeMinValue}
          onBlur={handleOnBlur}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div className="mt-2">
        <input
          type="number"
          name={`${name.toLowerCase()}_max`}
          id={`${name.toLowerCase()}_max`}
          value={maxValue}
          onChange={handleOnChangeMaxValue}
          onBlur={handleOnBlur}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default RangeInput;
