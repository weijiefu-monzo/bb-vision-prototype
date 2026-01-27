"use client";

import React, { HTMLAttributes } from "react";
import Image from "next/image";
import styles from "./Avatar.module.css";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  image?: string;
  name?: string;
  initials?: string;
  size?: "small" | "medium" | "large";
}

function getInitialsFromName(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

const sizeMap = {
  small: 24,
  medium: 32,
  large: 40,
};

export default function Avatar({
  image,
  name,
  initials,
  size = "medium",
  className,
  ...props
}: AvatarProps) {
  const displayInitials = initials || (name ? getInitialsFromName(name) : "");
  const imageSize = sizeMap[size];

  return (
    <div
      className={`${styles.avatar} ${styles[`avatar${size.charAt(0).toUpperCase() + size.slice(1)}`]} ${className || ""}`}
      {...props}
    >
      {image ? (
        <Image
          src={image}
          alt={name || "Avatar"}
          width={imageSize}
          height={imageSize}
          className={styles.avatarImage}
        />
      ) : (
        <span className={styles.avatarInitials}>{displayInitials}</span>
      )}
    </div>
  );
}
