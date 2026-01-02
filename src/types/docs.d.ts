interface DocsSidebarItem {
  id: string;
  title: string;
  href?: string;
  children?: DocsSidebarItem[];
  pageId?: string;
}

interface Header {
  title: string;
  description: string;
}

interface DataType1 {
  headers: string[];
  rows: string[][];
}

interface DataType2 {
  title: string;
  icon: string;
  description: string;
}

interface DataType3 {
  title: string;
  items: string[];
}

interface DataType4 {
  title: string;
  icon: string;
  items: string[];
}

interface DataType5 {
  platform: string[];
}

interface DataType6 {
  title: string;
  quote: string;
}

interface DataType7 {
  title: string;
  items: string[];
  screenshot?: string;
}

interface DataType8 {
  title: string;
  items: string[];
}

interface DataType9 {
  text: string;
  href: string;
  target?: string;
  style: string;
}

interface DataType10 {
  heading: string;
  text: string;
}

interface DataType11 {
  label: string;
  example: string;
  type: string;
  content: string;
}

interface Steps {
  title: string;
  text: string;
}

interface DataType12 {
  title: string;
  text: string;
}

interface DataType13 {
  description: string;
  steps: Steps[];
}

interface DataType14 {
  items: string[];
}

interface DataType15 {
  name: string;
  word: string;
  can: string[];
  cannot: string[];
}

interface DataType16 {
  label: string;
  text: string;
}

interface DataType17 {
  title: string;
  items: DataType16[];
}

interface DataType18 {
  whatIs: DataType8;
  howWeUseIt: DataType8;
  whyItMatters: DataType17;
}

interface DataType19 {
  flow: DataType8;
  weReceive: DataType8;
  weNeverReceive: DataType8;
}

interface Datatype20 {
  flow: DataType8;
}

interface DataType21 {
  title: string;
  items: DataType16[];
}

interface DataType22 {
  stored: DataType21;
  notStored: DataType21;
}

interface DataType23 {
  points: {
    label: string;
    explanation: string;
  }[];
  analogy: string;
}

interface DataType25 {
  items: DataType16[];
  analogy: string;
}

interface DataType26 {
  title: string;
  items: string[];
  note?: string;
}

interface DataType27 {
  items: DataType16[];
}

interface DataType28 {
  title: string;
  items: string[];
}

interface DataType29 {
  languages: string[];
}

type ActiveSection = "identifier" | "system-secret" | "user-secret";

export type ContentData1 = DataType1;
export type ContentData2 = DataType2[];
export type ContentData3 = DataType3[];
export type ContentData4 = DataType4[];
export type ContentData5 = DataType5[];
export type ContentData6 = DataType6[];
export type ContentData7 = DataType7[];
export type ContentData8 = DataType8[];
export type ContentData9 = DataType9[];
export type ContentData10 = DataType10[];
export type ContentData11 = DataType11[];
export type ContentData12 = DataType12[];
export type ContentData14 = DataType14;
export type ContentData15 = DataType15;
export type ContentData17 = DataType17;
export type ContentData18 = DataType18;
export type ContentData19 = DataType19;
export type ContentData20 = DataType20;
export type ContentData22 = DataType22;
export type ContentData23 = DataType23;
export type ContentData24 = DataType16[];
export type ContentData25 = DataType25;
export type ContentData26 = DataType16[];
export type ContentData27 = DataType26[];
export type ContentData28 = DataType27;
export type ContentData29 = DataType28[];
export type ContentData30 = DataType29;

interface CTA {
  id: string;
  title: string;
}

interface Footer {
  nextPage?: CTA;
  previousPage?: CTA;
}

export interface DocsSection {
  id: string;
  title: string;
  type: string;
  description: string;
  data:
    | ContentDataType1
    | ContentDataType2
    | ContentDataType3
    | ContentDataType4
    | ContentDataType5
    | ContentDataType6
    | ContentDataType7
    | ContentDataType8
    | ContentDataType9;
}

export interface DocsPage {
  id: string;
  title: string;
  header: Header;
  sections: DocsSection[];
  footer: Footer;
}

export interface DocsComponent {
  version?: string;
  lastUpdated?: string;
  title: string;
  description: string;
  defaultPage: string;
  sidebar: DocsSidebarItem[];
  pages: DocsPage[];
}
