import pkg from "./package.json";
import plugins from "./rollup.config.plugins";
import { uglify } from "rollup-plugin-uglify";
import stylelint from "rollup-plugin-stylelint";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import postcssPrefixer from "postcss-prefixer";

const { umd, esm } = plugins();

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
    plugins: [
      stylelint(),
      postcss({
        extract: true,
        minimize: true,
        plugins: [
          autoprefixer(),
          postcssPrefixer({
            prefix: `${pkg.name}-`
          })
        ]
      })
    ]
  }
];
