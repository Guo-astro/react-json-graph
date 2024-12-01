import { ReactFlowProvider } from "reactflow";
import Header from "./Header";
import { EnvironmentLoader } from "@/lib/components/EditorLayout/Loader";
import { EditorControlHeader } from "@/lib/components/EditorLayout/EditorControlHeader";
import { EditorMainLayput } from "@/lib/components/EditorLayout/EditorMainLayput";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300">
      <Header />
      <ReactFlowProvider>
        <EnvironmentLoader />
        <EditorControlHeader />
        <EditorMainLayput />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
