export interface UnlockDropComponent {
  title: string;
  description: string;
  stepIndicators: string[];
  ctaBtn: {
    label: string;
    loadingLabel: string;
  };
  hintText: string;
  sampleKey: string;
  errorSection: {
    title: string;
    messages: {
      allEmpty: string;
      oneOrTwoEmpty: string;
      general: string;
    };
  };
  infoSection: {
    hintText: string;
    sampleKey: string;
  };
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
}
