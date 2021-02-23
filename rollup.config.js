import { babel } from "@rollup/plugin-babel";
import { pascalCase } from "pascal-case";

const plugins = [babel({ babelHelpers: "bundled" })];

const builds = [
  {
    name: "outline",
    input: "./packages/outline/index.js",
    outputDir: `./packages/outline/lib`,
  },
  {
    name: "solid",
    input: "./packages/solid/index.js",
    outputDir: `./packages/solid/lib`,
  },
].map(({ name, input, outputDir }) => {
  return [
    /* esm */
    {
      input,
      plugins,
      output: {
        file: `${outputDir}/index.es.js`,
        format: "es",
        sourcemap: true,
      },
    },

    /* cjs */
    {
      input,
      plugins,
      output: {
        file: `${outputDir}/index.cjs.js`,
        format: "cjs",
        sourcemap: true,
      },
    },

    /* umd */
    {
      input,
      plugins,
      output: {
        file: `${outputDir}/index.umd.js`,
        format: "umd",
        name: `vueHeroIcons${pascalCase(name)}`,
        sourcemap: true,
      },
    },
  ];
});

export default [].concat(...builds);
