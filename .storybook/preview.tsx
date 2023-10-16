import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/styles/globals.css';
import { withThemeByClassName } from '@storybook/addon-styling'
import classNames from 'classnames'

//import {withThemeByClassName} from 'storybook-addon-themes/react';
//import '../src/styles/globals.css';

const globalDecorator = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme
  //console.log(theme)
  return (
    <div
      className={`theme-${theme}`}
      style={{
        padding: '1rem',
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
      }}
    >
      <StoryFn />
    </div>
  )
}

export const decorators = [
  globalDecorator,
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // decorators: [
  //     withThemeByClassName({
  //       themes: {
  //         light: "",
  //         dark: "dark",
  //       },
  //       defaultTheme: "light",
  //     }),
  //   ]
};

export default preview;
