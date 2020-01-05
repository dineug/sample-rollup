import pkg from "./package.json";
import plugins from "./rollup.config.plugins";
import browsersync from "rollup-plugin-browsersync";
import html from "rollup-plugin-generate-html-template";

const { umd } = plugins();

export default {
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
};
