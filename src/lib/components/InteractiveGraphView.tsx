"use client";

import { useEffect } from "react";

import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  type EdgeTypes,
  type NodeTypes,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { CustomMiniMap } from "./CustomMiniMap";
import { EdgeType } from "../constants/graph.constants";
import { useFile } from "../stores/useFile";
import { DefaultEdge } from "./JsonGraph/DefaultEdge";
import { ArrayNode } from "./JsonGraph/Nodes/ArrayNode";
import { NodeType } from "./JsonGraph/Nodes/node.types";
import { ObjectNode } from "./JsonGraph/Nodes/ObjectNode/ObjectNode";
import { PrimitiveNode } from "./JsonGraph/Nodes/PrimitiveNode";

const nodeTypes: NodeTypes = {
  [NodeType.Object]: ObjectNode,
  [NodeType.Array]: ArrayNode,
  [NodeType.Primitive]: PrimitiveNode,
};

const edgeTypes: EdgeTypes = {
  [EdgeType.Default]: DefaultEdge,
};

export const InteractiveGraphView = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const jsonTree = useFile((state) => state.jsonTree);

  useEffect(() => {
    const { nodes, edges } = jsonTree;

    setNodes(nodes);
    setEdges(edges);

    window.requestAnimationFrame(() => {
      // After editing content in editor in UI only then fitView gets invoked
      fitView();
    });
  }, [jsonTree]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      nodesDraggable={false}
      zoomOnPinch
      zoomOnDoubleClick
      minZoom={0.01}
      className="dark:bg-darkBackground bg-lightBackground text-lightText dark:text-darkText"
    >
      <CustomMiniMap />
      <Controls showInteractive={false} position="bottom-right" />
      <Background variant={BackgroundVariant.Dots} gap={30} size={3} />
    </ReactFlow>
  );
};
