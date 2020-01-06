import pkg from "./package.json";
import plugins from "./rollup.config.plugins";
import browsersync from "rollup-plugin-browsersync";
import html from "rollup-plugin-generate-html-template";
import stylelint from "rollup-plugin-stylelint";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import postcssPrefixer from "postcss-prefixer";

const { umd } = plugins();

export default [
  {
    input: "src/ts/index.ts",
    output: [
      {
        name: "tsplit",
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
        ]
      }
    ],
    plugins: umd
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
