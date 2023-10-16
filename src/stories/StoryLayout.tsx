import React from 'react';
import classNames from 'classnames';

interface IStoryArgs {
  className?: string;
  children?: React.ReactNode;
  noPadding?: boolean;
}

function StoryLayout(args: IStoryArgs) {
  return (
    <div>
      <div className={classNames(args.className, { 'p-4': !args.noPadding })}>
        {args.children}
      </div>
    </div>
  );
}

export default StoryLayout;
