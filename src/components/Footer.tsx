import { NavLink } from "react-router";
import { routePaths } from "../routes";
import pkg from "../../package.json";

export default function Footer() {
  return (
    <footer className="app-footer">
      <p className="app-footer__text">
        🚀 {new Date().getFullYear()} React TS7 (v{pkg.version})
      </p>

      <nav className="app-footer__nav" aria-label="Footer navigation">
        <NavLink to={routePaths.home} end className={({ isActive }) => (isActive ? "active" : undefined)}>
          Home
        </NavLink>
        <NavLink to={routePaths.predictions} className={({ isActive }) => (isActive ? "active" : undefined)}>
          Predictions
        </NavLink>
      </nav>
    </footer>
  );
}
