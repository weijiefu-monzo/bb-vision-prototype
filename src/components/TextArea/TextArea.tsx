"use client";

import React, {
  TextareaHTMLAttributes,
  useId,
  useRef,
  useCallback,
  useEffect,
} from "react";
import styles from "./TextArea.module.css";

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  /** Optional label shown above the textarea */
  label?: string;
  /** Optional description or hint shown below */
  description?: string;
  /** Error message; when set, field shows error state and description shows this message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Optional class for the root element */
  className?: string;
}

function useAutoResize(
  enabled: boolean,
  value: string | number | readonly string[] | undefined,
) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const syncHeight = useCallback(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [enabled]);

  useEffect(() => {
    syncHeight();
  }, [value, syncHeight]);

  return { ref, syncHeight };
}

export default function TextArea({
  label,
  description,
  error,
  disabled = false,
  id: idProp,
  value,
  defaultValue,
  onChange,
  className,
  rows,
  ...textareaProps
}: TextAreaProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descriptionId = `${id}-description`;
  const hasError = Boolean(error);

  const { ref, syncHeight } = useAutoResize(true, value ?? defaultValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      syncHeight();
      onChange?.(e);
    },
    [onChange, syncHeight],
  );

  const hasLabel = label != null && label !== "";
  const hasDescription = (description != null && description !== "") || error;

  return (
    <div
      className={`${styles.root} ${className ?? ""}`}
      data-error={hasError}
      data-disabled={disabled}
    >
      {hasLabel && (
        <label htmlFor={id} className={styles.label} id={`${id}-label`}>
          {label}
        </label>
      )}
      <div className={styles.textareaWrap}>
        <textarea
          ref={ref}
          id={id}
          className={styles.textarea}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasDescription ? descriptionId : undefined}
          rows={rows ?? 3}
          {...textareaProps}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </div>
      {hasDescription && (
        <p
          id={descriptionId}
          className={styles.description}
          role={hasError ? "alert" : undefined}
        >
          {error ?? description}
        </p>
      )}
    </div>
  );
}
