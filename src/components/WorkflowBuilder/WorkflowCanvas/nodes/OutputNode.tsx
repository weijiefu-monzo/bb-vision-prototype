"use client";

import React from "react";
import { type NodeProps } from "@xyflow/react";
import ConnectableNode from "./ConnectableNode";
import type { ConnectableNodeType } from "./ConnectableNode";

/** OutputNode: only one input (no outputs). */
export default function OutputNode(props: NodeProps<ConnectableNodeType>) {
  return <ConnectableNode {...props} targetCount={1} sourceCount={0} />;
}
