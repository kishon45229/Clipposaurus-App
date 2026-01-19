interface TrustedTypePolicyOptions {
  createHTML?: (input: string) => string;
  createScript?: (input: string) => string;
  createScriptURL?: (input: string) => string;
}

interface TrustedTypePolicy {
  readonly name: string;
  createHTML(input: string): TrustedHTML;
  createScript(input: string): TrustedScript;
  createScriptURL(input: string): TrustedScriptURL;
}

interface TrustedTypePolicyFactory {
  createPolicy(
    policyName: string,
    policyOptions?: TrustedTypePolicyOptions,
  ): TrustedTypePolicy;
  isHTML(value: unknown): value is TrustedHTML;
  isScript(value: unknown): value is TrustedScript;
  isScriptURL(value: unknown): value is TrustedScriptURL;
  readonly emptyHTML: TrustedHTML;
  readonly emptyScript: TrustedScript;
  getAttributeType(
    tagName: string,
    attribute: string,
    elementNs?: string,
    attrNs?: string,
  ): string | null;
  getPropertyType(
    tagName: string,
    property: string,
    elementNs?: string,
  ): string | null;
  readonly defaultPolicy: TrustedTypePolicy | null;
}

type TrustedHTML = {
  readonly __brand: "TrustedHTML";
  toString(): string;
} & string;

type TrustedScript = {
  readonly __brand: "TrustedScript";
  toString(): string;
} & string;

type TrustedScriptURL = {
  readonly __brand: "TrustedScriptURL";
  toString(): string;
} & string;

interface Window {
  trustedTypes?: TrustedTypePolicyFactory;
}
