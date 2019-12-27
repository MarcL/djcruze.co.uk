import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { FaBars } from 'react-icons/fa';
import DefaultContext from './context';

const navigationLinks = [
  {
    to: '/mixes',
    title: 'Mixes',
  },
  {
    to: '/podcasts',
    title: 'Podcasts',
  },
  {
    to: '/productions',
    title: 'Productions',
  },
  {
    to: '/about',
    title: 'About',
  },
];

const NavigationItem = ({ to, title }) => (
  <Link
    className="f4 fw4 hover-white-70 underline-hover no-underline white dn dib pv2 ph3 ttu v-mid"
    to={to}
    activeClassName="fw7"
  >
    {title}
  </Link>
);

const HorizontalNavigationMenu = () => (
  <div className="w-75 fr tr dn db-l">
    {navigationLinks.map(navigationLink => {
      const { to, title } = navigationLink;
      const keyName = `${to}-${title}`;
      return <NavigationItem to={to} title={title} key={keyName} />;
    })}
  </div>
);

const VerticalNavigationItem = ({ to, title }) => (
  <Link
    className="f5 fw4 hover-white-70 underline-hover no-underline white dn dib pv2 ph3 ttu v-mid"
    to={to}
    activeClassName="fw7"
  >
    {title}
  </Link>
);

const VerticalNavigationMenu = ({ collapsed }) => {
  const hideNavigation = collapsed ? ' dn' : '';
  const navigationClass = `list tr ${hideNavigation}`;

  return (
    <div className="dt w-100 center">
      <ul className={navigationClass}>
        {navigationLinks.map(navigationLink => {
          const { to, title } = navigationLink;
          const keyName = `${to}-${title}`;

          return (
            <li key={keyName} className="bt b--white-10">
              <VerticalNavigationItem to={to} title={title} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const HomepageLogo = () => (
  <div className="db dtc-l v-mid link dim w-75 w-25-l tl mb2 mb0-l fl pl2 pl2-m pl0-ns">
    <Link to="/" className="f3 dib pa2 no-underline hover-white-60 white ttu">
      <span className="fw3 dib">DJ&nbsp;</span>
      <span className="fw6 dib">Cruze</span>
    </Link>
  </div>
);

const MenuButton = ({ onClick }) => (
  <div className="w-25 dib v-mid fr tr pr3 pt1 dn-l white">
    <FaBars size="1.5em" className="v-mid" onClick={onClick} />
  </div>
);

const NavigationMenu = () => {
  const { collapsed, toggleCollapsed } = useContext(DefaultContext);

  return (
    <>
      <nav className="dt w-100 mw8 center">
        <div className="w-100">
          <HomepageLogo />
        </div>
        <HorizontalNavigationMenu />
        <MenuButton onClick={toggleCollapsed} />
      </nav>
      <VerticalNavigationMenu collapsed={collapsed} />
    </>
  );
};

export default NavigationMenu;
