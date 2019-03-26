// 创建仓库
const createStore = (reducer) => {

  // 状态
  let state;

  // 监听函数数组
  let listeners = [];

  // 获取最新的状态
  let getState = () => state;

  // 向仓库发送action
  let dispatch = (action) => {
    // 传入老的state和action，返回新的state
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  // 订阅仓库内的状态变化事件，当状态发生变化之后调用对应的监听函数
  // 订阅方法执行后会返回一个取消订阅的函数，调用他可以取消订阅
  let subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter(item => listener !== item);
    }
  }

  dispatch();
  return {
    getState,
    subscribe,
    dispatch
  }

}

export {
  createStore
}
