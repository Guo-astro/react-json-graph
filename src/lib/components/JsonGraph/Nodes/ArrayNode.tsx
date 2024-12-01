import { type NodeProps } from "reactflow";
import { DefaultHandle } from "../DefaultHandle";
import { type ArrayNodeData, NodeType } from "./node.types";
import { NodeShell } from "./NodeShell";
import { ROOT_NODE_NAME } from "../../../constants/graph.constants";
import { isEmptyArray } from "../../../utils/utils";

/**
 * ArrayNode Component
 *
 * This component represents an array node within the node graph structure. It displays the
 * array's index (or a root identifier) and conditionally renders connection handles based
 * on the node's state and contents.
 *
 * Props:
 * - id: A unique identifier for the node.
 * - data: An object containing the following properties:
 *   - arrayIndex: The index of the array element. Used for display purposes when the node is not the root.
 *   - items: An array of items contained within this array node. Determines the presence of the source handle.
 *   - isRootNode: A boolean indicating whether this node is the root node of the graph.
 *
 * Handles:
 * - Target Handle (`type="target"`):
 *   - **Presence**: Rendered on all nodes except the root node.
 *   - **Purpose**: Allows incoming connections to this node from other nodes.
 *
 * - Source Handle (`type="source"`):
 *   - **Presence**: Rendered only if the `items` array is not empty.
 *   - **Purpose**: Allows outgoing connections from this node to child nodes.
 *
 * Usage:
 * ```tsx
 * <ArrayNode id="unique-node-id" data={{ arrayIndex: 0, items: [...], isRootNode: false }} />
 * ```
 */
export const ArrayNode = ({ id, data }: NodeProps<ArrayNodeData>) => {
  const { arrayIndex, items, isRootNode } = data;

  return (
    <NodeShell nodeId={id} nodeType={NodeType.Array}>
      {!isRootNode && <DefaultHandle id={id} type="target" />}
      <div>{isRootNode ? ROOT_NODE_NAME : `[${arrayIndex}]`}</div>

      {!isEmptyArray(items) && <DefaultHandle id={id} type="source" />}
    </NodeShell>
  );
};
