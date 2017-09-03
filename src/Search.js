import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    searchQuery: '',
    noResults: false,
    books: []
  }

  searchBooks = (value) => {
    this.setState({searchQuery: value})
    
    if(value.length > 2){
      BooksAPI.search(value, 20).then((books) => {
        if(books.error === "empty query"){
          this.setState({ books: [], noResults: true })
        }else{
          this.setState({ books, noResults: false })
        }
      })
    }else{
      this.setState({ books: [], noResults: false })
    }
  }

  render() {
    const { getShelf, onUpdateBook } = this.props
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={this.state.searchQuery} onChange={(event) => this.searchBooks(event.target.value)} />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
          {this.state.noResults ? (<h3 className="bookshelf">No results found.</h3>) : (
            <ol className="books-grid">
              {this.state.books.map(book => (
                  <li key={book.id}>
                      <Book book={book}
                            getShelf={getShelf}
                            onUpdateBook={onUpdateBook} />
                  </li>
              ))}
            </ol>
          )}
      </div>
    )
  }
}

export default Search
