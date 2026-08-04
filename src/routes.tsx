import type { RouteObject } from "react-router";
import { PageWrapper } from "./PageWrapper";
import { HomePage, PredictionsPage } from "./lazyPages";

export const routePaths = {
  home: import.meta.env.BASE_URL,
  predictions: `${import.meta.env.BASE_URL}predictions`,
} as const;

export const routes: RouteObject[] = [
  { path: routePaths.home, element: <PageWrapper Page={HomePage} /> },
  { path: routePaths.predictions, element: <PageWrapper Page={PredictionsPage} /> },
];
