import React from 'react';

import './StarIcon.css';

const StarIcon = () => {
  const d = 'm12 17.4-7.05342303 4.3082039 1.91771784-8.0395121-6.27697301-5.37689573 8.23863784-.66048784 3.17404036-7.63130823 3.1740404 7.63130823 8.2386378.66048784-6.276973 5.37689573 1.9177178 8.0395121z';
  return (
    <svg className="star" height="23" viewBox="0 0 24 23" width="24" xmlns="http://www.w3.org/2000/svg">
      <path
        d={d}
        fillRule="evenodd"
      />
    </svg>
  );
};

export default StarIcon;
