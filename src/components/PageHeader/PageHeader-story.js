import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import PageHeader from './index';

storiesOf('PageHeader', module)
  .addDecorator(withKnobs)
  .add(
    'PageHeader',
    withInfo({
      text: 'PageHeader',
    })(() => <PageHeader label={text('The sub-title', 'Label')} title={text('The title', 'Title')} />)
  );
