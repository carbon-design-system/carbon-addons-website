import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { Component, Fragment } from 'react';
import { InteriorLeftNav, InteriorLeftNavItem } from 'carbon-addons-cloud';
import SideNavToggle from './SideNavToggle';

/**
 * The side nav.
 */
class SideNav extends Component {
  static propTypes = {
    /**
     * The array of component data.
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * The unique ID.
         */
        id: PropTypes.string.isRequired,

        /**
         * The component name.
         */
        name: PropTypes.string.isRequired,

        /**
         * The display name of the component.
         */
        label: PropTypes.string,
      })
    ).isRequired,

    /**
     * The ID of the selected component.
     */
    activeItemId: PropTypes.string,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The callback called when the nav is open/closed.
     */
    onToggle: PropTypes.func,

    /**
     * The callback called when a nav item is clicked.
     */
    onItemClick: PropTypes.func,
  };

  state = {};

  /**
   * The handler for changing in the state of side nav's toggle button.
   */
  handleToggle = evt => {
    const predicate = { closed: evt.closed };
    this.setState(predicate, () => {
      const { onToggle } = this.props;
      if (onToggle) {
        onToggle(predicate);
      }
    });
  };

  /**
   * The handler for clicking on a nav item.
   */
  handleItemClick = evt => {
    const { onItemClick = () => {} } = this.props;
    onItemClick(evt);
    evt.preventDefault();
  };

  render() {
    const { items, activeItemId, className } = this.props;
    const { closed } = this.state;
    const classNames = classnames(className, 'side-nav', {
      'bx--interior-left-nav--collapsed': closed,
    });
    const activeItem = items && items.find(item => item.id === activeItemId);
    const { name: activeName } = activeItem || {};
    return (
      <Fragment>
        <SideNavToggle onChange={this.handleToggle} />
        <InteriorLeftNav className={classNames} activeHref={activeName ? `/demo/${activeName}` : ''}>
          {items.map(item => {
            const { id, name, label } = item;
            return (
              <InteriorLeftNavItem key={id} href={`/demo/${name}`}>
                <a href={`/demo/${name}`} data-nav-id={id} onClick={this.handleItemClick}>
                  {label}
                </a>
              </InteriorLeftNavItem>
            );
          })}
        </InteriorLeftNav>
      </Fragment>
    );
  }
}

export default SideNav;
