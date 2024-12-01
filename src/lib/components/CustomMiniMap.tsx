import { MiniMap } from "reactflow";
import { useEffect, useState } from "react";
import type { MinimapTheme } from "../types/app.types";

const lightMinimapTheme: MinimapTheme = {
  backgroundColor: "#ffffff", // backgroundContrast
  maskColor: undefined,
  nodeColor: "lightgray",
};

const darkMinimapTheme: MinimapTheme = {
  backgroundColor: "#16181A", // backgroundContrast
  maskColor: "rgba(15, 15, 15, 0.7)",
  nodeColor: "white",
};
export const CustomMiniMap = () => {
  // TODEO: Implement dark mode
  const isDarkMode = true;
  const [minimapTheme, setMinimapTheme] = useState(darkMinimapTheme);

  useEffect(() => {
    setMinimapTheme(isDarkMode ? darkMinimapTheme : lightMinimapTheme);
  }, [isDarkMode]);

  return (
    <MiniMap
      pannable
      position="bottom-left"
      style={{
        backgroundColor: minimapTheme.backgroundColor,
      }}
      maskColor={minimapTheme.maskColor || "rgba(15, 15, 15, 0.7)"}
      nodeColor={minimapTheme.nodeColor || "white"}
    />
  );
};
