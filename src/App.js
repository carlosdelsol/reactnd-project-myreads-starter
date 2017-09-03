import React from 'react'
import { Route } from 'react-router-dom'
import BookShelve from './BookShelve'
import Search from './Search'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    bookShelves: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((bookShelves) => {
      this.setState({ bookShelves })
    })
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
        <Route exact path="/" render={() => (
          <BookShelve bookShelves={this.state.bookShelves}
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
