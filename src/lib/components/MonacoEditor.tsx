import Editor, { useMonaco } from "@monaco-editor/react";
import { useCallback, useEffect } from "react";
import { useFile } from "../stores/useFile";
import { debounce } from "../utils/utils";
import { useApp } from "../stores/useApp";
import { useShallow } from "zustand/react/shallow";

const editorOptions = {
  formatOnPaste: true,
  formatOnType: true,
  minimap: {
    enabled: false,
  },
};

const MonacoEditor = () => {
  const isDarkMode = true;

  const setIsLoading = useApp((state) => state.setIsLoading);
  const theme = isDarkMode ? "vs-dark" : "light";
  const format = useFile((state) => state.format);

  const monaco = useMonaco();
  const [contents, setContents] = useFile(
    useShallow((state) => [state.contents, state.setContents])
  );

  const debouncedSetContents = debounce((contents) => {
    setContents(contents);
  }, 800);

  useEffect(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
    });
  }, [monaco?.languages.json.jsonDefaults]);
  const defaultJson = `{
  "users": [
    {
      "id": 1,
      "name": "Alice Smith",
      "email": "alice.smith@example.com",
      "roles": ["admin", "editor"]
    },
    {
      "id": 2,
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "roles": ["user"]
    }
  ],
  "settings": {
    "theme": "dark",
    "notifications": true,
    "language": "en-US"
  },
  "products": [
    {
      "id": 101,
      "name": "Laptop",
      "price": 999.99,
      "inStock": true
    },
    {
      "id": 102,
      "name": "Smartphone",
      "price": 699.99,
      "inStock": false
    }
  ]
}`;
  useEffect(() => {
    // Initialize the editor with default JSON if contents are empty
    if (!contents) {
      setContents(defaultJson);
    }
  }, [contents, setContents]);
  const handleGraphChange = useCallback(
    (contents: string | undefined) => {
      if (contents === undefined) return;

      debouncedSetContents(contents);
    },
    [setContents]
  );
  return (
    <Editor
      theme={theme}
      height="100%"
      language={format}
      options={editorOptions}
      onMount={() => setIsLoading(true)}
      value={contents}
      onChange={handleGraphChange}
    />
  );
};

export default MonacoEditor;
