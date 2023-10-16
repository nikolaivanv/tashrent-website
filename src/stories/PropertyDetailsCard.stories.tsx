import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PropertyDetailsCard from '@/components/propertyDetails/PropertyDetailsCard';
import '../styles/globals.css';
import listings from '@/mockData';

const property = listings[0];

const meta: Meta<typeof PropertyDetailsCard> = {
  component: PropertyDetailsCard,
};
export default meta;
type PropertyDetailsCardStory = StoryObj<typeof PropertyDetailsCard>;

export const Dynamic: PropertyDetailsCardStory = {
  args: {
    property,
    isLoading: false,
    isError: false,
  },
};
