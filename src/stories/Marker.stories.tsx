import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Marker from '@/components/map/MMarker';
import '../styles/globals.css';

const meta: Meta<typeof Marker> = {
  component: Marker,
};
export default meta;
type MarkerStory = StoryObj<typeof Marker>;

export const Dynamic: MarkerStory = {
  args: {
    highlighted: false,
    text: 100,
    isCluster: false,
  },
};
