import React, { Component } from 'react';
import Book from './Book'

class BookShelve extends Component {
  render() {
    const { shelf, bookShelves, onUpdateBook } = this.props
    const books = bookShelves.filter((b) => b.shelf === shelf);
    const title = shelf === 'wantToRead' ? 'Want to Read' : (shelf === 'currentlyReading') ? 'Currently Reading' : 'Read';
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{ title }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map(book => (
                    <li key={book.id}>
                        <Book book={book}
                              onUpdateBook={onUpdateBook} />
                    </li>
                ))}
            </ol>
          </div>
      </div>
    )
  }
}

export default BookShelve
