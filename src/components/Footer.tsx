import { Link } from "react-router";
import { routePaths } from "../routes";

export default function Footer() {
  return (
    <footer className="app-footer">
      <p className="app-footer__text">🚀 {new Date().getFullYear()} React TS7</p>

      <nav className="app-footer__nav" aria-label="Footer navigation">
        <Link to={routePaths.home}>Home</Link>
        <Link to={routePaths.predictions}>Predictions</Link>
      </nav>
    </footer>
  );
}
