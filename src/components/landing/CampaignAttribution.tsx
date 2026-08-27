"use client";

import { useEffect } from "react";
import { persistCampaignContext } from "@/lib/analytics";

export default function CampaignAttribution() {
  useEffect(() => { persistCampaignContext(); }, []);
  return null;
}
