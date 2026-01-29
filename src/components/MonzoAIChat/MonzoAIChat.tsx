"use client";

import React, { useState, useCallback } from "react";
import { TextArea, IconButton } from "@/components";
import styles from "./MonzoAIChat.module.css";

export interface MonzoAIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const DEFAULT_ACTION_ICONS = [
  { icon: "action_plus" as const, ariaLabel: "Add" },
  { icon: "object_document" as const, ariaLabel: "Attachment" },
  { icon: "general_mic_on" as const, ariaLabel: "Voice Input" },
  { icon: "action_send" as const, ariaLabel: "Send" },
];

export interface MonzoAIChatProps {
  /** Initial or controlled messages */
  messages?: MonzoAIChatMessage[];
  /** Called when the user sends a message */
  onSend?: (content: string) => void;
  /** Optional placeholder for the input */
  placeholder?: string;
  /** Optional class for the root element */
  className?: string;
}

export default function MonzoAIChat({
  messages: controlledMessages,
  onSend,
  placeholder = "Message Monzo AI...",
  className,
}: MonzoAIChatProps) {
  const [inputValue, setInputValue] = useState("");
  const [internalMessages, setInternalMessages] = useState<
    MonzoAIChatMessage[]
  >([]);

  const messages = controlledMessages ?? internalMessages;
  const isControlled = controlledMessages !== undefined;

  const handleSubmit = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (!isControlled) {
      setInternalMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: "user",
          content: trimmed,
        },
      ]);
    }
    onSend?.(trimmed);
    setInputValue("");
  }, [inputValue, isControlled, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <div className={styles.messages}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            Start a conversation with Monzo AI. Ask about your data or request a
            chart.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${
                msg.role === "user"
                  ? styles.messageUser
                  : styles.messageAssistant
              }`}
            >
              {msg.content}
            </div>
          ))
        )}
      </div>
      <div className={styles.inputSection}>
        <div className={styles.textAreaWrap}>
          <TextArea
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
        </div>
        <div className={styles.actionRow}>
          {DEFAULT_ACTION_ICONS.map(({ icon, ariaLabel }, index) => (
            <IconButton
              key={`${icon}-${index}`}
              variant="tertiary"
              size="medium"
              icon={icon}
              iconSize="medium"
              aria-label={ariaLabel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
