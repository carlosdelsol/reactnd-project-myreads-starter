import React from 'react';
import Book from './Book'

function BookShelf(props) {
    const title = (props.shelf === 'wantToRead') ? 'Want to Read' : (props.shelf === 'currentlyReading') ? 'Currently Reading' : 'Read';
    
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{ title }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map(book => (
                    <li key={book.id}>
                        <Book book={book}
                              getShelf={props.getShelf}
                              onUpdateBook={props.onUpdateBook} />
                    </li>
                ))}
            </ol>
          </div>
      </div>
    )
}

export default BookShelf
