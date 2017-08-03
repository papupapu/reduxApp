import React from 'react';
import { Link } from 'react-router-dom';

function SEOTag({ tag, value, cssClassName, url }) {
  if (value !== '') {
    const headingContent = url !== '' ? <Link to={url}>{value}</Link> : value;
    if (cssClassName !== '') {
      switch (tag) {
        case 'h1':
          return (
            <h1 className={cssClassName}>{headingContent}</h1>
          );
        case 'h2':
          return (
            <h2 className={cssClassName}>{headingContent}</h2>
          );
        case 'h3':
          return (
            <h3 className={cssClassName}>{headingContent}</h3>
          );
        case 'h4':
          return (
            <h4 className={cssClassName}>{headingContent}</h4>
          );
        case 'h5':
          return (
            <h5 className={cssClassName}>{headingContent}</h5>
          );
        case 'h6':
          return (
            <h6 className={cssClassName}>{headingContent}</h6>
          );
        default:
          return (
            <p className={cssClassName}>{headingContent}</p>
          );
      }
    } else {
      switch (tag) {
        case 'h1':
          return (
            <h1>{headingContent}</h1>
          );
        case 'h2':
          return (
            <h2>{headingContent}</h2>
          );
        case 'h3':
          return (
            <h3>{headingContent}</h3>
          );
        case 'h4':
          return (
            <h4>{headingContent}</h4>
          );
        case 'h5':
          return (
            <h5>{headingContent}</h5>
          );
        case 'h6':
          return (
            <h6>{headingContent}</h6>
          );
        default:
          return (
            <p>{headingContent}</p>
          );
      }
    }
  }
}

SEOTag.propTypes = {
  tag: React.PropTypes.string,
  value: React.PropTypes.string,
  cssClassName: React.PropTypes.string,
  url: React.PropTypes.string,
};

SEOTag.defaultProps = {
  tag: '',
  value: '',
  cssClassName: '',
  url: '',
};

export default SEOTag;
