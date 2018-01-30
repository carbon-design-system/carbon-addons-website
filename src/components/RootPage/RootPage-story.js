import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs';
import RootPage from './index';

const FloatDecorator = storyFn => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    }}>
    {storyFn()}
  </div>
);

storiesOf('RootPage', module)
  .addDecorator(withKnobs)
  .addDecorator(FloatDecorator)
  .add(
    'RootPage',
    withInfo({
      text: 'RootPage',
    })(() => (
      <RootPage
        componentItems={object('The array of component metadata', [
          {
            id: 'ID-foo',
            name: 'name-foo',
            label: 'Label Foo',
            content: '<div attrib="foo">foo</div>',
            notes: 'Documentation of foo',
          },
          {
            id: 'ID-bar',
            name: 'name-bar',
            label: 'Label Bar',
            content: '<div attrib="foo">bar</div>',
            notes: 'Documentation of bar',
          },
          {
            id: 'ID-baz',
            name: 'name-baz',
            label: 'Label Baz',
            notes: 'Documentation of baz',
            items: [
              {
                id: 'variant-id-foo',
                name: 'variant-foo',
                label: 'Variant foo',
                content: '<div attrib="foo">foo</div>',
              },
              {
                id: 'variant-id-bar',
                name: 'variant-bar',
                label: 'Variant bar',
                content: '<div attrib="bar">bar</div>',
              },
              {
                id: 'variant-id-baz',
                name: 'variant-baz',
                label: 'Variant baz',
                content: '<div attrib="baz">baz</div>',
              },
            ],
          },
        ])}
      />
    ))
  );
