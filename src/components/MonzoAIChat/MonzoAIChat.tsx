"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  TextArea,
  IconButton,
  MonzoAIThinking,
  MonzoAILoading,
} from "@/components";
import styles from "./MonzoAIChat.module.css";

export interface MonzoAIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const LEFT_ACTION_ICONS = [
  { icon: "action_plus" as const, ariaLabel: "Add" },
  { icon: "object_document" as const, ariaLabel: "Attachment" },
  { icon: "general_mic_on" as const, ariaLabel: "Voice Input" },
];

const SEND_ICON = { icon: "action_send" as const, ariaLabel: "Send" };

export interface MonzoAIChatProps {
  /** Initial or controlled messages */
  messages?: MonzoAIChatMessage[];
  /** Called when the user sends a message */
  onSend?: (content: string) => void;
  /** When true, shows loading dots (e.g. while waiting for AI). If omitted, loading is shown briefly after send. */
  loading?: boolean;
  /** Optional placeholder for the input */
  placeholder?: string;
  /** Optional class for the root element */
  className?: string;
}

const LOADING_DEMO_DURATION_MS = 2500;

export default function MonzoAIChat({
  messages: controlledMessages,
  onSend,
  loading: loadingProp,
  placeholder = "Message Monzo AI...",
  className,
}: MonzoAIChatProps) {
  const [inputValue, setInputValue] = useState("");
  const [internalMessages, setInternalMessages] = useState<
    MonzoAIChatMessage[]
  >([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const messages = controlledMessages ?? internalMessages;
  const isControlled = controlledMessages !== undefined;
  const loading = loadingProp !== undefined ? loadingProp : internalLoading;

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
    };
  }, []);

  // Scroll to bottom when messages or loading change so the loading dots stay visible
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, loading]);

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
    if (loadingProp === undefined) {
      setInternalLoading(true);
      if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = setTimeout(() => {
        setInternalLoading(false);
        loadingTimeoutRef.current = null;
      }, LOADING_DEMO_DURATION_MS);
    }
  }, [inputValue, isControlled, onSend, loadingProp]);

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
            <MonzoAIThinking />
          </div>
        ) : (
          <>
            {messages.map((msg) => (
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
            ))}
            {loading && (
              <div
                className={`${styles.message} ${styles.messageAssistant} ${styles.loadingRow}`}
                role="status"
                aria-live="polite"
              >
                <MonzoAILoading />
              </div>
            )}
            <div ref={messagesEndRef} aria-hidden />
          </>
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
          <div className={styles.actionGroup}>
            {LEFT_ACTION_ICONS.map(({ icon, ariaLabel }, index) => (
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
          <div className={styles.actionGroup}>
            <IconButton
              variant="primary"
              size="medium"
              icon={SEND_ICON.icon}
              iconSize="medium"
              aria-label={SEND_ICON.ariaLabel}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
