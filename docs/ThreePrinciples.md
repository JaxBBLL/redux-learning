# 三原则

Redux可以用三个基本原则来描述：

## 唯一的事实来源

整个应用程序的状态存储在单个存储中的对象树中。

这样可以轻松创建通用应用程序，因为服务器中的状态可以序列化并融入客户端，无需额外的编码工作。单个状态树还可以更轻松地调试或检查应用程序;它还使您能够在开发过程中保持应用程序的状态，从而加快开发周期。传统上难以实现的一些功能 - 例如Undo / Redo - 如果您的所有状态都存储在一个树中，则突然变得无足轻重。
```js
console.log(store.getState())

/* Prints
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/
```

## State是只读的

改变状态的唯一方法是发出一个动作，一个描述发生的事情的对象。

这可以确保视图和网络回调都不会直接写入状态。相反，他们表达了改变国家的意图。因为所有的变化都是集中的，并且按照严格的顺序逐个发生，所以没有细微的竞争条件需要注意。由于操作只是普通对象，因此可以对其进行记录，序列化，存储以及稍后重放以进行调试或测试。

```js
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```

## 使用纯函数进行更改

要指定状态树如何通过操作转换，您可以编写纯缩减器。

Reducers只是纯函数，它采用先前的状态和动作，并返回下一个状态。记住返回新的状态对象，而不是改变以前的状态。您可以从单个reducer开始，随着应用程序的增长，将其拆分为更小的reducers，管理状态树的特定部分。因为reducer只是函数，所以您可以控制它们的调用顺序，传递其他数据，甚至可以为常见任务（如分页）生成可重用的Reducer。

```js
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux'
const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)
```