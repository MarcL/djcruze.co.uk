import React from 'react';
import { FaAmazon } from 'react-icons/fa';

const AmazonBuyButton = ({ text, url }) => {
  return (
    <a
      className="f5 f4-ns link dim br3 ph3 pv3 mb2 dib white bg-orange w-100 tc shadow-4"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaAmazon size="1em" className="v-mid" />
      &nbsp; {text}
    </a>
  );
};

export default AmazonBuyButton;
