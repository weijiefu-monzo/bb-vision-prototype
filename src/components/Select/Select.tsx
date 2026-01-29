"use client";

import React, { SelectHTMLAttributes, useId } from "react";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  /** Label shown above the select */
  label: string;
  /** Description or hint shown below the select */
  description?: string;
  /** Error message; when set, field shows error state and description shows this message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Options: either { value, label, disabled? }[] or standard option elements as children */
  options?: SelectOption[];
  /** Optional class for the root element */
  className?: string;
}

export default function Select({
  label,
  description,
  error,
  disabled = false,
  options,
  children,
  id: idProp,
  className,
  ...selectProps
}: SelectProps) {
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
      <div className={styles.selectWrap}>
        <select
          id={id}
          className={styles.select}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={description || error ? descriptionId : undefined}
          {...selectProps}
        >
          {options
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>
      </div>
      {(description || error) && (
        <p id={descriptionId} className={styles.description} role={hasError ? "alert" : undefined}>
          {error ?? description}
        </p>
      )}
    </div>
  );
}
