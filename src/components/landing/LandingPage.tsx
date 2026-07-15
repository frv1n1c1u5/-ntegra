"use client";

import Navigation from "./Navigation";
import Hero from "./Hero";
import Services from "./Services";
import Method from "./Method";
import Independence from "./Independence";
import Pricing from "./Pricing";
import LeadForm from "./LeadForm";
import BlogPreview from "./BlogPreview";
import FAQ from "./FAQ";
import Footer from "./Footer";

function GrainOverlay() {
  return (
    <div
      className="grain-overlay"
      aria-hidden="true"
    />
  );
}

export default function LandingPage() {
  return (
    <main className="page">
      <GrainOverlay />
      <Navigation />
      <Hero />
      <Services />
      <Method />
      <Independence />
      <Pricing />
      <LeadForm />
      <BlogPreview />
      <FAQ />
      <Footer />
    </main>
  );
}
