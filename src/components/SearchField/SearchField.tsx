"use client";

import React, {
  InputHTMLAttributes,
  useId,
  useState,
  useCallback,
} from "react";
import { Icon, IconButton } from "@/components";
import styles from "./SearchField.module.css";

export interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "type"
> {
  /** Error message; when set, field shows error state and message below */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Show clear button when field has value */
  clearable?: boolean;
  /** Optional class for the root element */
  className?: string;
}

export default function SearchField({
  error,
  disabled = false,
  clearable = true,
  id: idProp,
  value: valueProp,
  defaultValue,
  onChange,
  className,
  ...inputProps
}: SearchFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? "",
  );
  const value = isControlled ? valueProp : uncontrolledValue;
  const hasValue = String(value ?? "").length > 0;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setUncontrolledValue(e.target.value);
      onChange?.(e);
    },
    [isControlled, onChange],
  );

  const handleClear = useCallback(() => {
    if (!isControlled) setUncontrolledValue("");
    const syntheticEvent = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  }, [isControlled, onChange]);

  return (
    <div
      className={`${styles.root} ${className ?? ""}`}
      data-error={hasError}
      data-disabled={disabled}
    >
      <div className={styles.inputWrap}>
        <Icon
          name="action_search"
          size="medium"
          color="content-secondary"
          className={styles.searchIcon}
        />
        <input
          id={id}
          type="search"
          role="searchbox"
          className={styles.input}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={error ? errorId : undefined}
          value={isControlled ? value : uncontrolledValue}
          onChange={handleChange}
          {...inputProps}
        />
        {clearable && hasValue && !disabled && (
          <IconButton
            type="button"
            icon="navigation_xmark"
            size="medium"
            variant="tertiary"
            className={styles.clearBtn}
            aria-label="Clear search"
            onClick={handleClear}
          />
        )}
      </div>
      {error && (
        <p id={errorId} className={styles.description} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
