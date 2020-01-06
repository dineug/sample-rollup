import json from "@rollup/plugin-json";
import url from "@rollup/plugin-url";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";

const common = [
  json(),
  url(),
  resolve(),
  commonjs({
    include: "node_modules/**"
  }),
  eslint()
];

export default function plugins() {
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
    esm
  };
}
