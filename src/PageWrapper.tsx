import { Suspense } from "react";
import type { ComponentType } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

type PageWrapperProps = {
  Page: ComponentType;
};

export function PageWrapper({ Page }: PageWrapperProps) {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <div style={{ minHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Page />
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}
