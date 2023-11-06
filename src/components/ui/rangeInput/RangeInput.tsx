import React, { useState } from 'react';
import Typography from '../typography/Typography';

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
    <div className="flex flex-col">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        <Typography variant="h1">{name}</Typography>
      </label>
      <div className="flex flex-row space-x-4">
        <div className="w-20 mt-2">
          <Typography variant="md">
            <input
              type="number"
              name={`${name.toLowerCase()}_min`}
              id={`${name.toLowerCase()}_min`}
              value={minValue}
              onChange={handleOnChangeMinValue}
              onBlur={handleOnBlur}
              className="block w-full rounded-md border-0 py-1.5 pl-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Typography>
        </div>
        <div className="w-20 mt-2">
          <Typography variant="md">
            <input
              type="number"
              name={`${name.toLowerCase()}_max`}
              id={`${name.toLowerCase()}_max`}
              value={maxValue}
              onChange={handleOnChangeMaxValue}
              onBlur={handleOnBlur}
              className="block w-full rounded-md border-0 py-1.5 pl-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default RangeInput;
