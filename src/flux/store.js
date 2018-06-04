var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var AppDispatcher = require('./dispatcher');
var AppConstants = require("./Constants");

/* ------------------------------------------ */
// 定数定義
/* ------------------------------------------ */

// イベント定数
var CHANGE_EVENT = 'change';

/* ------------------------------------------ */
// アプリで格納するデータ
/* ------------------------------------------ */

var _groupCount = "-";

/* ------------------------------------------ */
// Store
/* ------------------------------------------ */

var AppStore = assign({}, EventEmitter.prototype, {
  // 投票集計数を返す
  getGroupCount: function() {
    return _groupCount;
  },
  // イベント発生メソッド定義
  emitChange: function() {
    // イベント名"change"でイベントを発生
    this.emit(CHANGE_EVENT);
  },
  // イベント監視とコールバックの定義（Storeで変更が合った場合にコールバックを実行）
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  // dispacheされたpayloadを取得
  dispatcherIndex: AppDispatcher.register(function (payload) {

    // 件数取得
    if(payload.actionType === AppConstants.GET_COUNT) {
      _groupCount = payload.groupCount;
      // 変更があったことを通知する
      AppStore.emitChange();
    }

    // グループ削除
    if(payload.actionType === AppConstants.DELETE_COUNT) {
      _groupCount = payload.groupCount;
      // 変更があったことを通知する
      AppStore.emitChange();
    }

    // 投票POSTされた
    if(payload.actionType === AppConstants.POST) {
      // カウントアップ
      _groupCount += 1;
      // 変更があったことを通知する
      AppStore.emitChange();
    }

  })
});

module.exports = AppStore;
