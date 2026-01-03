interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  description?: string;
  questions: FAQQuestion[];
}

export interface FAQComponent {
  headline: string;
  description: string;
  lastUpdated: string;
  categories: FAQCategory[];
}
