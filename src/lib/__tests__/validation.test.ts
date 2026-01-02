import { validateComponentData } from "../validation";
import { COMPONENT_SCHEMAS } from "../registry";

// Mock the registry
jest.mock("../registry", () => ({
  COMPONENT_SCHEMAS: {
    TestComponent: {
      parse: jest.fn((data: any) => {
        if (data && data.valid === true) {
          return data;
        }
        throw new Error("Invalid data");
      }),
    },
    MissingComponent: undefined,
  },
}));

describe("validation", () => {
  describe("validateComponentData", () => {
    it("should return true for valid component data", () => {
      const validData = { valid: true, name: "Test" };
      const result = validateComponentData(validData, "TestComponent");

      expect(result).toBe(true);
    });

    it("should return false for invalid component data", () => {
      const invalidData = { valid: false };

      expect(() => {
        validateComponentData(invalidData, "TestComponent");
      }).toThrow("Invalid data");
    });

    it("should return false for unknown component", () => {
      const data = { test: "data" };
      const result = validateComponentData(data, "UnknownComponent");

      expect(result).toBe(false);
    });

    it("should return false for component with undefined schema", () => {
      const data = { test: "data" };
      const result = validateComponentData(data, "MissingComponent");

      expect(result).toBe(false);
    });

    it("should throw error from schema parse", () => {
      const invalidData = { valid: false };

      expect(() => {
        validateComponentData(invalidData, "TestComponent");
      }).toThrow();
    });

    it("should handle null data", () => {
      expect(() => {
        validateComponentData(null, "TestComponent");
      }).toThrow();
    });

    it("should handle undefined data", () => {
      expect(() => {
        validateComponentData(undefined, "TestComponent");
      }).toThrow();
    });

    it("should handle empty string as componentId", () => {
      const data = { test: "data" };
      const result = validateComponentData(data, "");

      expect(result).toBe(false);
    });
  });
});
