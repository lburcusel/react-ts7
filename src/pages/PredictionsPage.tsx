import { Link } from "react-router";
import { routePaths } from "../routes";

export default function PredictionsPage() {
  return (
    <main className="predictions-page">
      <h1>Predictions</h1>
      <Link to={routePaths.home} className="predictions-link">
        Go Home
      </Link>
    </main>
  );
}
