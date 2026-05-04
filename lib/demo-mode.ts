export function isDemoModeEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_DEMO_DATA === "true";
}

export function canUseDemoData() {
  return isDemoModeEnabled() && process.env.NODE_ENV !== "production";
}
