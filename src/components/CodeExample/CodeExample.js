import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import classnames from 'classnames';
import { Icon } from 'carbon-components-react';
import ReactGA from 'react-ga';

/**
 * The UI to show code example.
 * This component relies on Prism JavaScript/CSS code being there on the page.
 */
class CodeExample extends Component {
  static propTypes = {
    /**
     * The content.
     */
    htmlFile: PropTypes.string,

    /**
     * The language that the syntax highlighting should work with.
     */
    language: PropTypes.string,

    /**
     * The maximum height. If the contents go beyond that, "show more code" link will appear.
     */
    maxHeight: PropTypes.number,

    /**
     * Determines how long "copied state" should be since user hits the copy button.
     */
    copyButtonTimeout: PropTypes.number,
  };

  static defaultProps = {
    language: 'html',
    maxHeight: 190,
    copyButtonTimeout: 2500,
  };

  state = {
    copied: false,
    showBtn: false,
    expandedCode: false,
  };

  componentDidUpdate() {
    requestAnimationFrame(() => {
      const shouldShowBtn = this.codeBlock.offsetHeight > this.props.maxHeight;
      if (shouldShowBtn !== this.state.showBtn) {
        this.setState({ showBtn: shouldShowBtn });
      }
    });
  }
  /**
   * Handles click event on the copy button.
   */
  handleCopy = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, this.props.copyButtonTimeout);
  };

  /**
   * Toggles the expanded state of the content.
   */
  expandCode = () => {
    this.setState({ expandedCode: !this.state.expandedCode });
  };

  /**
   * Copies the content to the clipboard.
   */
  handleClick = () => {
    ReactGA.event({
      category: 'Copy Code',
      action: 'click',
    });
  };

  /**
   * Performs syntax highlighting of the code, or stops that, as this component is mounted/unmounted.
   */
  highlight = node => {
    if (node) {
      if (window.Prism) {
        window.Prism.highlightElement(node);
      }
      this._observerCode = new MutationObserver(() => {
        if (window.Prism && Array.prototype.every.call(node.childNodes, childNode => childNode.nodeType === Node.TEXT_NODE)) {
          window.Prism.highlightElement(node);
        }
      });
      this._observerCode.observe(node, {
        childList: true,
      });
    } else if (this._observerCode) {
      this._observerCode.disconnect();
      this._observerCode = null;
    }
  };

  render() {
    const { htmlFile, language } = this.props;

    const copyBtnClass = classnames({
      'bx--btn--copy__feedback': true,
      'bx--btn--copy__feedback--displayed': this.state.copied,
    });

    const codeExampleClass = classnames({
      'code-example__raw-html': true,
      'code-example__raw-html--expanded': this.state.expandedCode,
    });

    const expandBtnIconClass = classnames({
      'code-example__expand--icon': true,
      'code-example__expand--icon--rotated': this.state.expandedCode,
    });

    const expandBtnClass = classnames({
      'code-example__expand': this.state.showBtn,
      'code-example__expand--hidden': !this.state.showBtn,
    });

    const expandCodeBtnText = this.state.expandedCode ? 'Show less code' : 'Show more code';
    return (
      <div className="code-example">
        <div
          className={codeExampleClass}
          ref={ref => {
            this.codeBlock = ref;
          }}>
          <pre className="line-numbers">
            <code className={`language-${language}`} ref={this.highlight}>
              {htmlFile}
            </code>
          </pre>
        </div>
        <CopyToClipboard text={htmlFile} onCopy={this.handleCopy}>
          <button data-copy-btn className="bx--snippet-button code-example__copy-btn" onClick={() => this.handleClick()}>
            Copy
            <Icon className="code-example__copy-btn--icon bx--snippet__icon" name="copy" description="Copy code icon" />
            <div className={copyBtnClass} data-feedback="Copied!" />
          </button>
        </CopyToClipboard>
        <button className={expandBtnClass} onClick={this.expandCode}>
          <span>{expandCodeBtnText}</span>
          <Icon className={expandBtnIconClass} name="chevron--down" description="Expand code icon" />
        </button>
      </div>
    );
  }
}

export default CodeExample;
