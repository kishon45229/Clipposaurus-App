interface ChangelogItem {
  title: string;
  description: string;
}

export interface ChangelogCategory {
  category: string;
  items: ChangelogItem[];
}

interface ChangelogRelease {
  version: string;
  date: string;
  title: string;
  type: "major" | "minor" | "patch";
  changes: ChangelogCategory[];
}

export interface ChangelogComponent {
  headline: string;
  description: string;
  releases: ChangelogRelease[];
}
