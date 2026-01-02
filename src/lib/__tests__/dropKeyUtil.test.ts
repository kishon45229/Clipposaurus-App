import {
  validateAndSanitizeDropKey,
  validateDropKey,
  formatDropKey,
  CodeInputValidation,
} from "../dropKeyUtil";

describe("dropKeyUtil", () => {
  describe("validateAndSanitizeDropKey", () => {
    it("should return valid for empty input", () => {
      const result = validateAndSanitizeDropKey("");

      expect(result.isValid).toBe(true);
      expect(result.sanitizedValue).toBe("");
      expect(result.error).toBeUndefined();
    });

    it("should sanitize valid alphabetic input", () => {
      const result = validateAndSanitizeDropKey("test");

      expect(result.isValid).toBe(true);
      expect(result.sanitizedValue).toBe("test");
      expect(result.error).toBeUndefined();
    });

    it("should remove non-alphabetic characters", () => {
      const result = validateAndSanitizeDropKey("test123");

      expect(result.isValid).toBe(true);
      expect(result.sanitizedValue).toBe("test");
      expect(result.error).toBeUndefined();
    });

    it("should remove special characters", () => {
      const result = validateAndSanitizeDropKey("te$t@#");

      expect(result.isValid).toBe(true);
      expect(result.sanitizedValue).toBe("tet");
      expect(result.error).toBeUndefined();
    });

    it("should remove spaces", () => {
      const result = validateAndSanitizeDropKey("te st");

      expect(result.isValid).toBe(true);
      expect(result.sanitizedValue).toBe("test");
      expect(result.error).toBeUndefined();
    });

    it("should handle uppercase letters", () => {
      const result = validateAndSanitizeDropKey("TEST");

      expect(result.isValid).toBe(true);
      expect(result.sanitizedValue).toBe("TEST");
      expect(result.error).toBeUndefined();
    });

    it("should handle mixed case", () => {
      const result = validateAndSanitizeDropKey("TeSt");

      expect(result.isValid).toBe(true);
      expect(result.sanitizedValue).toBe("TeSt");
      expect(result.error).toBeUndefined();
    });

    it("should enforce default max length of 6", () => {
      const result = validateAndSanitizeDropKey("testword");

      expect(result.isValid).toBe(false);
      expect(result.sanitizedValue).toBe("testwo");
      expect(result.error).toBe("Word cannot exceed 6 characters");
    });

    it("should enforce custom max length", () => {
      const result = validateAndSanitizeDropKey("testword", 4);

      expect(result.isValid).toBe(false);
      expect(result.sanitizedValue).toBe("test");
      expect(result.error).toBe("Word cannot exceed 4 characters");
    });

    it("should handle exactly max length", () => {
      const result = validateAndSanitizeDropKey("test", 4);

      expect(result.isValid).toBe(true);
      expect(result.sanitizedValue).toBe("test");
      expect(result.error).toBeUndefined();
    });

    it("should sanitize and then check length", () => {
      const result = validateAndSanitizeDropKey("test123word", 6);

      expect(result.isValid).toBe(false);
      expect(result.sanitizedValue).toBe("testwo");
      expect(result.error).toBe("Word cannot exceed 6 characters");
    });
  });

  describe("validateDropKey", () => {
    it("should return true for valid drop key", () => {
      const result = validateDropKey("word1", "word2", "word3");

      expect(result).toBe(true);
    });

    it("should return false for empty identifier", () => {
      const result = validateDropKey("", "word2", "word3");

      expect(result).toBe(false);
    });

    it("should return false for empty systemSecret", () => {
      const result = validateDropKey("word1", "", "word3");

      expect(result).toBe(false);
    });

    it("should return false for empty userSecret", () => {
      const result = validateDropKey("word1", "word2", "");

      expect(result).toBe(false);
    });

    it("should return false if identifier exceeds 6 characters", () => {
      const result = validateDropKey("word123", "word2", "word3");

      expect(result).toBe(false);
    });

    it("should return false if systemSecret exceeds 6 characters", () => {
      const result = validateDropKey("word1", "word123", "word3");

      expect(result).toBe(false);
    });

    it("should return false if userSecret exceeds 6 characters", () => {
      const result = validateDropKey("word1", "word2", "word123");

      expect(result).toBe(false);
    });

    it("should return false if identifier equals systemSecret", () => {
      const result = validateDropKey("same", "same", "word3");

      expect(result).toBe(false);
    });

    it("should return false if identifier equals userSecret", () => {
      const result = validateDropKey("same", "word2", "same");

      expect(result).toBe(false);
    });

    it("should return false if systemSecret equals userSecret", () => {
      const result = validateDropKey("word1", "same", "same");

      expect(result).toBe(false);
    });

    it("should return false if all words are the same", () => {
      const result = validateDropKey("same", "same", "same");

      expect(result).toBe(false);
    });

    it("should handle case sensitivity for duplicates", () => {
      const result = validateDropKey("Word", "word", "word3");

      // Case sensitive comparison - these are different
      expect(result).toBe(true);
    });

    it("should accept words at max length", () => {
      const result = validateDropKey("word12", "word34", "word56");

      expect(result).toBe(true);
    });

    it("should accept single character words", () => {
      const result = validateDropKey("a", "b", "c");

      expect(result).toBe(true);
    });
  });

  describe("formatDropKey", () => {
    it("should format drop key with lowercase", () => {
      const result = formatDropKey("WORD1", "WORD2", "WORD3");

      expect(result).toBe("word1-word2-word3");
    });

    it("should format drop key with mixed case", () => {
      const result = formatDropKey("Word1", "wOrD2", "WORD3");

      expect(result).toBe("word1-word2-word3");
    });

    it("should format drop key with already lowercase", () => {
      const result = formatDropKey("word1", "word2", "word3");

      expect(result).toBe("word1-word2-word3");
    });

    it("should preserve hyphens correctly", () => {
      const result = formatDropKey("test", "drop", "key");

      expect(result).toBe("test-drop-key");
      expect(result.split("-")).toHaveLength(3);
    });

    it("should handle single character words", () => {
      const result = formatDropKey("a", "b", "c");

      expect(result).toBe("a-b-c");
    });
  });
});
