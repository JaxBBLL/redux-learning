import React, { Component } from "react";
import { connect } from "react-redux";
import "./normalize.css";
import "./App.less";
import * as mapDispatchToProps from "./actions";
import http from "@utils/http";

import HooksTest from './HooksTest'
import ReduxTest from './ReduxTest'

export default class App extends Component {
  render() {
    return (
      <div>
        <HooksTest></HooksTest>
        <ReduxTest />
      </div>
    );
  }
}
