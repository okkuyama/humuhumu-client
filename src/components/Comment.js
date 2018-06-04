var React = require('react');
var Marked = require('marked');

// コメントパーツ
var Comment = React.createClass({
  render: function() {
    if(this.props.children !== undefined){
      var rawMarkup = Marked(this.props.children.toString(), {sanitize: true});
      return(
        <li className='comment'><p>{this.props.children}</p></li>
      );
    }else {
      return(null);
    }
    /*
    var rawMarkup = Marked(this.props.children.toString(), {sanitize: true});
    return(
      <li><p><span dangerouslySetInnerHTML={{__html:rawMarkup}} /></p></li>
    );
    */
  }
});

module.exports = Comment;
