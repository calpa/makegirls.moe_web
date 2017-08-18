import React from 'react';
import { Link } from 'react-router-dom';
import Config from '../Config';
import './Navbar.css';

const routes = [
  { title: 'Home', path: '/', index: 1 },
  { title: 'About', path: '/about', index: 2 },
  { title: 'News', path: '/news', index: 3 },
  { title: 'Tips', path: '/tips', index: 4 },
];

const NavBarLink = ({ title, path, location }) => (
  <li className={location.pathname === path ? 'active' : ''}>
    <Link to={path}>{title}</Link>
  </li>
);

const Navbar = ({ location }) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link className="navbar-brand" to="/"><span style={{ color: Config.colors.theme }}>MakeGirls.moe</span></Link>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          {routes.map(link => (
            <NavBarLink {...link} key={link.index} {...location} />
          ))}
          <li><a href="https://makegirlsmoe.github.io/" target="_blank" rel="noopener noreferrer">Official Blog</a></li>
          <li><a href="https://github.com/makegirlsmoe" target="_blank" rel="noopener noreferrer">Github</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
