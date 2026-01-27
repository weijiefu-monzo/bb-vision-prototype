'use client';

import React, { useState, useEffect } from 'react';
import styles from './Icon.module.css';

export type IconSize = 
  | 'x-small' 
  | 'small' 
  | 'medium' 
  | 'large' 
  | 'x-large' 
  | '2x-large' 
  | '3x-large' 
  | '4x-large' 
  | '5x-large' 
  | '6x-large' 
  | '7x-large' 
  | '8x-large' 
  | '9x-large' 
  | '10x-large' 
  | '11x-large'
  | number; // Allow custom pixel values

export interface IconProps {
  name: string;
  size?: IconSize;
  color?: string; // e.g., "content-primary" maps to --semantic-content-primary
  className?: string;
}

export default function Icon({ 
  name, 
  size = 'medium', 
  color,
  className 
}: IconProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only load on client side after mount
    if (!mounted || typeof window === 'undefined') {
      return;
    }

    // Load SVG from public folder
    const loadIcon = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        // Icons are in public/assets/icons folder, so access them from /assets/icons/
        const iconUrl = `/assets/icons/${name}.svg`;
        
        const response = await fetch(iconUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch icon: ${response.statusText}`);
        }
        const svgText = await response.text();
        if (!svgText) {
          throw new Error('Empty SVG content');
        }
        setSvgContent(svgText);
      } catch (error) {
        console.warn(`Icon "${name}" not found:`, error);
        setSvgContent(null);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadIcon();
  }, [name, mounted]);

  // Get size value - either from token or custom number
  const getSizeValue = (): string => {
    if (typeof size === 'number') {
      return `${size}px`;
    }
    // Map size prop to CSS variable
    const sizeMap: Record<string, string> = {
      'x-small': 'var(--size-x-small)',
      'small': 'var(--size-small)',
      'medium': 'var(--size-medium)',
      'large': 'var(--size-large)',
      'x-large': 'var(--size-x-large)',
      '2x-large': 'var(--size-2x-large)',
      '3x-large': 'var(--size-3x-large)',
      '4x-large': 'var(--size-4x-large)',
      '5x-large': 'var(--size-5x-large)',
      '6x-large': 'var(--size-6x-large)',
      '7x-large': 'var(--size-7x-large)',
      '8x-large': 'var(--size-8x-large)',
      '9x-large': 'var(--size-9x-large)',
      '10x-large': 'var(--size-10x-large)',
      '11x-large': 'var(--size-11x-large)',
    };
    return sizeMap[size] || sizeMap['medium'];
  };

  // Get color value - map to semantic token or use directly
  const getColorValue = (): string | undefined => {
    if (!color) return undefined;
    
    // If it starts with semantic-, use it directly
    if (color.startsWith('semantic-')) {
      return `var(--${color})`;
    }
    
    // Map common color names to semantic tokens
    const colorMap: Record<string, string> = {
      'content-primary': 'var(--semantic-content-primary)',
      'content-secondary': 'var(--semantic-content-secondary)',
      'content-accent': 'var(--semantic-content-accent)',
      'content-disabled': 'var(--semantic-content-disabled)',
      'content-link-default': 'var(--semantic-content-link-default)',
      'content-link-hover': 'var(--semantic-content-link-hover)',
      'content-positive': 'var(--semantic-content-positive)',
      'content-negative': 'var(--semantic-content-negative)',
      'inverse-content-primary': 'var(--semantic-inverse-content-primary)',
    };
    
    return colorMap[color] || color;
  };

  const sizeValue = getSizeValue();
  const colorValue = getColorValue();

  // Don't render anything during SSR
  if (!mounted) {
    return (
      <span
        className={`${styles.icon} ${className || ''}`}
        style={{ 
          width: sizeValue, 
          height: sizeValue,
        }}
        aria-label={`Loading ${name} icon`}
      />
    );
  }

  if (isLoading) {
    return (
      <span
        className={`${styles.icon} ${styles.iconLoading} ${className || ''}`}
        style={{ 
          width: sizeValue, 
          height: sizeValue,
        }}
        aria-label={`Loading ${name} icon`}
      />
    );
  }

  if (hasError || !svgContent) {
    return (
      <span
        className={`${styles.icon} ${className || ''}`}
        style={{ 
          width: sizeValue, 
          height: sizeValue,
        }}
        aria-label={`Icon ${name} not found`}
      />
    );
  }

  // Modify SVG to use the color if specified
  let modifiedSvg = svgContent;
  if (colorValue) {
    // Replace fill attributes and styles
    modifiedSvg = modifiedSvg
      .replace(/fill="[^"]*"/g, `fill="${colorValue}"`)
      .replace(/fill:#[0-9a-fA-F]{6}/g, `fill:${colorValue}`)
      .replace(/style="([^"]*)"/g, (match, styleContent) => {
        const updatedStyle = styleContent
          .replace(/fill:[^;]*/g, `fill:${colorValue}`)
          .replace(/fill-opacity:[^;]*/g, ''); // Remove fill-opacity if present
        return `style="${updatedStyle}"`;
      });
  }

  return (
    <span
      className={`${styles.icon} ${className || ''}`}
      style={{ 
        width: sizeValue, 
        height: sizeValue,
        color: colorValue,
      }}
      dangerouslySetInnerHTML={{ __html: modifiedSvg }}
      aria-label={name}
    />
  );
}
