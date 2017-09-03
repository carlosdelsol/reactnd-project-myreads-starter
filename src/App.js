import React from 'react'
import BookShelve from './BookShelve'
import Book from './Book'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
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
    this.setState((state) => ({
      bookShelves: state.bookShelves.map((b) => {
        if(b.id === book.id){
          b.shelf = shelf;
        }
        return b
      })
    }))

    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div>
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                <div className="search-books-input-wrapper">
                  {/* 
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                    
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author" value={this.state.searchQuery} onChange={(event) => this.searchQuery(event.target.value)} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
              {this.state.noResults ? (
                <h3 className="bookshelf">No results found.</h3>
              ) : ( <ol className="books-grid">
                      {this.state.books.map(book => (
                          <li key={book.id}>
                              <Book book={book}
                                    onUpdateBook={this.updateBook} />
                          </li>
                      ))}
                    </ol>)}
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelve shelf="currentlyReading" bookShelves={this.state.bookShelves} onUpdateBook={this.updateBook} />
                <BookShelve shelf="wantToRead" bookShelves={this.state.bookShelves} onUpdateBook={this.updateBook} />
                <BookShelve shelf="read" bookShelves={this.state.bookShelves} onUpdateBook={this.updateBook} />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
