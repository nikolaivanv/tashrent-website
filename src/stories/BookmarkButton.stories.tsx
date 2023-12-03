import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BookmarkButton from '@/components/ui/bookmarkButton/BookmarkButton';
import '../styles/globals.css';

const meta: Meta<typeof BookmarkButton> = {
  component: BookmarkButton,
};
export default meta;
type BookmarkButtonStory = StoryObj<typeof BookmarkButton>;

export const Dynamic: BookmarkButtonStory = {
  args: {
    isSaved: true,
    onToggleSave: () => {},
  },
};
