import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

const shelves = ["currentlyReading", "wantToRead", "read"]

class BookShelve extends Component {
  render() {
    const { bookShelves, getShelf, onUpdateBook } = this.props
    return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {shelves.map((shelf,id) => (
                  <BookShelf key={id}
                              shelf={shelf} 
                              books={bookShelves.filter((b) => b.shelf === shelf)} 
                              getShelf={getShelf}
                              onUpdateBook={onUpdateBook} />
                ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
  }
}

export default BookShelve
