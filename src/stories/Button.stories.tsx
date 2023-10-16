import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button/Button';
import '../styles/globals.css';

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;
type ButtonStory = StoryObj<typeof Button>;

export const Dynamic: ButtonStory = {
  args: {
    children: 'Button',
  },
};

export function Buttons() {
  return (
    <div className="space-y-4">
      <div>
        <Button variant="default">Button</Button>
      </div>
      <div>
        <Button variant="secondary">Button</Button>
      </div>
      <div>
        <Button variant="outline">Button</Button>
      </div>
      <div>
        <Button variant="ghost">Button</Button>
      </div>
      <div>
        <Button variant="link">Button</Button>
      </div>
    </div>
  );
}
