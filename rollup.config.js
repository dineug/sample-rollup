import pkg from "./package.json";
import plugins from "./rollup.config.plugins";
import { uglify } from "rollup-plugin-uglify";

const { umd, esm, css } = plugins();

export default [
  {
    input: "src/ts/index.ts",
    output: [
      {
        name: "sample",
        file: pkg.browser,
        format: "umd"
      },
      {
        name: "sample",
        file: `dist/${pkg.name}.umd.min.js`,
        format: "umd",
        plugins: [uglify()]
      }
    ],
    plugins: umd
  },
  {
    input: "src/ts/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs"
      },
      {
        file: `dist/${pkg.name}.cjs.min.js`,
        format: "cjs"
      },
      {
        file: pkg.module,
        format: "es"
      },
      {
        file: `dist/${pkg.name}.esm.min.js`,
        format: "es"
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
  }
];
