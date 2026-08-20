"use client";

import Hero from "./Hero";
import SiteFrame from "./SiteFrame";

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
    <SiteFrame>
      <GrainOverlay />
      <Hero />
    </SiteFrame>
  );
}
