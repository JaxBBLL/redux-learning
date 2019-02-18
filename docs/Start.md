<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
- [Redux入门](#redux%E5%85%A5%E9%97%A8)
  - [安装](#%E5%AE%89%E8%A3%85)
  - [Redux入门套件](#redux%E5%85%A5%E9%97%A8%E5%A5%97%E4%BB%B6)
  - [基本例子](#%E5%9F%BA%E6%9C%AC%E4%BE%8B%E5%AD%90)
  - [例子](#%E4%BE%8B%E5%AD%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Redux入门

Redux是JavaScript应用程序的可预测状态容器。

它可以帮助您编写一致行为的应用程序,在不同的环境（客户端，服务器和本机）中运行，并且易于测试。最重要的是，它提供了出色的开发人员体验，例如实时代码编辑与时间旅行调试器相结合。

您可以将Redux与React一起使用，也可以与任何其他视图库一起使用。它很小（2kB，包括依赖项），但有一个庞大的插件生态系统。


## 安装
Redux作为NPM上的软件包提供，可与模块捆绑器或节点应用程序一起使用

```
npm install --save redux
```
它也可用作预编译的UMD包，用于定义window.Redux全局变量。 UMD包可以直接用作<script>标记。

## Redux入门套件

Redux本身很小而且没有任何影响。我们还有一个名为redux-starter-kit的独立包，其中包含一些固有的默认值，可帮助您更有效地使用Redux。

它有助于简化许多常见用例，包括存储设置，创建Reducer和编写不可变更新逻辑，甚至可以立即创建整个“切片”状态。

无论您是设置第一个项目的全新Redux用户，还是想要简化现有应用程序的有经验的用户，redux-starter-kit都可以帮助您更好地完成Redux代码。


## 基本例子

应用程序的整个状态存储在单个商店内的对象树中。
更改状态树的唯一方法是发出一个动作，一个描述发生的事情的对象。
要指定操作如何转换状态树，请编写纯缩减器。

```jsx

import { createStore } from 'redux'

/**
 * 这是一个reducer，一个带有（state，action）=> state签名的纯函数。
 * 它描述了一个动作如何将状态转换为下一个状态。
 *
 * 状态的形状取决于你：它可以是原始的，数组，对象，
 * 甚至是Immutable.js数据结构。唯一重要的部分是你应该不改变状态对象，但如果状态改变则返回一个新对象。
 *
 * 在这个例子中，我们使用`switch`语句和字符串，但你可以使用一个帮助器，如果对你有意义，则遵循不同的约定（例如功能图）项目。
 */
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 创建一个包含应用状态的Redux商店。
// 它的API是{subscribe，dispatch，getState}。
let store = createStore(counter)

// 您可以使用subscribe（）更新UI以响应状态更改。
// 通常，您使用视图绑定库（例如React Redux）而不是直接使用subscribe（）。
// 但是，将当前状态保存在localStorage中也很方便。

store.subscribe(() => console.log(store.getState()))

// 改变内部状态的唯一方法是派遣一个动作。
// 可以序列化，记录或存储操作，然后重放。
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```
您可以使用称为操作的普通对象指定要发生的突变，而不是直接改变状态。然后编写一个称为reducer的特殊函数来决定每个操作如何转换整个应用程序的状态。

在典型的Redux应用程序中，只有一个商店具有单个根减少功能。随着应用程序的增长，您将根减速器拆分为更小的减速器，独立运行在状态树的不同部分。这与React应用程序中只有一个根组件完全相同，但它由许多小组件组成。

对于计数器应用程序来说，这种体系结构可能看起来有点过分，但这种模式的优点在于它可以扩展到大型复杂的应用程序。它还支持非常强大的开发人员工具，因为可以将每个突变跟踪到导致它的操作。您可以通过重播每个操作来记录用户会话并重现它们。

## 例子

Redux存储库包含几个示例项目，演示了如何使用Redux的各个方面。几乎所有示例都有相应的CodeSandbox沙箱。这是您可以在线玩的代码的交互式版本。