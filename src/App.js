import React from 'react';
import {Route, Link} from 'react-router-dom';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {

  state = {
   currentlyReadingBooks: [],
   wantToReadBooks: [],
   readBooks: []
  };

  /**
   * Given a collection of books and a shelf name return the collection of books
   * that only belong to the given shelf
   */
  filterBooksByShelf = (books, shelfName) => {
    return books.filter( book => book.shelf === shelfName);
  };

  /**
   * Make an API request to get all books that are currently assigned to a shelf & upon
   * server response bucket the books into the approrpriate shelf array and update the
   * component state
   */
  populateAllBooks = () => {
    BooksAPI.getAll().then( books => {
      let allBooks = {
        currentlyReadingBooks: this.filterBooksByShelf(books, 'currentlyReading'),
        wantToReadBooks: this.filterBooksByShelf(books, 'wantToRead'),
        readBooks: this.filterBooksByShelf(books, 'read'),
      };
      this.setState(allBooks);
    });
  }

  componentDidMount() {
    this.populateAllBooks();
  }

  /**
   * Given a book and a shelf name, make API Request to move the book to the new shelf.
   * Once server req is complete, set the state of the component by populating all
   * books again.
   * @param book Object containing the book properties, which has to be updated
   * @param newShelfname string containing the name of the new shelf to which the
   *                     book should be moved to
   *
   *
   */
  onBookUpdate = (book, newShelfName) => {
    BooksAPI.update(book, newShelfName).then( () => {
      this.populateAllBooks();
      // Note : Thought I can't find a better way to do this, not really happy  with this implementation
      // Like the fact that we use the server as source of truth, but would round trip to server be less
      // efficient than setting state manually here by removing and adding from the shelf book arrays ?
    });
  }

  render() {

    const {currentlyReadingBooks, wantToReadBooks, readBooks} = this.state;
    const allBooks = _.concat(currentlyReadingBooks, wantToReadBooks, readBooks);

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1> My Library </h1>
            </div>
            <div className='list-books-content'>
              <BookShelf onBookUpdate={this.onBookUpdate} shelfType='currentlyReading' books={currentlyReadingBooks}/>
              <BookShelf onBookUpdate={this.onBookUpdate} shelfType='wantToRead' books={wantToReadBooks}/>
              <BookShelf onBookUpdate={this.onBookUpdate} shelfType='read' books={readBooks}/>
            </div>

            <Link className='open-search' to='/search'> Add a book </Link>
          </div>
        )}/>

        <Route path='/search' render={() => (
          <SearchBooks
            booksOnShelves={allBooks}
            onBookUpdate={this.onBookUpdate}/>
        )}/>

      </div>

    );
  }
}

export default BooksApp;
