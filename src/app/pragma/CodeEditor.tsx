"use client";
import { useState } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { IoMdClose, IoMdExpand } from "react-icons/io";
import { FaPlay, FaStopCircle } from "react-icons/fa";

interface Language {
  name: string;
  value: string;
  version: string;
  extension: () => any;
}

const languages: Language[] = [
  { name: "Python", value: "python", version: "3.10.0", extension: python },
  { name: "C++", value: "cpp", version: "10.2.0", extension: cpp },
  { name: "Java", value: "java", version: "15.0.2", extension: java },
];

const defaultCode: Record<string, string> = {
  python: `print("Hello from Python!")`,
  cpp: `#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello from C++!";\n  return 0;\n}`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello from Java!");\n  }\n}`,
};

export default function CodeCompiler() {
  const [selectedLang, setSelectedLang] = useState<Language>(languages[0]);
  const [code, setCode] = useState<string>(defaultCode[selectedLang.value]);
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOutput, setShowOutput] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(true);
  const [showCode, setShowCode] = useState<boolean>(true);

  const runCode = async () => {
    setLoading(true);
    setOutput("Running...");
    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: selectedLang.value,
        version: selectedLang.version,
        files: [{ content: code }],
        stdin: "",
        args: [],
      });
      setOutput(response.data.run.output || "No output");
    } catch (error: any) {
      console.error("Execution error:", error);
      setOutput(`Error running code:\n${
        (error.response?.data?.message || error.message)
          .split('\n')
          .map((line: string) => line
            .replace(/^\s*File "Your code", /g, '')
          )
          .join('\n')
      }`);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center p-4 h-full text-smallText">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        {/* Language Selection and Run Button */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-lg text-sideBarText">Select Language:</label>
            <select
              className="w-full p-2 border border-inputBorder rounded text-smallText bg-backgroundColor"
              onChange={(e) => {
                const lang = languages.find((l) => l.value === e.target.value);
                if (lang) {
                  setSelectedLang(lang);
                  setCode(defaultCode[lang.value]);
                  setOutput("");
                }
              }}
              value={selectedLang.value}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value} className="text-chatText">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={runCode}
            className="h-10 px-4 mt-8 hover:bg-iconColorsFunctional text-buttonText 
                      bg-gradientButton rounded-xl disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            {loading ? (<FaStopCircle />):(<FaPlay />)}
          </button>
        </div>
      <div className="flex flex-col gap-5">

      
        {/* Code Editor */}
        <div
    className={`border border-inputBorder rounded-lg overflow-auto w-full min-h-12 ${showCode ? "h-12 overflow-clip" : "min-h-full"} bg-[#282a36] text-[#f8f8f2]`}
  > 
  <div className="flex justify-between  items-center bg-[#44475a] mb-4 py-2 px-4">
        <h2 className="text-lg font-semibold  text-[#f8f8f2]">Code:</h2>
        <button onClick={() => setShowCode(!showCode)} className="bg-proFill p-1 rounded">
          {showCode ? (
            
            <IoMdExpand size={24} className="text-black" />
          ):(<IoMdClose size={24} className="fill-black" />
        ) }
        </button>
      </div>
          <CodeMirror
            value={code}
            height= "100vh"
            extensions={[selectedLang.extension()]}
            theme={dracula}
            onChange={(val) => setCode(val)}
          />
        </div>
<div className="h-full mb-10">
        {/* Output Display */}
        {showOutput && (
  <div
    className={`border border-inputBorder rounded-lg overflow-auto w-full min-h-12 ${show ? "h-12 overflow-clip" : "min-h-full"} bg-[#282a36] text-[#f8f8f2]`}
  >
    <div className="flex flex-col h-full">
      <div className="flex justify-between py-2 px-4 bg-[#44475a] items-center">
        <h2 className="text-lg font-semibold  text-[#f8f8f2]">Output:</h2>
        <button onClick={() => setShow(!show)} className="bg-proFill p-1 rounded">
          {show ? (
            
            <IoMdExpand size={24} className="text-black" />
          ):(<IoMdClose size={24} className="fill-black" />
        ) }
        </button>
      </div>
      <pre className="flex-1 whitespace-pre-wrap text-[#50fa7b] h-[100vh] overflow-auto p-2 pb-2 rounded">
        {output}
      </pre>
    </div>
  </div>
)}

        </div>
        <div className="w-full bg-littleLineBelowUser">
          
        </div>
        </div>
      </div>
    </div>
  );
}