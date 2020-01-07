import pkg from "./package.json";
import json from "@rollup/plugin-json";
import url from "@rollup/plugin-url";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";
import stylelint from "rollup-plugin-stylelint";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import postcssPrefixer from "postcss-prefixer";

const banner = `/*!
 * ${pkg.name}
 * @version ${pkg.version} | ${new Date().toDateString()}
 * @author ${pkg.author}
 * @license ${pkg.license}
 */`;

const common = [
  json(),
  url(),
  resolve(),
  commonjs({
    include: "node_modules/**"
  }),
  eslint()
];

const css = [
  stylelint(),
  postcss({
    extract: true,
    plugins: [
      autoprefixer(),
      postcssPrefixer({
        prefix: `${pkg.name}-`
      })
    ]
  })
];

const cssMin = [
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
];

export default function config() {
  const umd = [...common];
  const esm = [...common];
  umd.push(typescript());
  esm.push.apply(esm, [
    typescript({
      tsconfig: "tsconfig.esm.json"
    }),
    terser({
      include: [/^.+\.min\.js$/]
    })
  ]);
  return {
    umd,
    esm,
    css,
    cssMin,
    banner
  };
}
