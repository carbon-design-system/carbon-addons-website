import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import CodeExample from './index';

storiesOf('CodeExample', module)
  .addDecorator(withKnobs)
  .add(
    'CodeExample',
    withInfo({
      text: 'CodeExample',
    })(() => (
      <CodeExample
        htmlFile={text('The content', '<div attrib="value">text</div>')}
        language={text('The language', 'html')}
        copyButtonTimeout={number('Timeout for the copy button', 2500)}
      />
    ))
  );
