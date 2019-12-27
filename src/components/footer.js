import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';

import FooterIcon from './icons/footerIcon';
import * as FontAwesome from 'react-icons/fa';

const iconSize = '2em';

const yearNow = new Date().getFullYear();

const StyledLink = ({ to, title }) => (
  <Link
    to={to}
    title={title}
    className="f6 fw3 dib pr2 no-underline light-silver hover-white mr2 ttu"
    activeClassName="fw6 white"
  >
    {title}
  </Link>
);

const footerStyle = {
  backgroundColor: '#2b323a',
};

const Copyright = () => (
  <div className="pt2 pb2 f6 fw4 db ttu">
    All rights reserved &copy; DJ Cruze 2005-
    {yearNow}
  </div>
);

const FooterLinks = ({ icons }) => (
  <div className="pt2 pb2">
    {icons.map(icon => {
      const fontAwesomeIcon = React.createElement(FontAwesome[icon.iconName], {
        size: iconSize,
      });

      return (
        <FooterIcon
          link={icon.link}
          title={icon.title}
          coordinates={icon.svgCoordinates}
          key={`footer-icon-${icon.title}`}
          iconComponent={fontAwesomeIcon}
        />
      );
    })}
  </div>
);

const Footer = () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        site {
          siteMetadata {
            icons: footerIcons {
              link
              title
              iconName
            }
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { icons },
      },
    }) => {
      return (
        <footer
          className="pt3 pb3 ph3 tc bt b--near-black near-white"
          style={footerStyle}
        >
          <FooterLinks icons={icons} />
          <Copyright />
          <div className="pt2 pb2">
            <StyledLink to="/privacy-policy" title="Privacy policy" />
            <StyledLink
              to="/terms-and-conditions"
              title="Terms and conditions"
            />
            <StyledLink to="/cookie-policy" title="Cookie policy" />
          </div>
        </footer>
      );
    }}
  />
);

export default Footer;
