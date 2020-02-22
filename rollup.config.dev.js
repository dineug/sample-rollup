import pkg from "./package.json";
import config from "./rollup.config.common";
import browsersync from "rollup-plugin-browsersync";
import html from "rollup-plugin-generate-html-template";

const { umd, css, banner } = config();

export default [
  {
    input: "src/ts/index.ts",
    output: {
      name: "sample",
      file: pkg.browser,
      format: "umd",
      plugins: [
        html({
          template: "src/index.html",
          target: "dist/index.html"
        }),
        browsersync({
          server: "dist"
        })
      ],
      banner
    },
    plugins: umd
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
