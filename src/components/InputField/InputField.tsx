"use client";

import React, { InputHTMLAttributes, useId } from "react";
import styles from "./InputField.module.css";

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  /** Label shown above the input */
  label: string;
  /** Description or hint shown below the input */
  description?: string;
  /** Error message; when set, field shows error state and description shows this message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Optional class for the root element */
  className?: string;
}

export default function InputField({
  label,
  description,
  error,
  disabled = false,
  id: idProp,
  className,
  ...inputProps
}: InputFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const descriptionId = `${id}-description`;
  const hasError = Boolean(error);

  return (
    <div
      className={`${styles.root} ${className ?? ""}`}
      data-error={hasError}
      data-disabled={disabled}
    >
      <label htmlFor={id} className={styles.label} id={`${id}-label`}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        <input
          id={id}
          className={styles.input}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={description || error ? descriptionId : undefined}
          {...inputProps}
        />
      </div>
      {(description || error) && (
        <p id={descriptionId} className={styles.description} role={hasError ? "alert" : undefined}>
          {error ?? description}
        </p>
      )}
    </div>
  );
}
