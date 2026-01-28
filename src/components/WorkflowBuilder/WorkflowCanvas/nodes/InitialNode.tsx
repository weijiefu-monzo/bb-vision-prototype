"use client";

import React from "react";
import { type NodeProps } from "@xyflow/react";
import ConnectableNode from "./ConnectableNode";
import type { ConnectableNodeType } from "./ConnectableNode";

/** InitialNode: only one output (no inputs). */
export default function InitialNode(props: NodeProps<ConnectableNodeType>) {
  return <ConnectableNode {...props} targetCount={0} sourceCount={1} />;
}
