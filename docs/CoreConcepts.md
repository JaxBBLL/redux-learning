<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [核心概念](#%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 核心概念

想象一下，您的应用程序的状态被描述为一个普通对象。例如，todo应用程序的状态可能如下所示：

```js
{
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```
这个对象就像一个“模型”，除了没有setter。这样代码的不同部分不能任意改变状态，导致难以重现的错误。

要更改状态中的某些内容，您需要发送操作。一个动作是一个简单的JavaScript对象（请注意我们如何不引入任何魔法？）来描述发生了什么。以下是一些示例操作：

```js
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```

强制将每个更改描述为一个操作，让我们清楚地了解应用程序中发生的情况。如果发生了变化，我们就知道它为什么会改变 行动就像发生了什么的面包屑。最后，为了将状态和动作联系在一起，我们编写了一个名为reducer的函数。再一次，没有什么神奇之处 - 它只是一个将状态和动作作为参数的函数，并返回应用程序的下一个状态。为大型应用程序编写这样的函数会很困难，所以我们编写管理状态部分的较小函数：

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {
    return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }])
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        action.index === index
          ? { text: todo.text, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}
```
我们编写另一个reducer来管理应用程序的完整状态，方法是调用相应状态键的两个reducers：
```js
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
```
这基本上是Redux的整个想法。请注意，我们没有使用任何Redux API。它附带了一些实用程序来促进这种模式，但主要的想法是描述你的状态如何随着时间的推移而更新以响应操作对象，并且你编写的90％的代码只是简单的JavaScript，没有使用Redux本身，它的API，或任何魔术。