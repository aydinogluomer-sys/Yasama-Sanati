import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".chrome-*/**",
      ".next/**",
      // Next'in ürettiği dosya; `next lint` bunu hariç tutuyordu, `eslint .` tutmuyor.
      "next-env.d.ts",
      ".testsprite/**",
      "agent-reports/**",
      "dump/**",
      "node_modules/**",
      "testsprite-plans/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
