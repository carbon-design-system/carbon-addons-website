import React from 'react';
import './prism';
import './_container.scss';

/* eslint-disable react/prop-types */
const Container = ({ story }) => <div className="preview-container">{story()}</div>;
/* eslint-enable react/prop-types */

export default Container;
