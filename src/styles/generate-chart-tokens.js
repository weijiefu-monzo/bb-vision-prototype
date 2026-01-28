const fs = require("fs");
const path = require("path");

function toKebabCase(str) {
  return str
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "")
    .replace(/%/g, "-pct");
}

function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function extractTokens(obj, prefix = "", result = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (
      key === "$type" ||
      key === "$extensions" ||
      key === "$description" ||
      key === "$value"
    ) {
      continue;
    }

    const newPrefix = prefix
      ? `${prefix}-${toKebabCase(key)}`
      : toKebabCase(key);

    if (value && typeof value === "object" && "$value" in value) {
      const tokenValue = value.$value;
      if (tokenValue && typeof tokenValue === "object" && "hex" in tokenValue) {
        const hex = tokenValue.hex;
        const alpha =
          tokenValue.alpha !== undefined ? roundToTwo(tokenValue.alpha) : 1;
        if (alpha < 1) {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          result[`--${newPrefix}`] = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else {
          result[`--${newPrefix}`] = hex;
        }
      } else if (typeof tokenValue === "string") {
        result[`--${newPrefix}`] = tokenValue;
      } else if (typeof tokenValue === "number") {
        const roundedValue = roundToTwo(tokenValue);
        result[`--${newPrefix}`] =
          newPrefix.includes("spacing-") || newPrefix.includes("size-")
            ? `${roundedValue}px`
            : roundedValue;
      }
    } else if (value && typeof value === "object" && !("$value" in value)) {
      extractTokens(value, newPrefix, result);
    }
  }
  return result;
}

const chartPath = path.join(__dirname, "tokens", "Chart.json");
const chartFile = JSON.parse(fs.readFileSync(chartPath, "utf8"));
const chartTokens = extractTokens(chartFile.chart || {}, "chart");

let css = ":root {\n";
css += "  /* Chart Tokens */\n";
Object.entries(chartTokens)
  .sort()
  .forEach(([key, value]) => {
    css += `  ${key}: ${value};\n`;
  });
css += "}\n";

const outputPath = path.join(__dirname, "chart.css");
fs.writeFileSync(outputPath, css, "utf8");

console.log("✅ Generated chart.css successfully!");
console.log(`   - ${Object.keys(chartTokens).length} chart tokens`);
