import React from 'react';

const FooterIcon = ({ link, title, iconComponent }) => (
  <a
    className="link dim dib mh2 tc near-white"
    href={link}
    title={title}
    target="_blank"
    rel="noopener noreferrer"
  >
    {iconComponent}
  </a>
);

export default FooterIcon;
