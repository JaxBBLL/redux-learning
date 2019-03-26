import React, { Component } from "react";
import { connect } from "react-redux";
import "./normalize.css";
import "./App.less";
import { add, minus, asyncAdd } from "./actions";

const mapStateToProps = ({ counter }) => ({ counter });
const mapDispatchToProps = dispatch => ({
  add() {
    dispatch(add());
  },
  dec() {
    dispatch(minus());
  },
  asyncAdd() {
    dispatch(asyncAdd());
  }
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class App extends Component {
  state = {
    list: [1, 2, 3]
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <div>
        <button className="add_btn" onClick={this.props.add}>
          +
        </button>
        <button className="dec_btn" onClick={this.props.dec}>
          -
        </button>
        <button className="dec_btn" onClick={this.props.asyncAdd}>
          async
        </button>
        <p>
          <span>{this.props.counter.num}</span>
        </p>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}
