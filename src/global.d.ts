export {};

declare global {
  interface Window {
    chrome?: {
      runtime?: { id?: string };
      extension?: Record<string, unknown>;
    };
    browser?: {
      runtime?: { id?: string };
      extension?: Record<string, unknown>;
    };
  }

  var chrome: Window['chrome'];
  var browser: Window['browser'];
}
