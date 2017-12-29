import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {

  state = {
    'query': '',
    'books': []
  }

  /**
   * Given an array of books which is a result of search query & if the array contains
   * books that are in one of the shelves - updates that book with the current shelf name
   */
  addShelfToSearchResults = (searchResults) => {
    let booksInShelves, commonBooks;

    booksInShelves = this.props.booksOnShelves;
    commonBooks = _.intersectionBy(booksInShelves, searchResults, 'id');

    for (let i=0; i < commonBooks.length; i++) {
      let idx = _.findIndex(searchResults, (el) => (el.id === commonBooks[i].id));
      searchResults[idx]['shelf'] = commonBooks[i].shelf;
    }

    return searchResults;
  }

  /**
   * Makes a request to the API by calling the the API search endpoint to retrieve books
   * matching the search query. In addition it also updatesthe state of the component by
   * updating the list of books that should be displayed
   */
  searchQuery = _.debounce( (queryText) => {
    BooksAPI.search(queryText).then(books => {
      if (!books.error) {
        books = this.addShelfToSearchResults(books);
        this.setState({books});
      } else {
        this.setState({books: []});
      }
    })
  }, 500)

  /**
   * Listens to the changes in the text input box & updates the state of the input box,
   * making the text input a controlled component. It also uses the callback to kick off
   * a request to the API to search for books using the query term.
   */
  updateQuery = (queryText) => {
    queryText = queryText.trim();

    this.setState({query: queryText}, ()=> {
      if (queryText) {
        this.searchQuery(queryText.trim());
      } else {
        this.setState({books: []});
      }
    });
  }

  /**
   * Given a book object and a new shelf name the book has to be moved into,
   * makes a called to the API to update the book with the new shelf name &
   * changes the state of that book in the current component by adding the
   * shelf name to the current view
   */
  addBookToShelf = (book, newShelfName) => {
    this.props.onBookUpdate(book, newShelfName);
    this.setState((prevState) => {
      let idx = _.findIndex(prevState.books, (el) => (el.id === book.id));
      prevState.books[idx].shelf = newShelfName;
      return {books: prevState.books};

    })
  }

  render() {

    const {query, books} = this.state;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'> Close </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text' placeholder='Search by title or author'
              value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className='search-book-results'>
          <ol className="books-grid">
            {
              books && (books.map((book) => (
                <li key={book.id}>
                  <Book bookProps={book} onShelfUpdate={this.addBookToShelf}/>
                </li>
              )))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
