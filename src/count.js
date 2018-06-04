var React = require('react');
var ReactDOM = require('react-dom');

var HumuHumuCount = require('./components/HumuHumuCount');

// アプリケーション基点
ReactDOM.render(
  <HumuHumuCount />,
  document.getElementById('count')
);
