export interface UnlockDropComponent {
  title: string;
  description: string;
  stepIndicators: string[];
  enterKey: {
    title: string;
    inputPlaceholders: string[];
    ctaBtn: {
      label: string;
      loadingLabel: string;
    };
    hintText: string;
    sampleKey: string;
    additionalInfo: {
      title: string;
      description: string;
    };
    errorMessages: {
      allEmpty: string;
      oneOrTwoEmpty: string;
      general: string;
    };
  };
  verifyKey: {
    verificationStatuses: {
      verifying: {
        title: string;
        description: string;
        icon: string;
      };
      notfound: {
        title: string;
        description: string;
        icon: string;
      };
      error: {
        title: string;
        description: string;
        icon: string;
      };
      rateLimited: {
        title: string;
        description: string;
        icon: string;
      };
      decryptionError: {
        title: string;
        description: string;
        icon: string;
      };
    };
    ctaTryAgainBtn: {
      label: string;
      loadingLabel: string;
    };
    ctaRateLimitedBtn: {
      label: string;
      loadingLabel: string;
    };
  };
  accessDrop: {
    title: string;
    description: string;
    ctaBtn: {
      label: string;
      loadingLabel: string;
    };
    additionalInfo: string;
  };
  info: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}
