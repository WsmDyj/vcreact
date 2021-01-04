# VC React

基于TypeScript开发的React轻量级组件库

## 安装与使用

安装与使用请移步我们的[文档站](https://wsmdyj.github.io/vcreact)。

## 开发

#### 代码结构

源码均在 [src 目录](./src)内。每个组件有自己的子目录。最终所有组件统一在 [src/index.js](./src/index.js) 中 export 出来。

#### 开发

RUN `npm run dev`

#### 构建文档站

RUN `npm run build-storybook`

#### 构建

RUN `npm run build`

#### 组件文档

基于 Storybook 中 addons-docs `mdx`语法，请在组件同级创建 `stories` 目录，新建同名说明文档，ex. `Button.stories.mdx`。

#### 代码规范

使用 `eslint` 规范

#### 编辑器

我们推荐使用 [Visual Studio Code](https://code.visualstudio.com/)。

为了更好的开发体验，我们建议使用 **prettier** 进行在开发和提交阶段进行代码格式化，配置如下：

```json
...
"[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true
},
"[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true
},
"[mdx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnPaste": true,
    "editor.formatOnSave": true
},
...
```

## 测试

执行 `npm run test` 运行单元测试。

我们的单元测试使用 Facebook 开源的 [jest](https://facebook.github.io/jest/) 框架编写。如果你之前没接触过，请移步 [jest 文档](https://facebook.github.io/jest/docs/en/getting-started.html)学习。

** ❤ 作为一名靠谱的工程师，请为你提交的修改编写相应的单元测试 ❤ **

## 讨论 / 问题反馈 / 建议

目前还在搭建中...
