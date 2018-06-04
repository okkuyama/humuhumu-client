var React = require('react');
var CommentList = require('./CommentList');
var HumuHumuVote = require('./HumuHumuVote');
var HumuHumuCount = require('./HumuHumuCount');

// 投票ボタンと投票集計を格納するフレーム
var HumuHumuBox = React.createClass({
  render: function() {
    return(
      <div>
        <div id="HumuHumuBox">
          <HumuHumuCount />
          <HumuHumuVote />
        </div>
      </div>
    );
  }
});

module.exports = HumuHumuBox;
