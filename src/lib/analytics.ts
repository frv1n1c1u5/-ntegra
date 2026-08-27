"use client";

import { track } from "@vercel/analytics";

const allowedUtmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const campaignStorageKey = "integra_campaign_context_v1";

function readUrlCampaignContext() {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  return allowedUtmKeys.reduce<Record<string, string>>((context, key) => {
    const value = params.get(key);
    if (value) context[key] = value.slice(0, 120);
    return context;
  }, {});
}

function campaignContext() {
  if (typeof window === "undefined") return {};
  const fromUrl = readUrlCampaignContext();
  if (Object.keys(fromUrl).length) {
    window.sessionStorage.setItem(campaignStorageKey, JSON.stringify(fromUrl));
    return fromUrl;
  }
  try { return JSON.parse(window.sessionStorage.getItem(campaignStorageKey) || "{}"); } catch { return {}; }
}

export function persistCampaignContext() { campaignContext(); }

/** Tracks only interaction metadata. Never pass names, contacts, messages, or documents here. */
export function trackConversion(name: string, properties: Record<string, string> = {}) {
  track(name, { ...campaignContext(), ...properties });
}
