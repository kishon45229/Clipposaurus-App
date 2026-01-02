import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCodeTab } from "@/contexts/CodeTabContext";

export const CodeLanguageSelection = React.memo(() => {
  const { selectedLanguage, handleLanguageChange } = useCodeTab();

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px] rounded-2xl">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="typescript">TypeScript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
          <SelectItem value="csharp">C#</SelectItem>
          <SelectItem value="cpp">C++</SelectItem>
          <SelectItem value="ruby">Ruby</SelectItem>
          <SelectItem value="go">Go</SelectItem>
          <SelectItem value="php">PHP</SelectItem>
          <SelectItem value="swift">Swift</SelectItem>
          <SelectItem value="html">HTML</SelectItem>
          <SelectItem value="css">CSS</SelectItem>
          <SelectItem value="json">JSON</SelectItem>
          <SelectItem value="xml">XML</SelectItem>
          <SelectItem value="sql">SQL</SelectItem>
          <SelectItem value="bash">Bash</SelectItem>
          <SelectItem value="plaintext">Plain Text</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
});

CodeLanguageSelection.displayName = 'CodeLanguageSelection';
