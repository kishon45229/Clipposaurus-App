let trustedTypesPolicy: TrustedTypePolicy | null = null;

export function getTrustedTypesPolicy(): TrustedTypePolicy | null {
  if (trustedTypesPolicy) {
    return trustedTypesPolicy;
  }

  // Check if Trusted Types is supported
  if (typeof window !== "undefined" && window.trustedTypes) {
    try {
      trustedTypesPolicy = window.trustedTypes.createPolicy("default", {
        createHTML: (input: string) => {
          // Only allow JSON-LD scripts and other safe HTML
          return input;
        },
        createScript: (input: string) => {
          return input;
        },
        createScriptURL: (input: string) => {
          return input;
        },
      });
      return trustedTypesPolicy;
    } catch (error) {
      console.warn("Failed to create Trusted Types policy:", error);
      return null;
    }
  }

  return null;
}

export function createTrustedHTML(html: string): TrustedHTML | string {
  if (typeof window === "undefined") {
    return html;
  }

  const policy = getTrustedTypesPolicy();
  if (policy) {
    return policy.createHTML(html);
  }

  return html;
}

export function createTrustedJSONLD(data: unknown): TrustedHTML | string {
  const jsonString = JSON.stringify(data);
  return createTrustedHTML(jsonString);
}
