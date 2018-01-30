import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-it';

import ComponentExample from '../ComponentExample/ComponentExample';

/**
 * The page to show the component demo, its code as well as its README.
 */
const CodePage = ({ metadata, hideViewFullRender }) => {
  const md = new Markdown({ html: true });
  const { name, content, notes, items } = metadata;
  const componentContent = !items ? (
    <ComponentExample hideViewFullRender={hideViewFullRender} component={name} htmlFile={content} />
  ) : (
    items.map(item => (
      <div key={item.id} className="component-variation">
        <h2 className="component-variation__name">{item.label}</h2>
        <ComponentExample hideViewFullRender={hideViewFullRender} variant={item.name} component={name} htmlFile={item.content} />
      </div>
    ))
  );

  /* eslint-disable react/no-danger */
  return (
    <div className="page code-page test">
      {componentContent}
      {notes && <div className="page_md" dangerouslySetInnerHTML={{ __html: md.render(notes) }} />}
    </div>
  );
  /* eslint-enable react/no-danger */
};

CodePage.propTypes = {
  /**
   * The component data.
   */
  metadata: PropTypes.shape({
    /**
     * The component name.
     */
    name: PropTypes.string.isRequired,

    /**
     * The code.
     */
    content: PropTypes.string,

    /**
     * The document.
     */
    notes: PropTypes.string,

    /**
     * The variant data.
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * The variant name.
         */
        handle: PropTypes.string,

        /**
         * The display name of the variant.
         */
        label: PropTypes.string,

        /**
         * The code.
         */
        content: PropTypes.string,
      })
    ),
  }).isRequired,

  /**
   * `true` to hide "full render" link.
   */
  hideViewFullRender: PropTypes.bool,
};

export default CodePage;
