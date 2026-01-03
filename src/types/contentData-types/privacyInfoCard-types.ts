interface Stat {
  value: string;
  label: string;
}
interface PrivacyPillar {
  title: string;
  detail: string;
  icon: string;
}

export interface PrivacyInfoCardComponent {
  title: string;
  subtitle: string;
  privacyPillars: PrivacyPillar[];
  stats: Stat[];
}
