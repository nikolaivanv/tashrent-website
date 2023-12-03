import React from 'react';
import { Heart } from 'react-feather';
import classNames from 'classnames';

type Props = {
  isSaved: boolean;
  onToggleSave(): void;
};

export default function BookmarkButton(props: Props) {
  const { isSaved, onToggleSave } = props;
  const handleClick = () => {
    onToggleSave();
  };

  return (
    <button type="button" className="w-6 h-6" onClick={handleClick}>
      <Heart className={classNames({ 'fill-mint-700': isSaved }, 'stroke-mint-700')} />
    </button>
  );
}
