import React, { Component } from "react";
import { connect } from "react-redux";
import "./normalize.css";
import "./App.less";
import * as mapDispatchToProps from "./actions";

@connect(
  ({ counter }) => ({ counter }),
  mapDispatchToProps
)
export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <div>
        <button className="add_btn" onClick={this.props.add}>
          +
        </button>
        <button className="dec_btn" onClick={this.props.minus}>
          -
        </button>
        <button className="dec_btn" onClick={this.props.asyncAdd}>
          async
        </button>
        <button className="dec_btn" onClick={() => { this.props.fetchList('白居易') }}>
          fetchList
        </button>
        <p>
          <span>{this.props.counter.num}</span>
        </p>
        <ul className="list-wrap">
          {this.props.counter.list.map((item, index) => (
            <li key={index} className="tac">
              <h3>{item.title}</h3>
              <p>作者：{item.authors}</p>
              <div dangerouslySetInnerHTML={{__html:item.content.split('|').join('<br>')}}></div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
