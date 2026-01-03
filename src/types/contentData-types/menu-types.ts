export interface MenuComponent {
  title: string;
  description: string;
  keySection: {
    title: string;
    identifierLabel: string;
    systemSecretLabel: string;
    userSecretLabel: string;
    dropKeyLabel: string;
    dropKeyPlaceholder: string;
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
  mobileMenuButton: string;
  ctaButton: string;
}