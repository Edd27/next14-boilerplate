const path = require("path");

const buildPrettierCommand = (filenames) =>
  `npx prettier --write ${filenames.join(" ")}`;

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const buildTypeCheckCommand = () => "tsc --noEmit -p tsconfig.json";

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    buildPrettierCommand,
    buildEslintCommand,
    buildTypeCheckCommand,
  ],
};
