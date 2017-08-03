import React from 'react';

function PRODUCTInfos({ infos }) {
  if (Object.keys(infos).length > 0) {
    return (
      <p className="infos">
        <strong>{infos.price}</strong>
        <span>{infos.mq}</span> {Object.keys(infos)[1]}.&nbsp;
        <span>{infos.locali}</span> {Object.keys(infos)[2]}&nbsp;
        <span>{infos.bagni}</span> {Object.keys(infos)[3]}
      </p>
    );
  }
  return null;
}

PRODUCTInfos.propTypes = {
  infos: React.PropTypes.instanceOf(Object),
};

PRODUCTInfos.defaultProps = {
  infos: {},
};

export default PRODUCTInfos;
