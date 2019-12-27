import React, { useState } from 'react';
import DefaultContext from './context';

const ContextWrapper = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <DefaultContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </DefaultContext.Provider>
  );
};

export default ContextWrapper;
