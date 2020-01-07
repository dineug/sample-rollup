import pkg from "./package.json";
import config from "./rollup.config.common";
import { uglify } from "rollup-plugin-uglify";

const { umd, esm, css, cssMin, banner } = config();

export default [
  {
    input: "src/ts/index.ts",
    output: [
      {
        name: "sample",
        file: pkg.browser,
        format: "umd",
        banner
      },
      {
        name: "sample",
        file: `dist/${pkg.name}.umd.min.js`,
        format: "umd",
        plugins: [uglify()],
        banner
      }
    ],
    plugins: umd
  },
  {
    input: "src/ts/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        banner
      },
      {
        file: pkg.module,
        format: "es",
        banner
      }
    ],
    plugins: esm
  },
  {
    input: "src/sass/index.scss",
    output: {
      file: `dist/${pkg.name}.css`,
      format: "es"
    },
    plugins: css
  },
  {
    input: "src/sass/index.scss",
    output: {
      file: `dist/${pkg.name}.min.css`,
      format: "es"
    },
    plugins: cssMin
  }
];
