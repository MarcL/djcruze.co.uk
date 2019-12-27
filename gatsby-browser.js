import React from 'react';
import 'tachyons';

import ContextWrapper from './src/components/contextWrapper';

export const wrapPageElement = ({ element }) => (
  <ContextWrapper>{element}</ContextWrapper>
);
