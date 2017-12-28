import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {

  state = {
   currentlyReadingBooks: [],
   wantToReadBooks: [],
   readBooks: []
  };

  filterBooksByShelf = (books, shelfName) => {
    return books.filter( book => book.shelf === shelfName);
  };

  componentDidMount() {

    BooksAPI.getAll().then( books => {

      let allBooks = {
        currentlyReadingBooks: this.filterBooksByShelf(books, 'currentlyReading'),
        wantToReadBooks: this.filterBooksByShelf(books, 'wantToRead'),
        readBooks: this.filterBooksByShelf(books, 'read'),
      };

      this.setState(allBooks);
    });
  }

  render() {

    const {currentlyReadingBooks, wantToReadBooks, readBooks} = this.state;

    return (
      <div className="app">
        <div className='list-books'>
        <div className='list-books-title'>
          <h1> My Library </h1>
        </div>
        <div className='list-books-content'>
          <BookShelf shelfType='currentlyReading' books={currentlyReadingBooks}/>
          <BookShelf shelfType='wantToRead' books={wantToReadBooks}/>
          <BookShelf shelfType='read' books={readBooks}/>
        </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
