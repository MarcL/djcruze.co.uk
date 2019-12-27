import React from 'react';
import SmallBanner from './smallBanner';
import { Link } from 'gatsby';

const NewsletterBanner = ({ children }) => {
  return (
    <SmallBanner>
      <Link
        to="/newsletter?signup=website-banner"
        title="Newsletter"
        className="white no-underline f6 f5-ns fw4 fw5-ns hover-white underline-hover ttu"
        activeClassName="fw6 white"
      >
        Click here to join Clare's VIP list for a FREE copy of Trail
      </Link>
    </SmallBanner>
  );
};

export default NewsletterBanner;
