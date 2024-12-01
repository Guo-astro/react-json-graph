import { DefaultHandle } from "../DefaultHandle";
import { JsonDataType } from "./json.types";
import { type PrimitiveNodeData, NodeType } from "./node.types";
import { NodeShell } from "./NodeShell";
import { type NodeProps } from "reactflow";

export const PrimitiveNode = ({ id, data }: NodeProps<PrimitiveNodeData>) => {
  return (
    <NodeShell nodeId={id} nodeType={NodeType.Primitive}>
      <DefaultHandle id={id} type="target" />

      <div className="overflow-hidden text-ellipsis whitespace-nowrap pr-4 text-center max-w-valueMaxWidth">
        {data.dataType === JsonDataType.String && data.contents}

        {data.dataType === JsonDataType.Number && (
          <span className="text-orange-400">{`${data.value}`}</span>
        )}
        {data.dataType === JsonDataType.Boolean && (
          <span
            className={`font-semibold ${data.value ? "text-blue-500" : "text-red-500"} `}
          >{`${data.value}`}</span>
        )}
        {data.dataType === JsonDataType.Null && (
          <span className="font-semibold text-gray-400">{`${data.value}`}</span>
        )}
      </div>
    </NodeShell>
  );
};
