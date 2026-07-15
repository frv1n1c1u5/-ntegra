"use client";

import { useEffect, useState } from "react";
import { fallbackPublicServices, formatServicePrice, type PublicService } from "@/lib/services";

let catalogRequest: Promise<PublicService[]> | null = null;

function loadCatalog() {
  if (!catalogRequest) {
    catalogRequest = fetch("/api/services", { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : fallbackPublicServices)
      .catch(() => fallbackPublicServices);
  }
  return catalogRequest;
}

function usePublicServices() {
  const [services, setServices] = useState(fallbackPublicServices);
  useEffect(() => { loadCatalog().then(setServices); }, []);
  return services;
}

export function DynamicPrice() {
  const services = usePublicServices();
  const primary = services.find((service) => service.featured) || services.find((service) => service.slug === "analise-inicial") || services[0];
  return <>{primary ? formatServicePrice(primary) : "Sob análise"}</>;
}

export function DynamicPricingGrid() {
  const services = usePublicServices();
  return (
    <div className="pricing-grid">
      {services.map((service) => (
        <article className={`pricing-card ${service.featured ? "featured" : ""}`} key={service.id || service.slug}>
          <span className="pricing-label">{service.badge || "Serviço"}</span>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <div className={`price ${service.pricing_model === "custom" ? "variable-price" : ""}`}>
            {formatServicePrice(service)}
          </div>
          {service.price_note && <span className="price-note">{service.price_note}</span>}
          {service.features.length > 0 && (
            <ul>
              {service.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}
