export async function generateIdentifier(): Promise<{
  identifier: string;
  expiresIn: number;
}> {
  try {
    const response = await fetch("/api/drop-key/generate/identifier", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to generate identifier");
    }

    const data = await response.json();
    return {
      identifier: data.identifier,
      expiresIn: data.expiresIn || 600, // Default 10 minutes
    };
  } catch (error) {
    throw error;
  }
}

export async function validateIdentifier(
  identifier: string
): Promise<{ valid: boolean; expired?: boolean }> {
  try {
    const response = await fetch("/api/drop-key/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier }),
    });

    if (!response.ok) {
      throw new Error("Failed to validate identifier");
    }

    const data = await response.json();
    return {
      valid: data.valid,
      expired: data.expired,
    };
  } catch (error) {
    throw error;
  }
}

export async function generateSystemSecret(): Promise<string> {
  try {
    const response = await fetch("/api/drop-key/generate/system-secret", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get system secret");
    }

    const data = await response.json();
    return data.systemSecret;
  } catch (error) {
    throw error;
  }
}

export async function markKeyAsUsed(
  identifier: string,
  ttlSeconds?: number
): Promise<boolean> {
  try {
    const response = await fetch("/api/drop-key/mark-used", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, ttlSeconds }),
    });
    if (!response.ok) {
      throw new Error("Failed to mark key as used");
    }

    return true;
  } catch (error) {
    throw error;
  }
}

export async function releaseKey(identifier: string): Promise<boolean> {
  try {
    const response = await fetch("/api/drop-key/release", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier }),
    });
    if (!response.ok) {
      throw new Error("Failed to release key");
    }

    return true;
  } catch (error) {
    throw error;
  }
}
