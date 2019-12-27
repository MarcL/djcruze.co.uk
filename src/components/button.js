import React from 'react';

const Button = ({ type, children }) => {
  const className = 'f3 ph3 pv3 w-100 br3 shadow-4 bg-blue white grow';

  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
};

export default Button;
