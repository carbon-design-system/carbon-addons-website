import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import CodePage from '../CodePage';
import SideNav from '../SideNav';
import PageHeader from '../PageHeader';

/**
 * The top-most React component for dev env page.
 */
class RootPage extends Component {
  static propTypes = {
    /**
     * The array of component data.
     */
    componentItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,

    /**
     * The array of document data. (Preserved for future)
     */
    docItems: PropTypes.arrayOf(PropTypes.shape()), // eslint-disable-line react/no-unused-prop-types
  };

  constructor() {
    super();
    window.addEventListener('popstate', evt => {
      this.switchTo(evt.state.name);
    });
  }

  state = {};

  componentDidMount() {
    const { componentItems } = this.props;
    if (!this.state.activeNavItemId && componentItems) {
      const pathnameTokens = /^\/demo\/([\w-]+)$/.exec(window.location.pathname);
      const name = (pathnameTokens && pathnameTokens[1]) || '';
      const selectedNavItem = (name && componentItems.find(item => item.name === name)) || componentItems[0];
      if (selectedNavItem) {
        this.switchTo(selectedNavItem.id);
      }
    }
  }

  /**
   * The handler for the `click` event on the side nav for changing selection.
   */
  onSideNavItemClick = evt => {
    const { componentItems } = this.props;
    const activeNavItem = componentItems && componentItems.find(item => item.id === evt.target.dataset.navId);
    if (activeNavItem) {
      this.switchTo(activeNavItem.id);
    }
  };

  /**
   * @returns The component data that is currently selected.
   */
  getCurrentComponentItem() {
    const { componentItems } = this.props;
    return componentItems && componentItems.find(item => item.id === this.state.activeNavItemId);
  }

  /**
   * Switches the selected component.
   * @param {string} activeNavItemId The ID of the newly selected component.
   */
  switchTo(activeNavItemId) {
    this.setState({ activeNavItemId }, () => {
      const { componentItems } = this.props;
      const selectedNavItem = componentItems && componentItems.find(item => item.id === activeNavItemId);
      const { name } = selectedNavItem || {};
      if (name) {
        window.history.pushState({ name }, name, `/demo/${name}`);
      }
    });
  }

  render() {
    const { componentItems } = this.props;
    const metadata = this.getCurrentComponentItem();
    const { name, label } = metadata || {};
    return !metadata ? null : (
      <Fragment>
        <SideNav items={componentItems} activeItemId={this.state.activeNavItemId} onItemClick={this.onSideNavItemClick} />
        <main role="main" id="maincontent" className="container" aria-labelledby="page-title" tabIndex="-1" data-page={name}>
          <PageHeader label="Component" title={label} />
          <CodePage metadata={metadata} />
        </main>
      </Fragment>
    );
  }
}

export default RootPage;
