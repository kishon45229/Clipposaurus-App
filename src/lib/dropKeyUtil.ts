export interface CodeInputValidation {
  isValid: boolean;
  sanitizedValue: string;
  error?: string;
}

export function validateAndSanitizeDropKey(
  input: string,
  maxLength: number = 6
): CodeInputValidation {
  if (!input) {
    return {
      isValid: true,
      sanitizedValue: "",
    };
  }

  const sanitized = input.replace(/[^a-zA-Z]/g, "");

  if (sanitized.length > maxLength) {
    return {
      isValid: false,
      sanitizedValue: sanitized.substring(0, maxLength),
      error: `Word cannot exceed ${maxLength} characters`,
    };
  }

  return {
    isValid: true,
    sanitizedValue: sanitized,
  };
}

export function validateDropKey(
  identifier: string,
  systemSecret: string,
  userSecret: string
): boolean {
  if (
    !identifier ||
    !systemSecret ||
    !userSecret ||
    identifier.length > 6 ||
    systemSecret.length > 6 ||
    userSecret.length > 6 ||
    identifier === systemSecret ||
    identifier === userSecret ||
    systemSecret === userSecret
  )
    return false;

  return true;
}

export function formatDropKey(
  identifier: string,
  systemSecret: string,
  userSecret: string
): string {
  return `${identifier.toLowerCase()}-${systemSecret.toLowerCase()}-${userSecret.toLowerCase()}`;
}
