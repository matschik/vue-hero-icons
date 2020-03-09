const path = require("path");
const pascalCase = require("pascal-case");
const fs = require("fs-extra");
const pkg = require('./package.json')

const handleComponentName = name => name.replace(/\-(\d+)/, "$1");

const componentTemplate = (name, svg) =>
  `
export default {
  name: '${name}',
  
  props: {
    size: {
      type: String,
      default: '24',
      validator: (s) => (!isNaN(s) || s.length >= 2 && !isNaN(s.slice(0, s.length -1)) && s.slice(-1) === 'x' )
    }
  },

  functional: true,

  render(h, ctx) {
    const size = ctx.props.size.slice(-1) === 'x' 
      ? ctx.props.size.slice(0, ctx.props.size.length -1) + 'em'
      : parseInt(ctx.props.size) + 'px';

    const attrs = ctx.data.attrs || {}
    attrs.width = attrs.width || size
    attrs.height = attrs.height || size
    ctx.data.attrs = attrs
  
    return ${svg.replace(/<svg([^>]+)>/, "<svg$1 {...ctx.data}>")}
  }
}
`.trim();

const packageJSONTemplate = (category) =>
  `{
  "name": "@vue-hero-icons/${category}",
  "version": "${pkg.version}",
  "main": "lib/index.cjs.js",
  "module": "lib/index.es.js",
  "jsnext:main": "lib/index.es.js",
  "license": "MIT",
  "dependencies": {
    "heroicons": "${pkg.dependencies.heroicons}",
    "@vue/babel-helper-vue-jsx-merge-props": "^1.0.0"
  }
}
`.trim();

async function main() {
  await fs.remove('./packages')
  const iconDirsPath = path.join(__dirname, "node_modules/heroicons/dist");
  const categories = await fs.readdir(iconDirsPath);
  const icons = [];

  const categoryByOriginCategory = {
    "outline-md": "outline",
    "solid-sm": "solid"
  };

  for (const originCategory of categories) {
    const categoryPath = path.join(iconDirsPath, originCategory);
    const names = await fs.readdir(categoryPath);
    const iconsByCategory = names.map(filename => {
      const name = filename.split('.')[0]
      return {
        path: path.join(categoryPath, filename),
        name,
        category: categoryByOriginCategory[originCategory],
        componentName: pascalCase(`${handleComponentName(name)}-icon`).slice(2)
      };
    });
    icons.push(...iconsByCategory);
  }

  for (const icon of icons) {
    // Create Vue component files
    const svg = await fs.readFile(icon.path, "utf8");
    const component = componentTemplate(icon.componentName, svg);
    const filepath = `./packages/${icon.category}/icons/${icon.componentName}.js`;
    await fs.ensureDir(path.dirname(filepath));
    await fs.writeFile(filepath, component, "utf8");

    // Create packages directories
    const packagePath = `./packages/${icon.category}`;

    const indexJSContent = `export { default as ${icon.componentName} } from './icons/${icon.componentName}'`.concat(
      "\n\n"
    );

    const indexJSPath = path.join(__dirname, packagePath, "index.js");
    if (await fs.exists(indexJSPath)) {
      fs.appendFile(indexJSPath, indexJSContent, "utf8");
    } else {
      fs.writeFile(indexJSPath, indexJSContent, "utf8");
    }
  }
  
  for (const category of Object.values(categoryByOriginCategory)) {
    fs.writeFile(
      path.join(__dirname, `./packages/${category}/package.json`),
      packageJSONTemplate(category)
    );
  }
}

main().catch(err => {
  console.error(err);
});
