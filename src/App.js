import React from 'react'
import { Route } from 'react-router-dom'
import BookShelve from './BookShelve'
import Search from './Search'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  getShelf = (id) => {
    let book = this.state.books.filter((b) => b.id === id)[0]
    return book===undefined?'none':book.shelf
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelve bookShelves={this.state.books}
                      getShelf={this.getShelf}  
                      onUpdateBook={this.updateBook} />
        )} />
        <Route path="/search" render={() => (
          <Search getShelf={this.getShelf}  
                  onUpdateBook={this.updateBook} />
        )} />
      </div>
    )
  }
}

export default BooksApp
