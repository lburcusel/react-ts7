import { Suspense } from "react";
import type { ComponentType } from "react";

type PageWrapperProps = {
  Page: ComponentType;
};

export function PageWrapper({ Page }: PageWrapperProps) {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Page />
    </Suspense>
  );
}
