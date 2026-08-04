import { NavLink } from "react-router";
import heroLogo from "../assets/hero.png";
import { routePaths } from "../routes";

export default function Navbar() {
  return (
    <header className="site-navbar">
      <NavLink to={routePaths.home} end className="site-navbar__brand" aria-label="Go to the home page">
        <img src={heroLogo} alt="React TS7 logo" className="site-navbar__logo" />
      </NavLink>

      <nav className="site-navbar__nav" aria-label="Main navigation">
        <NavLink to={routePaths.home} end className={({ isActive }) => (isActive ? "active" : undefined)}>
          Home
        </NavLink>
        <NavLink to={routePaths.predictions} className={({ isActive }) => (isActive ? "active" : undefined)}>
          Predictions
        </NavLink>
      </nav>
    </header>
  );
}
