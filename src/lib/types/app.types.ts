import type { CSSProperties, ComponentProps } from "react";
import { MiniMap } from "reactflow";
export type MinimapTheme = {
  backgroundColor: CSSProperties["backgroundColor"];
  maskColor: ComponentProps<typeof MiniMap>["maskColor"];
  nodeColor: ComponentProps<typeof MiniMap>["nodeColor"];
};

export enum IMAGE_TYPES {
  "PNG" = "png",
  "JPEG" = "jpeg",
  "SVG" = "svg",
}
