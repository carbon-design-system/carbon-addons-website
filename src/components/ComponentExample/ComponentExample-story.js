import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import ComponentExample from './index';

storiesOf('ComponentExample', module)
  .addDecorator(withKnobs)
  .add(
    'ComponentExample',
    withInfo({
      text: 'ComponentExample',
    })(() => (
      <ComponentExample
        component={text('The component name', 'component')}
        variant={text('The component variant name', 'variant')}
        codepenSlug={text('The CodePen slug')}
        htmlFile={text('The content', '<div attrib="value">text</div>')}
        copyButtonTimeout={number('Timeout for the copy button', 2500)}
        hideViewFullRender={boolean('Whether or not to hide "full render" link', false)}
      />
    ))
  );
