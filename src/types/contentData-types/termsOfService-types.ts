interface AccordionItem {
  id: number;
  title: string;
  description: string;
}

export interface TermsOfServiceComponent {
  headline: string;
  lastUpdated: string;
  sections: AccordionItem[];
}