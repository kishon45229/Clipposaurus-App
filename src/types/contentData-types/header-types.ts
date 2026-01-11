export interface HeaderComponent {
  title: string;
  description: string;
  keySection: {
    title: string;
    identifierLabel: string;
    systemSecretLabel: string;
    userSecretLabel: string;
    dropKeyLabel: string;
    dropKeyPlaceholder: string;
    inputPlaceholder: string;
  };
  retentionSection: {
    title: string;
    options: {
      deleteOnAccess: string;
      keep30Minutes: string;
      keep1Hour: string;
    };
  };
  noteSection: {
    label: string;
    text: string;
  };
  mobileMenuButton: {
    label: string;
    loadingLabel: string;
  };
  ctaButton: {
    label: string;
    loadingLabel: string;
  };
}
