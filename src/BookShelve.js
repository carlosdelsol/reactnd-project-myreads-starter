import React, { Component } from 'react';
import Book from './Book'

class BookShelve extends Component {
  render() {
    const { title, books } = this.props
    
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{ title }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map((book, index) => (
                    <li key={index}>
                        <Book cover={book.cover}
                              title={book.title}
                              authors={book.authors} />
                    </li>
                ))}
            </ol>
          </div>
      </div>
    )
  }
}

export default BookShelve
