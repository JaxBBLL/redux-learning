import store from './store.js';
import App from './App.js'

let app = new App('app')
app.init()

let render = () => {
  app.$view.html(store.getState().number)
}

// 当仓库里的state发生变化的时候，会重新执行render,读取最新的状态数据并更新视图
let unsubscribe = store.subscribe(render)

render();
