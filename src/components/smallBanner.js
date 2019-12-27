import React from 'react';

const SmallBanner = ({ children }) => {
  return (
    <div className="pv0 mv0 ph2 ph0-ns w-100 white bg-dark-gray">
      <div className="pv1 pv3-ns mw8 center tc">{children}</div>
    </div>
  );
};

export default SmallBanner;
