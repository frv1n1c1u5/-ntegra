import Hero from "./Hero";
import AudienceFit from "./AudienceFit";
import ExpressDossier from "./ExpressDossier";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";
import MethodTransparency from "./MethodTransparency";
import SiteFrame from "./SiteFrame";

export default function LandingPage() {
  return (
    <SiteFrame>
      <Hero />
      <AudienceFit />
      <ExpressDossier />
      <MethodTransparency />
      <FAQ />
      <FinalCTA />
    </SiteFrame>
  );
}
