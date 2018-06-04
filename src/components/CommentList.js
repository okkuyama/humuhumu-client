var React = require('react');
var AppStore = require('../flux/store');
var AppAction = require('../flux/action');
var Comment = require('./Comment');
var $ = require('jquery');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

// コメント一覧
var CommentList = React.createClass({
  getInitialState: function() {
    return {
      commentsList:AppStore.getAll()
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
      // Storeが更新されたらコメント一覧を取得
      self.setState({
        commentsList:AppStore.getAll()
      });
    });
    // タイマーセット
    this.interval = setInterval(this.reload, 3000);
  },
  componentDidUpdate: function(prevProps, prevState){
    // 画面更新時に一番したまでスクロールする
    $('body').delay(100).animate({
      scrollTop: $(document).height()
    },1500);
  },
  reload: function() {
    // リロード
    AppAction.getServerData();
  },
  render: function() {
    if(this.state.commentsList.length > 0){
      var commentNodes = this.state.commentsList.map(function(comment, i) {
        return (
          <ReactCSSTransitionGroup transitionName="comment" transitionEnterTimeout={500} transitionLeaveTimeout={300} transitionAppearTimeout={500} transitionAppear={true}>
            <Comment key={comment.humuId} id={comment.humuId}>
              {comment.comment}
            </Comment>
          </ReactCSSTransitionGroup>
        );
      });
      return (
        <ul id="commentList" className='commentList'>
            {commentNodes}
        </ul>
      );
    } else {
      return(
        <div className='commentList'>
          No Comment.
        </div>
      );
    }
  }
});

module.exports = CommentList;
