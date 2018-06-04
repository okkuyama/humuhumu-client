var React = require('react');
var AppStore = require('../flux/store');
var AppAction = require('../flux/action');
//var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

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

// 投票集計数
var HumuHumuCount = React.createClass({
  getInitialState: function() {
    var getVer = getUrlVars();
    var _name = getVer["name"] !== undefined ? getVer["name"] : "名無し";
    return {
      name: _name,
      groupCount:AppStore.getGroupCount()
    };
  },
  componentWillMount: function() {
    // 初回でサーバーよりコメント一覧を読み込む
    AppAction.getServerData();
  },
  componentDidMount: function() {
    // AppStoreにStore更新後コールバックを登録
    var self = this;
    AppStore.addChangeListener(function () {
      // Storeが更新されたら投票集計数を取得
      self.setState({
        groupCount:AppStore.getGroupCount()
      });
    });
    // インターバルタイマーセット
    this.interval = setInterval(this.reload, 5000);
  },
  componentWillUnmount: function() {
    // タイマー解除
    clearInterval(this.interval);
  },
  reload: function() {
    // サーバーよりカウントを読込
    AppAction.getServerData();
  },
  // delete送信処理
  deleteData: function(e) {
    e.preventDefault();
    //console.log(this.state);
    AppAction.deleteServerData();
  },
  render: function() {
    return(
      <div>
        <p className="name">{this.state.name}さん</p>
        <p id="HumuHumuCount"><span>{this.state.groupCount}</span></p>
        <button onClick={this.deleteData}>リセット</button>
      </div>
    );
  }
});

module.exports = HumuHumuCount;
