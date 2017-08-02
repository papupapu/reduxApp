import React from 'react';
import PropTypes from 'prop-types';

import './Overlayer.css';

const Overlayer = ({ action }) => (
  <div className="overlayer">
    <a
      href=""
      onClick={(e) => { e.preventDefault(); action(e); }}
      title=""
    />
  </div>
);

Overlayer.propTypes = {
  action: PropTypes.func,
};

Overlayer.defaultProps = {
  action: () => {},
};

export default Overlayer;
