import React from 'react'
import { Link, Route } from 'react-router-dom'
import BookShelve from './BookShelve'
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

const shelves = ["currentlyReading", "wantToRead", "read"]

class BooksApp extends React.Component {
  state = {
    searchQuery: '',
    noResults: false,
    books: [],
    bookShelves: []    
  }

  componentDidMount() {
    BooksAPI.getAll().then((bookShelves) => {
      this.setState({ bookShelves })
    })
  }

  searchQuery = (value) => {
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

  updateBook = (book, shelf) => {
    let newBooks = this.state.bookShelves.filter((b) => b.id !== book.id);
    book.shelf = shelf;
    newBooks.push(book);
    this.setState({bookShelves: newBooks})

    BooksAPI.update(book, shelf)
  }

  getShelf = (id) => {
    let book = this.state.bookShelves.filter((b) => b.id === id)[0]
    return book===undefined?'none':book.shelf
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div>
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={this.state.searchQuery} onChange={(event) => this.searchQuery(event.target.value)} />
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
                                getShelf={this.getShelf}
                                onUpdateBook={this.updateBook} />
                      </li>
                  ))}
                </ol>
              )}
        </div>
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  {shelves.map((shelf,id) => (
                    <BookShelve key={id}
                                shelf={shelf} 
                                books={this.state.bookShelves.filter((b) => b.shelf === shelf)} 
                                getShelf={this.getShelf}
                                onUpdateBook={this.updateBook} />
                  ))}
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
