"use client";

import { useEffect } from "react";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackAnalyticsEvent(name: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("tuitionlist:analytics", { detail: { name, properties } }));
  if (!window.dataLayer) window.dataLayer = [];
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...properties });
  }
}

export function TrackEvent({ name, properties = {} }: { name: string; properties?: AnalyticsProperties }) {
  useEffect(() => {
    trackAnalyticsEvent(name, properties);
  }, [name, properties]);

  return null;
}

export function TrackFormSubmit({ formId, name, properties = {} }: { formId: string; name: string; properties?: AnalyticsProperties }) {
  useEffect(() => {
    const form = document.getElementById(formId);
    if (!form) return;
    const handler = () => trackAnalyticsEvent(name, properties);
    form.addEventListener("submit", handler);
    return () => form.removeEventListener("submit", handler);
  }, [formId, name, properties]);

  return null;
}
