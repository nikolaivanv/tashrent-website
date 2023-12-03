import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PropertyDetailsCompact from '@/components/propertyDetailsCompact/PropertyDetailsCompact';
import '../styles/globals.css';
import listings from '@/mockData';

const property = listings[0];

const meta: Meta<typeof PropertyDetailsCompact> = {
  component: PropertyDetailsCompact,
};
export default meta;
type PropertyDetailsCompactStory = StoryObj<typeof PropertyDetailsCompact>;

export const Dynamic: PropertyDetailsCompactStory = {
  args: {
    property,
    isLoading: false,
    isError: false,
  },
};
