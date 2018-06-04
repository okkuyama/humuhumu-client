var React = require('react');
var ReactDOM = require('react-dom');

var HumuHumuVote = require('./components/HumuHumuVote');

// アプリケーション基点
ReactDOM.render(
  <HumuHumuVote />,
  document.getElementById('vote')
);
