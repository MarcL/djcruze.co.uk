import React from 'react';

const SectionContainer = ({ children, className = 'bg-white' }) => {
  return (
    <section className={className}>
      <div className="mw7 center pv3">{children}</div>
    </section>
  );
};

export default SectionContainer;
