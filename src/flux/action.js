var AppDispatcher = require('./dispatcher');
var AppConstants = require("./Constants");
var Request = require('superagent');

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

/* ------------------------------------------ */
// Action
/* ------------------------------------------ */

var AppAction = {

  // サーバーから投票集計数を取得してStoreにDispatchする
  getServerData: function(){
    // Getパラメータ取得
    var getVer = getUrlVars();
    var _groupId = getVer["groupId"] !== undefined ? getVer["groupId"] : "1";
    var match = location.search.match(/groupId=(.*?)(&|$)/);
    if(match) {
        _groupId = decodeURIComponent(match[1]);
    }
    // サーバーからコメント一覧を取得する
    var url = "https://2htko06vi8.execute-api.ap-northeast-1.amazonaws.com/prod/v1/humuhumus/count/"+_groupId;
    Request.get(url)
      .end(function(err, res){
        var count = "0";
        if(err){
          console.log(res.text);
        } else {
          if(isFinite(res.text)){
            count = res.text;
          }
        }
        //console.log(res.text);
        // StoreにDispatchする
        AppDispatcher.dispatch({
          actionType: AppConstants.GET_COUNT,
          groupCount: count
        });
      });
  },

  // サーバーの投票グループを削除する
  deleteServerData: function(){
    // Getパラメータ取得
    var getVer = getUrlVars();
    var _groupId = getVer["groupId"] !== undefined ? getVer["groupId"] : "1";
    var match = location.search.match(/groupId=(.*?)(&|$)/);
    if(match) {
        _groupId = decodeURIComponent(match[1]);
    }
    // サーバーからコメント一覧を取得する
    var url = "https://2htko06vi8.execute-api.ap-northeast-1.amazonaws.com/prod/v1/humuhumus/"+_groupId;
    Request.delete(url)
      .end(function(err, res){
        //console.log(res.text);
        // StoreにDispatchする
        AppDispatcher.dispatch({
          actionType: AppConstants.DELETE_COUNT,
          groupCount: 0
        });
      });
  },

  // Postされた内容をStoreにDispatchする
  postData: function(value){
    // サーバーにPostする
    var url = "https://2htko06vi8.execute-api.ap-northeast-1.amazonaws.com/prod/v1/humuhumus";
    Request.post(url)
      .send({
        groupId: value.groupId
      })
      .end(function(err, res) {
        //console.log('comment:'.value);
        // 最新データを取得し直す
        AppAction.getServerData();
      });
  }

};

module.exports = AppAction;
