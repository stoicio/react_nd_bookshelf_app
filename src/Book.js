import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

  static propTypes = {
    bookProps: PropTypes.object.isRequired
  };

  handleShelfChange = (event) => {
    this.props.onShelfUpdate(this.props.bookProps, event.target.value);
  }

  render() {

    const {bookProps} = this.props;
    const {imageLinks, title, authors} = bookProps;

    let shelfName = bookProps.shelf;

    if (!shelfName) {
      shelfName = 'none';
    }

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
            <select value={shelfName} onChange={this.handleShelfChange}>
              <option value="novalue" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {
          authors &&  (authors.map( author => (
            <div key={author} className="book-authors">{author}</div>
          )))

        }
    </div>
  )}
}

export default Book
