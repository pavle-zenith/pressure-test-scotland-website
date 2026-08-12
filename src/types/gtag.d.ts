// Ambient types for the Google Analytics gtag global. Present on window only
// after the visitor accepts analytics cookies and the GA script has loaded, so
// every call site guards with `window.gtag?.(...)`.
export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}
