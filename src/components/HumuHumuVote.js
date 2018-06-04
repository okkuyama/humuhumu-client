var React = require('react');
var AppAction = require('../flux/action');


/**
 *  GETパラメータを配列にして返す
 *
 *  @return     パラメータのObject
 *
 */
var getUrlVars = function(){
    var vars = {};
    var param = location.search.substring(1).split('&');
    for(var i = 0; i < param.length; i++) {
        var keySearch = param[i].search(/=/);
        var key = '';
        if(keySearch != -1) key = param[i].slice(0, keySearch);
        var val = param[i].slice(param[i].indexOf('=', 0) + 1);
        if(key != '') vars[key] = decodeURI(val);
    }
    return vars;
};

// 投票フォーム
var HumuHumuVote = React.createClass({
  getInitialState: function(){
    // Getパラメータ取得
    var getVer = getUrlVars();
    var _groupId = getVer["groupId"] !== undefined ? getVer["groupId"] : "1";
    var _name = getVer["name"] !== undefined ? getVer["name"] : "名無し";
    var match = location.search.match(/groupId=(.*?)(&|$)/);
    if(match) {
        _groupId = decodeURIComponent(match[1]);
    }
    //console.log("groupId:"+_groupId);
    return{
      groupId: _groupId,
      name: _name,
      holding: 10 // 持ち点
    };
  },
  // Post送信処理
  postData: function(e) {
    e.preventDefault();
    // 持ち点が０になったらボタンを押せなくする。
    if (this.state.holding <= 0) {
      return;
    }
    // 持ち点を減算
    this.setState({holding: this.state.holding - 1});
    //console.log(this.state);
    AppAction.postData(this.state);
  },
  render: function() {
    if(this.state.holding <= 0){
      return(
        <form id="HumuHumuVote">
          <p className="name">{this.state.name}さん</p>
          <button disabled >ふむふむ</button>
        </form>
      );
    } else {
      return(
        <form id="HumuHumuVote">
          <p className="name">{this.state.name}さん</p>
          <button onClick={this.postData} ontouchstart="">ふむふむ</button>
        </form>
      );
    }
  }
});

module.exports = HumuHumuVote;
