import { Suspense } from "react";
import type { ComponentType } from "react";
import Footer from "./components/Footer";

type PageWrapperProps = {
  Page: ComponentType;
};

export function PageWrapper({ Page }: PageWrapperProps) {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <div style={{ minHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <Page />
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
