const fs = require('fs');
const path = require('path');

// Helper function to convert object path to CSS variable name
function toKebabCase(str) {
  // Replace % with -pct to avoid CSS parsing issues
  return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/%/g, '-pct');
}

// Helper function to round to 2 decimal places
function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// Recursively extract tokens from JSON object
function extractTokens(obj, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$type' || key === '$extensions' || key === '$description' || key === '$value') {
      continue;
    }
    
    const newPrefix = prefix ? `${prefix}-${toKebabCase(key)}` : toKebabCase(key);
    
    if (value && typeof value === 'object' && '$value' in value) {
      // Found a token value
      const tokenValue = value.$value;
      if (tokenValue && typeof tokenValue === 'object' && 'hex' in tokenValue) {
        // It's a color with hex value
        const hex = tokenValue.hex;
        const alpha = tokenValue.alpha !== undefined ? roundToTwo(tokenValue.alpha) : 1;
        
        if (alpha < 1) {
          // Convert hex + alpha to rgba
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          result[`--${newPrefix}`] = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else {
          result[`--${newPrefix}`] = hex;
        }
      } else if (typeof tokenValue === 'string') {
        // String token types
        result[`--${newPrefix}`] = tokenValue;
      } else if (typeof tokenValue === 'number') {
        // Numeric token types - round to 2 decimal places
        const roundedValue = roundToTwo(tokenValue);
        
        // Determine if this should have px unit
        // Add px to: spacing, size, elevation blur/offset values
        // Don't add px to: line-height, motion friction/tension, or values that already have units
        const shouldAddPx = 
          newPrefix.includes('spacing-') ||
          newPrefix.includes('size-') ||
          (newPrefix.includes('elevation-') && (newPrefix.includes('-blur') || newPrefix.includes('-h-offset') || newPrefix.includes('-v-offset')));
        
        if (shouldAddPx && roundedValue % 1 === 0) {
          // Only add px to whole numbers for pixel values
          result[`--${newPrefix}`] = `${roundedValue}px`;
        } else if (shouldAddPx) {
          // For decimal pixel values, keep as is (rare case)
          result[`--${newPrefix}`] = `${roundedValue}px`;
        } else {
          result[`--${newPrefix}`] = roundedValue;
        }
      }
    } else if (value && typeof value === 'object' && !('$value' in value)) {
      // Nested object, recurse
      extractTokens(value, newPrefix, result);
    }
  }
  return result;
}

// Read token files
const primitivePath = path.join(__dirname, 'tokens', 'Primitive.json');
const darkThemePath = path.join(__dirname, 'tokens', 'Theme-Dark.tokens.json');
const lightThemePath = path.join(__dirname, 'tokens', 'Theme-Light.tokens.json');

const primitive = JSON.parse(fs.readFileSync(primitivePath, 'utf8'));
const darkTheme = JSON.parse(fs.readFileSync(darkThemePath, 'utf8'));
const lightTheme = JSON.parse(fs.readFileSync(lightThemePath, 'utf8'));

// Extract tokens
const primitiveTokens = extractTokens(primitive);
// Extract semantic tokens without the 'semantic' prefix since they're already nested
const darkSemanticTokens = extractTokens(darkTheme.semantic || {}, 'semantic');
const lightSemanticTokens = extractTokens(lightTheme.semantic || {}, 'semantic');

// Generate CSS
let css = ':root {\n';
css += '  /* Primitive Tokens */\n';
Object.entries(primitiveTokens).sort().forEach(([key, value]) => {
  css += `  ${key}: ${value};\n`;
});

css += '\n  /* Light Theme Semantic Tokens */\n';
Object.entries(lightSemanticTokens).sort().forEach(([key, value]) => {
  css += `  ${key}: ${value};\n`;
});
css += '}\n\n';

css += '[data-theme="dark"] {\n';
css += '  /* Dark Theme Semantic Tokens */\n';
Object.entries(darkSemanticTokens).sort().forEach(([key, value]) => {
  css += `  ${key}: ${value};\n`;
});
css += '}\n';

// Write to tokens.css
const outputPath = path.join(__dirname, 'tokens.css');
fs.writeFileSync(outputPath, css, 'utf8');

console.log('✅ Generated tokens.css successfully!');
console.log(`   - ${Object.keys(primitiveTokens).length} primitive tokens`);
console.log(`   - ${Object.keys(lightSemanticTokens).length} light theme tokens`);
console.log(`   - ${Object.keys(darkSemanticTokens).length} dark theme tokens`);
