import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

  static propTypes = {
    bookProps: PropTypes.object.isRequired
  };

  render() {
    const {bookProps} = this.props;
    const {imageLinks, title, authors} = bookProps;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={
          {
            width: 128,
            height: 193,
            backgroundImage: `url(${imageLinks.smallThumbnail})`
          }}
          />

          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {
          authors.map( author => (
            <div key={author} className="book-authors">{author}</div>
          ))
        }
    </div>
  )}
}

export default Book