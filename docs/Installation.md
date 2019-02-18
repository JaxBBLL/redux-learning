<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [安装](#%E5%AE%89%E8%A3%85)
  - [补充包](#%E8%A1%A5%E5%85%85%E5%8C%85)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 安装

要安装稳定版本：

```
npm install --save redux
```

这假设您使用npm作为包管理器。

如果不是，您可以在unpkg上访问这些文件，下载它们，或者将软件包管理器指向它们。

最常见的是，人们将Redux作为CommonJS模块的集合使用。这些模块是您在Webpack，Browserify或Node环境中导入redux时获得的模块。如果你喜欢生活在边缘并使用Rollup，我们也支持。

如果你不使用模块捆绑器，它也没关系。redux npm软件包包括dist文件夹中的预编译生产和开发UMD构建。它们可以在没有捆绑器的情况下直接使用，因此与许多流行的JavaScript模块加载器和环境兼容。例如，您可以将UMD构建作为<script>标记放在页面上，或者告诉Bower安装它。UMD构建使Redux可用作window.Redux全局变量。

Redux源代码是在ES2015中编写的，但我们将CommonJS和UMD构建预编译为ES5，因此它们可以在任何现代浏览器中使用。您不需要使用Babel或模块​​捆绑器来开始使用Redux。

## 补充包

最有可能的是，您还需要React绑定和开发人员工具。

```
npm install --save react-redux
npm install --save-dev redux-devtools
```

请注意，与Redux本身不同，Redux生态系统中的许多软件包都不提供UMD构建，因此我们建议使用Webpack和Browserify之类的CommonJS模块软件包来获得最舒适的开发体验。