import Hero from "./Hero";
import AudienceFit from "./AudienceFit";
import ExpressDossier from "./ExpressDossier";
import FinalCTA from "./FinalCTA";
import MethodTransparency from "./MethodTransparency";
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
      <AudienceFit />
      <ExpressDossier />
      <MethodTransparency />
      <FinalCTA />
    </SiteFrame>
  );
}
