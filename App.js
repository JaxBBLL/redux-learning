import store from './store.js';
import * as types from './types.js';

export default class App {
  constructor(id) {
    this.$el = $(`#${id}`)
    this.$view = null;
  }

  initEvent() {
    $('#increaseBtn').click(() => {
      store.dispatch({ type: types.INCREASE });
    })

    $('#decreaseBtn').click(() => {
      store.dispatch({ type: types.DECREASE });
    })
  }

  initTemplate() {
    this.$el.append(`
    <h3>redux demo</h3>
    <p id="counter"></p>
    <button id="increaseBtn">+</button>
    <button id="decreaseBtn">-</button>
    `)
    this.$view = this.$el.find('#counter');
  }

  init() {
    this.initTemplate();
    this.initEvent();
  }
}
