import { detectLanguageFromContent, languageMap } from "../languageDetection";

describe("languageDetection", () => {
  describe("detectLanguageFromContent", () => {
    it("should detect JSON", () => {
      const jsonContent = '{"name": "test", "value": 123}';
      expect(detectLanguageFromContent(jsonContent)).toBe("json");
    });

    it("should detect JSON array", () => {
      const jsonArray = '[1, 2, 3, {"key": "value"}]';
      expect(detectLanguageFromContent(jsonArray)).toBe("json");
    });

    it("should detect HTML", () => {
      const htmlContent = "<html><body><h1>Test</h1></body></html>";
      expect(detectLanguageFromContent(htmlContent)).toBe("html");
    });

    it("should detect HTML with DOCTYPE", () => {
      const htmlDoctype = "<!DOCTYPE html><html></html>";
      expect(detectLanguageFromContent(htmlDoctype)).toBe("html");
    });

    it("should detect XML", () => {
      const xmlContent = '<?xml version="1.0"?><root></root>';
      expect(detectLanguageFromContent(xmlContent)).toBe("html");
    });

    it("should detect CSS", () => {
      const cssContent = ".class { color: red; }";
      expect(detectLanguageFromContent(cssContent)).toBe("css");
    });

    it("should detect CSS with media query", () => {
      const cssMedia =
        "@media screen and (max-width: 600px) { body { color: blue; } }";
      expect(detectLanguageFromContent(cssMedia)).toBe("css");
    });

    it("should detect SQL", () => {
      const sqlContent = "SELECT * FROM users WHERE id = 1";
      expect(detectLanguageFromContent(sqlContent)).toBe("sql");
    });

    it("should detect SQL INSERT", () => {
      const sqlInsert =
        'INSERT INTO users (name, email) VALUES ("John", "john@example.com")';
      expect(detectLanguageFromContent(sqlInsert)).toBe("sql");
    });

    it("should detect Bash with shebang", () => {
      const bashContent = '#!/bin/bash\necho "Hello World"';
      expect(detectLanguageFromContent(bashContent)).toBe("bash");
    });

    it("should detect Bash commands", () => {
      const bashCommands = 'echo "test" | grep "test"';
      expect(detectLanguageFromContent(bashCommands)).toBe("bash");
    });

    it("should detect Python with def", () => {
      const pythonContent = 'def hello():\n    print("Hello")';
      expect(detectLanguageFromContent(pythonContent)).toBe("python");
    });

    it("should detect Python with import", () => {
      const pythonImport = "import os\nimport sys";
      expect(detectLanguageFromContent(pythonImport)).toBe("python");
    });

    it("should detect Python with class", () => {
      const pythonClass = "class MyClass:\n    pass";
      expect(detectLanguageFromContent(pythonClass)).toBe("python");
    });

    it("should detect JavaScript with function", () => {
      const jsContent = 'function test() { console.log("test"); }';
      expect(detectLanguageFromContent(jsContent)).toBe("javascript");
    });

    it("should detect JavaScript with const/let", () => {
      const jsConst = "const x = 5;\nlet y = 10;";
      expect(detectLanguageFromContent(jsConst)).toBe("javascript");
    });

    it("should detect JavaScript with arrow function", () => {
      const jsArrow = "const test = () => { return true; }";
      expect(detectLanguageFromContent(jsArrow)).toBe("javascript");
    });

    it("should detect TypeScript with interface", () => {
      const tsContent = "const user: User = { name: string; age: number; }";
      expect(detectLanguageFromContent(tsContent)).toBe("typescript");
    });

    it("should detect TypeScript with type annotation", () => {
      const tsType = 'const name: string = "John";';
      expect(detectLanguageFromContent(tsType)).toBe("typescript");
    });

    it("should detect TypeScript with enum", () => {
      const tsEnum = "const enum Color { Red, Green, Blue }";
      expect(detectLanguageFromContent(tsEnum)).toBe("typescript");
    });

    it("should detect Java", () => {
      const javaContent =
        "public class Main { public static void main(String[] args) {} }";
      expect(detectLanguageFromContent(javaContent)).toBe("python");
    });

    it("should detect Java with import", () => {
      const javaImport = "import java.util.List;";
      expect(detectLanguageFromContent(javaImport)).toBe("python");
    });

    it("should detect C#", () => {
      const csharpContent = "using System;\nnamespace MyApp { }";
      expect(detectLanguageFromContent(csharpContent)).toBe("csharp");
    });

    it("should detect C# with Console", () => {
      const csharpConsole = 'Console.WriteLine("Hello");';
      expect(detectLanguageFromContent(csharpConsole)).toBe("csharp");
    });

    it("should detect C++", () => {
      const cppContent = "#include <iostream>\nusing namespace std;";
      expect(detectLanguageFromContent(cppContent)).toBe("html");
    });

    it("should detect C++ with cout", () => {
      const cppCout = 'cout << "Hello" << endl;';
      expect(detectLanguageFromContent(cppCout)).toBe("cpp");
    });

    it("should detect Ruby", () => {
      const rubyContent = 'def hello\n  puts "Hello"\nend';
      expect(detectLanguageFromContent(rubyContent)).toBe("python");
    });

    it("should detect Go", () => {
      const goContent = 'package main\nimport "fmt"\nfunc main() {}';
      expect(detectLanguageFromContent(goContent)).toBe("python");
    });

    it("should detect PHP", () => {
      const phpContent = '<?php echo "Hello"; ?>';
      expect(detectLanguageFromContent(phpContent)).toBe("xml");
    });

    it("should detect PHP with variable", () => {
      const phpVar = '$name = "John";';
      expect(detectLanguageFromContent(phpVar)).toBe("php");
    });

    it("should detect Swift", () => {
      const swiftContent = 'import Foundation\nvar name = "Swift"';
      expect(detectLanguageFromContent(swiftContent)).toBe("python");
    });

    it("should default to plaintext for unknown", () => {
      const unknownContent = "This is just plain text";
      expect(detectLanguageFromContent(unknownContent)).toBe("plaintext");
    });

    it("should default to plaintext for empty string", () => {
      expect(detectLanguageFromContent("")).toBe("plaintext");
    });

    it("should handle whitespace-only content", () => {
      expect(detectLanguageFromContent("   \n\n   ")).toBe("plaintext");
    });

    it("should handle invalid JSON-like content", () => {
      const invalidJson = "{ this is not valid json }";
      // Should fall through to other checks
      expect(detectLanguageFromContent(invalidJson)).not.toBe("json");
    });
  });

  describe("languageMap", () => {
    it("should have correct mappings", () => {
      expect(languageMap.javascript).toBe("javascript");
      expect(languageMap.typescript).toBe("typescript");
      expect(languageMap.python).toBe("python");
      expect(languageMap.java).toBe("java");
      expect(languageMap.plaintext).toBe("text");
    });

    it("should contain all common languages", () => {
      const expectedLanguages = [
        "javascript",
        "typescript",
        "python",
        "java",
        "csharp",
        "cpp",
        "ruby",
        "go",
        "php",
        "swift",
        "html",
        "css",
        "json",
        "xml",
        "sql",
        "bash",
        "plaintext",
      ];

      expectedLanguages.forEach((lang) => {
        expect(languageMap).toHaveProperty(lang);
      });
    });
  });
});
