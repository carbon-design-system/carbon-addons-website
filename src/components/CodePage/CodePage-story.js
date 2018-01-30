import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, object } from '@storybook/addon-knobs';
import CodePage from './index';

storiesOf('CodePage', module)
  .addDecorator(withKnobs)
  .add(
    'CodePage',
    withInfo({
      text: 'CodePage',
    })(() => (
      <CodePage
        metadata={object('The metadata', {
          name: 'name',
          content: '<div attrib="value">text</div>',
          notes: 'Component documentation',
        })}
        hideViewFullRender={boolean('Whether or not to hide "full render" link', false)}
      />
    ))
  )
  .add(
    'CodePage with variants',
    withInfo({
      text: 'CodePage with variants',
    })(() => (
      <CodePage
        metadata={object('The metadata', {
          name: 'name',
          notes: 'Component documentation',
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
        })}
        hideViewFullRender={boolean('Whether or not to hide "full render" link', false)}
      />
    ))
  );
