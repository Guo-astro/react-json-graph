import { Allotment } from "allotment";
import "allotment/dist/style.css";

import MonacoEditor from "../MonacoEditor";

import { useApp } from "../../stores/useApp";
import { InteractiveGraphView } from "../InteractiveGraphView";

export const EditorMainLayput = () => {
  const isEditorVisible = useApp((state) => state.isEditorVisible);

  return (
    <Allotment className="flex !h-[calc(100vh-3.375rem)] justify-between">
      {isEditorVisible && (
        <Allotment.Pane preferredSize={450} maxSize={800} minSize={300}>
          <MonacoEditor />
        </Allotment.Pane>
      )}
      <Allotment.Pane className="w-full h-full">
        <InteractiveGraphView />
      </Allotment.Pane>
    </Allotment>
  );
};
