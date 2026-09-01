import Hero from "./Hero";
import AnalysisShowcase from "./AnalysisShowcase";
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
      <AnalysisShowcase />
      <MethodTransparency />
      <FAQ />
      <FinalCTA />
    </SiteFrame>
  );
}
