import type { ReactNode } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <main className="page">
      <Navigation />
      {children}
      <Footer />
    </main>
  );
}
