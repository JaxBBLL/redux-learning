import store from './store.js';
import * as types from './types.js';

const qs = (id) => {
  return document.querySelector(`#${id}`)
}

export default class App {
  constructor(id) {
    this.$el = qs(id);
    this.$view = null;
  }

  initEvent() {
    qs('increaseBtn').addEventListener('click', (ev) => {
      store.dispatch({ type: types.INCREASE });
    }, false)

    qs('decreaseBtn').addEventListener('click', (ev) => {
      store.dispatch({ type: types.DECREASE });
    }, false)
  }

  initTemplate() {
    this.$el.innerHTML = `
    <h3>redux demo</h3>
    <p id="view"></p>
    <button id="increaseBtn">+</button>
    <button id="decreaseBtn">-</button>
    `
    this.$view = qs('view')
  }

  init() {
    this.initTemplate();
    this.initEvent();
  }
}
