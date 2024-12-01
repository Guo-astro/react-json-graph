import { create } from "zustand";
import { FileFormat } from "../constants/json.constants";
import { contentToJson, convertJsonTree } from "../utils/json.utils";
import type { JsonTree } from "../components/JsonGraph/Nodes/json.types";

type State = {
  contents: string;
  isValidJson: boolean;
  jsonTree: JsonTree;
  format: FileFormat;
};

type Actions = {
  setContents: (contents: string) => void;
  setJsonTree: (jsonTree: JsonTree) => void;
  setIsValidJson: (value: boolean) => void;
};

const initialState: State = {
  format: FileFormat.JSON,
  contents: "",
  isValidJson: false,
  jsonTree: {
    nodes: [],
    edges: [],
  },
};

export const useFile = create<State & Actions>((set, get) => ({
  ...initialState,
  setContents: async (contents: string) => {
    try {
      set({ contents });
      const json = await contentToJson(contents, get().format);
      set({ jsonTree: convertJsonTree(json), isValidJson: true });
    } catch (error) {
      set({ isValidJson: false });
    }
  },
  setJsonTree: (jsonTree: JsonTree) => set({ jsonTree }),
  setIsValidJson: (isValidJson: boolean) => set({ isValidJson }),
}));
