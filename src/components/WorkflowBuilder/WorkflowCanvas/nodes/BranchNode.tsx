"use client";

import React from "react";
import { type NodeProps } from "@xyflow/react";
import ConnectableNode from "./ConnectableNode";
import type { ConnectableNodeType } from "./ConnectableNode";

/** BranchNode: one input and multiple (min=2) outputs. */
export default function BranchNode(props: NodeProps<ConnectableNodeType>) {
  return <ConnectableNode {...props} targetCount={1} sourceCount={2} />;
}
