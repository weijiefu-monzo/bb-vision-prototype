"use client";

import React from "react";
import { type NodeProps } from "@xyflow/react";
import ConnectableNode from "./ConnectableNode";
import type { ConnectableNodeType } from "./ConnectableNode";

/** TransformNode: one input and one output. */
export default function TransformNode(props: NodeProps<ConnectableNodeType>) {
  return <ConnectableNode {...props} targetCount={1} sourceCount={1} />;
}
