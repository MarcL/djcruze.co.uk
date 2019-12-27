import { createContext } from 'react';

const defaultContext = createContext({
  collapsed: true,
  toggleCollapsed: () => {},
});

export default defaultContext;
