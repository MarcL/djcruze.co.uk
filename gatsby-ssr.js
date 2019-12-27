import React from 'react';

import ContextWrapper from './src/components/contextWrapper';

export const wrapPageElement = ({ element }) => (
  <ContextWrapper>{element}</ContextWrapper>
);
