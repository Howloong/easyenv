# electron-vite-vue

一个使用electron-vite-vue框架搭建的环境自动配置工具。

[![wakatime](https://wakatime.com/badge/user/dac2f0d8-0f5d-443b-97cb-75004ad8cc1d/project/d87438aa-0839-4db7-a5da-8faccb88db7f.svg)](https://wakatime.com/badge/user/dac2f0d8-0f5d-443b-97cb-75004ad8cc1d/project/d87438aa-0839-4db7-a5da-8faccb88db7f)

## Features

📦 Out of the box  
🎯 Based on the
official [template-vue-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts), less
invasive  
🌱 Extensible, really simple directory structure  
💪 Support using Node.js API in Electron-Renderer  
🔩 Support C/C++ native addons  
🖥 It's easy to implement multiple windows

## Quick Start

```sh
npm create electron-vite
```

<!-- [![quick-start](https://asciinema.org/a/483731.svg)](https://asciinema.org/a/483731) -->

![electron-vite-vue.gif](/public/electron-vite-vue.gif)

## Debug

![electron-vite-react-debug.gif](https://github.com/electron-vite/electron-vite-react/blob/main/public/electron-vite-react-debug.gif?raw=true)

## Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts    entry of Electron-Main
+ │ └─┬ preload
+ │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  └── vite.config.ts
```

## Be aware

🚨 By default, this template integrates Node.js in the Renderer process. If you don't need it, you just remove the option
below. [Because it will modify the default config of Vite](https://github.com/electron-vite/vite-plugin-electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

export default {
  plugins: [
-   // Use Node.js API in the Renderer-process
-   renderer({
-     nodeIntegration: true,
-   }),
  ],
}
```

## FAQ

- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron-renderer#dependencies-vs-devdependencies)
- [C/C++ addons, Node.js modules - Pre-Bundling](https://github.com/electron-vite/vite-plugin-electron-renderer#dependency-pre-bundling)
