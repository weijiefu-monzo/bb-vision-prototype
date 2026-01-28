"use client";

import React from "react";
import { type NodeProps } from "@xyflow/react";
import ConnectableNode from "./ConnectableNode";
import type { ConnectableNodeType } from "./ConnectableNode";

/** JoinNode: multiple (min=2) inputs and one output. */
export default function JoinNode(props: NodeProps<ConnectableNodeType>) {
  return <ConnectableNode {...props} targetCount={2} sourceCount={1} />;
}
