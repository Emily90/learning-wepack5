import React from "react";
import ReactDOM from "react-dom";
import Header from './comps/header';

const App = () => (
  <div style={{ fontSize: 72, width: 1200, margin: "auto" }}>
    <Header />
    <div>这是页面内容.</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
