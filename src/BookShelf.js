import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class BookShelf extends Component {

  static propTypes = {
    shelfType: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  };

  render() {

    const SHELF_TYPE_TO_SHELF_TITLE = {
      'currentlyReading' : 'Currently Reading',
      'read' : 'Read',
      'wantToRead': 'Want to Read'
    };

    const {shelfType, books, onBookUpdate} = this.props;

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{SHELF_TYPE_TO_SHELF_TITLE[shelfType]}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {
              books.map((book) => (
                <li key={book.id}>
                  <Book bookProps={book} onShelfUpdate={onBookUpdate}/>
                </li>
              ))
            }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelf
