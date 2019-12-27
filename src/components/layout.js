import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import Footer from './footer';
import Seo from './seo/seo';

const Layout = ({ children }) => {
  return (
    <>
      <Seo />
      <div className="avenir bg-white">
        <div className="w-100 bg-white">
          <Header />
        </div>
        <div className="center">{children}</div>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
