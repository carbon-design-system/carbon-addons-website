import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import SideNav from './index';

const FloatDecorator = storyFn => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
    }}>
    {storyFn()}
  </div>
);

storiesOf('SideNav', module)
  .addDecorator(withKnobs)
  .addDecorator(FloatDecorator)
  .add(
    'SideNav',
    withInfo({
      text: 'SideNav',
    })(() => (
      <SideNav
        items={object('The array of component metadata', [
          {
            id: 'ID-foo',
            name: 'name-foo',
            label: 'Label Foo',
          },
          {
            id: 'ID-bar',
            name: 'name-bar',
            label: 'Label Bar',
          },
          {
            id: 'ID-baz',
            name: 'name-baz',
            label: 'Label Baz',
          },
        ])}
        activeItemId={text('The active component ID')}
        onToggle={action('onToggle')}
        onItemClick={action('onItemClick')}
      />
    ))
  );
